/* Müsaitlik — okuma ve tedarikçi tarafı yazma. */
import { PRODUCTS } from "../data/index.js";
import { MODE } from "./config.js";
import { upsert } from "./supabase.js";
import { getState, mutate } from "./store.js";

export const avKey = (pid, date) => `${pid}|${date}`;

export function slotFor(state, pid, date) {
  const p = PRODUCTS.find((x) => x.id === pid);
  return state.availability[avKey(pid, date)]
    || { closed: false, booked: 0, cap: p ? p.cap : 10 };
}

/* Durum kodları arayüzde renk + simge olarak gösterilir.
   Yalnızca renkle anlatmak renk körü kullanıcıyı dışarıda bırakıyordu. */
export function slotStatus(state, pid, date) {
  const s = slotFor(state, pid, date);
  if (s.closed) return { code: "closed", label: s.reason || "Kapalı", left: 0 };
  const left = Math.max(0, s.cap - s.booked);
  if (left === 0) return { code: "full", label: "Dolu", left: 0 };
  const lowMark = Math.max(2, Math.round(s.cap * 0.15));
  if (left <= lowMark) return { code: "low", label: `Son ${left} yer`, left };
  return { code: "open", label: `${left} yer`, left };
}

export function toggleClosed(pid, date, closed, reason = "") {
  return mutate((s) => {
    const k = avKey(pid, date);
    const cur = s.availability[k]
      || { closed: false, booked: 0, cap: PRODUCTS.find((p) => p.id === pid).cap };
    s.availability[k] = { ...cur, closed, reason: closed ? reason || "Tedarikçi kapattı" : "" };
    if (MODE === "supabase") {
      upsert("availability", [{ product_id: pid, date, closed,
        booked: cur.booked, cap: cur.cap, reason }]);
    }
    return s;
  });
}

export function setCapacity(pid, date, cap) {
  return mutate((s) => {
    const k = avKey(pid, date);
    const cur = s.availability[k] || { closed: false, booked: 0, cap };
    s.availability[k] = { ...cur, cap: Math.max(0, cap) };
    return s;
  });
}

export const seatsFree = (pid, date) => slotStatus(getState(), pid, date).left;
