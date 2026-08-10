/* Rezervasyon talepleri — oluşturma, durum değişimi, iptal. */
import { PRODUCTS } from "../data/index.js";
import { MODE } from "./config.js";
import { upsert, bookingToRow } from "./supabase.js";
import { mutate } from "./store.js";
import { avKey } from "./availability.js";

export const STATUSES = ["new", "assigned", "confirmed", "done", "cancelled"];
export const OPEN_STATUSES = ["new", "assigned", "confirmed"];

export const makeRef = (hotelSlug) =>
  `${hotelSlug.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 8999)}`;

/* Fiyat çarpanı: kişi başı ürünlerde kişi sayısı, diğerlerinde 1. */
export const unitMultiplier = (product, pax) => (product.unit === "kişi" ? pax : 1);
export const totalOf = (booking) => {
  const p = PRODUCTS.find((x) => x.id === booking.pid);
  return booking.price * unitMultiplier(p, booking.pax);
};

export function createBooking(b) {
  return mutate((s) => {
    const k = avKey(b.pid, b.date);
    const cur = s.availability[k]
      || { closed: false, booked: 0, cap: PRODUCTS.find((p) => p.id === b.pid).cap };
    s.availability[k] = { ...cur, booked: cur.booked + b.pax };
    s.bookings = [b, ...s.bookings];
    if (MODE === "supabase") {
      upsert("bookings", [bookingToRow(b)]);
      upsert("availability", [{ product_id: b.pid, date: b.date,
        closed: cur.closed, booked: cur.booked + b.pax, cap: cur.cap }]);
    }
    return s;
  });
}

export function updateBooking(id, patch, event) {
  return mutate((s) => {
    s.bookings = s.bookings.map((b) => {
      if (b.id !== id) return b;
      const next = { ...b, ...patch };
      if (event) next.log = [...(b.log || []), { t: Date.now(), e: event }];
      return next;
    });
    if (MODE === "supabase") {
      const b = s.bookings.find((x) => x.id === id);
      if (b) upsert("bookings", [bookingToRow(b)]);
    }
    return s;
  });
}

/* Misafir iptali kontenjanı geri açar — konsiyerj iptalinden farkı budur. */
export function guestCancel(id) {
  return mutate((s) => {
    const b = s.bookings.find((x) => x.id === id);
    if (!b) return s;
    const k = avKey(b.pid, b.date);
    const cur = s.availability[k];
    if (cur) s.availability[k] = { ...cur, booked: Math.max(0, cur.booked - b.pax) };
    s.bookings = s.bookings.map((x) => (x.id === id
      ? { ...x, status: "cancelled",
          log: [...(x.log || []), { t: Date.now(), e: "Misafir iptal etti" }] }
      : x));
    if (MODE === "supabase") {
      const nb = s.bookings.find((x) => x.id === id);
      upsert("bookings", [bookingToRow(nb)]);
    }
    return s;
  });
}

export const findByRef = (state, ref) =>
  state.bookings.find((b) => b.ref.toLowerCase() === String(ref || "").toLowerCase());

export const bookingsOfHotel = (state, slug) =>
  state.bookings.filter((b) => b.hotel === slug);

export const bookingsOfSupplier = (state, productIds) =>
  state.bookings.filter((b) => productIds.includes(b.pid) && b.status !== "cancelled");
