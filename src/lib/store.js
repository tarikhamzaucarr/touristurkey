/* Uygulama durumu — tek kaynak.
   İki arka uç aynı arayüzü sunar; bileşenler hangisinin çalıştığını bilmez.
     LOCAL    → localStorage + sekmeler arası BroadcastChannel
     SUPABASE → REST + kademeli yoklama (müsaitlik 3sn, gerisi 12sn) */

import {
  MODE, STORAGE_KEY, SYNC_CHANNEL, POLL_AVAILABILITY_MS, POLL_REST_MS, health,
} from "./config.js";
import { select, probe, rowToBooking } from "./supabase.js";
import { INITIAL, seedAvailability } from "./seed.js";

let cache = null;
const listeners = new Set();
let channel = null;

export const getState = () => cache || (cache = MODE === "local" ? readLocal() : INITIAL());
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = () => listeners.forEach((f) => f(cache));

/* ---------------- yerel arka uç ---------------- */
function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const init = INITIAL();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL();
  }
}

function writeLocal(state) {
  cache = state;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* kota dolu */ }
  try { channel?.postMessage({ t: Date.now() }); } catch { /* kanal yok */ }
  emit();
}

/* ---------------- supabase arka uç ---------------- */
const indexAvailability = (rows) => {
  const av = {};
  rows.forEach((a) => {
    av[`${a.product_id}|${a.date}`] =
      { closed: a.closed, booked: a.booked, cap: a.cap, reason: a.reason };
  });
  return av;
};

async function loadAll() {
  const p = await probe();
  health.ok = p.ok;
  health.error = p.ok ? null : `Supabase yanıtı: ${p.status || "ağ hatası"}`;
  health.lastSync = Date.now();

  const [bookings, availability, overrides, ads, partners] = await Promise.all([
    select("bookings"), select("availability"), select("overrides"),
    select("ads"), select("partners"),
  ]);

  const av = indexAvailability(availability);
  const ov = {};
  overrides.forEach((o) => {
    ov[`${o.concierge_id}|${o.product_id}`] =
      { price: o.price, photo: o.photo, hidden: o.hidden };
  });

  /* Bağlantı yoksa uydurma müsaitlik göstermek en tehlikeli seçenek:
     misafir dolu bir tekneye rezervasyon yapar. */
  return {
    bookings: bookings.map(rowToBooking),
    availability: Object.keys(av).length ? av : seedAvailability(),
    overrides: ov, ads, partners,
    degraded: !p.ok || Object.keys(av).length === 0,
    v: 1,
  };
}

async function pollAvailability() {
  try {
    const rows = await select("availability");
    if (!Array.isArray(rows) || rows.length === 0) throw new Error("boş");
    health.ok = true; health.lastSync = Date.now(); health.error = null;
    cache = { ...cache, availability: indexAvailability(rows), degraded: false };
  } catch {
    health.ok = false; health.error = "Müsaitlik alınamadı";
    cache = { ...cache, degraded: true };
  }
  emit();
}

/* ---------------- başlatma ---------------- */
export async function init() {
  if (MODE === "supabase") {
    cache = await loadAll();
    setInterval(pollAvailability, POLL_AVAILABILITY_MS);
    setInterval(async () => { cache = await loadAll(); emit(); }, POLL_REST_MS);
  } else {
    cache = readLocal();
    try {
      channel = new BroadcastChannel(SYNC_CHANNEL);
      channel.onmessage = () => { cache = readLocal(); emit(); };
    } catch { /* eski tarayıcı */ }
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) { cache = readLocal(); emit(); }
    });
  }
  return cache;
}

/* Tüm yazma işlemleri buradan geçer. */
export function mutate(fn) {
  const next = fn(structuredClone(getState()));
  if (MODE === "local") writeLocal(next);
  else { cache = next; emit(); }
  return next;
}

export function resetAll() {
  if (MODE !== "local") return;
  localStorage.removeItem(STORAGE_KEY);
  writeLocal(INITIAL());
}

export { MODE, health };
