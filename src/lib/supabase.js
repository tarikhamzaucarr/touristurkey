/* Supabase REST istemcisi — bağımlılıksız fetch.
   @supabase/supabase-js eklemek yerine düz REST tercih edildi:
   paket boyutu ve derleme riski düşük kalıyor. */
import { SB_URL, SB_KEY } from "./config.js";

export const headers = {
  apikey: SB_KEY,
  Authorization: `Bearer ${SB_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const select = (table, query = "select=*") =>
  fetch(`${SB_URL}/rest/v1/${table}?${query}`, { headers })
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);

export const upsert = (table, rows) =>
  fetch(`${SB_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
  }).catch(() => null);

export const probe = () =>
  fetch(`${SB_URL}/rest/v1/availability?select=product_id&limit=1`, { headers })
    .then((r) => ({ ok: r.ok, status: r.status }))
    .catch(() => ({ ok: false, status: 0 }));

/* Kayıt biçimi dönüşümleri tek yerde. */
export const bookingToRow = (b) => ({
  id: b.id, ref: b.ref, hotel: b.hotel, source: b.source, room: b.room,
  product_id: b.pid, pax: b.pax, date: b.date, slot: b.slot, phone: b.phone,
  note: b.note, status: b.status, price: b.price, net: b.net,
  sup_ok: b.supOK, log: b.log,
});

export const rowToBooking = (r) => ({
  ...r, pid: r.product_id, supOK: r.sup_ok,
  createdAt: new Date(r.created_at).getTime(), log: r.log || [],
});
