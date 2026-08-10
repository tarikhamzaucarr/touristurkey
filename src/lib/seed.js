/* Demo verisi. Supabase bağlıyken yalnızca ilk açılışta yedek olarak kullanılır. */
import { PRODUCTS } from "../data/index.js";
import { plusDays } from "./date.js";

export function seedAvailability() {
  const av = {};
  PRODUCTS.forEach((p) => {
    for (let i = 0; i < 30; i++) {
      const date = plusDays(i);
      av[`${p.id}|${date}`] = { closed: false, booked: 0, cap: p.cap };
    }
  });
  // Örnek kapatmalar — tedarikçinin gerçek hayatta yapacağı şey
  av[`p05|${plusDays(2)}`] = { closed: true, booked: 0, cap: 12, reason: "Bakım" };
  av[`p11|${plusDays(1)}`] = { closed: true, booked: 0, cap: 5, reason: "Hava muhalefeti" };
  av[`p01|${plusDays(3)}`] = { closed: false, booked: 38, cap: 40 };
  return av;
}

export function seedBookings() {
  const mk = (i, hotel, pid, status, hoursAgo, supOK = false) => {
    const p = PRODUCTS.find((x) => x.id === pid);
    return {
      id: `b${i}`, ref: `${hotel.slice(0, 3).toUpperCase()}-${1200 + i}`,
      hotel, source: ["keycard", "wifi", "room", "lobby", "wa"][i % 5],
      room: `${2 + (i % 4)}0${i % 9}`, pid, pax: 1 + (i % 4),
      date: plusDays(1 + (i % 6)), note: "", status,
      price: p.list, net: p.net, supOK,
      createdAt: Date.now() - hoursAgo * 3600e3,
      log: [{ t: Date.now() - hoursAgo * 3600e3, e: "Talep oluşturuldu" }],
    };
  };
  return [
    mk(1, "otelpera", "p01", "done", 40, true),
    mk(2, "otelpera", "p08", "confirmed", 30),
    mk(3, "galatahouse", "p07", "done", 26, true),
    mk(4, "galatahouse", "p03", "assigned", 29),
    mk(5, "sultancourt", "p12", "done", 12, true),
    mk(6, "sultancourt", "p10", "new", 3),
    mk(7, "otelpera", "p05", "done", 50, true),
    mk(8, "galatahouse", "p02", "confirmed", 5),
    mk(9, "sultancourt", "p04", "new", 1),
  ];
}

export const INITIAL = () => ({
  bookings: seedBookings(),
  availability: seedAvailability(),
  overrides: {},   // `${conciergeId}|${productId}` -> { price, photo, hidden }
  ads: [
    { id: "a1", hotel: "otelpera", title: "Teras Bar — Gün Batımı Saati", body: "18:00-20:00 arası tüm kokteyllerde ikinci içecek ikram.", photo: "rooftopbar", active: true },
    { id: "a2", hotel: "galatahouse", title: "Geç Çıkış", body: "Uygunluk durumuna göre 15:00'a kadar geç çıkış. Resepsiyondan sorun.", photo: "hotelroom", active: true },
  ],
  partners: [],    // /partner formundan gelen kayıtlar
  v: 1,
});
