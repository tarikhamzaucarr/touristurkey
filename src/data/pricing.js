/* TouristTurkey — fiyat, birim ve iptal politikası */

/* İptal politikası — kartta ve ürün sayfasında gösterilir */
export const CANCEL = {
  default: "24 saate kadar ücretsiz iptal",
  p10: "7 gün öncesine kadar ücretsiz iptal",
  p11: "48 saate kadar ücretsiz iptal · hava muhalefetinde tam iade",
  p08: "3 saat öncesine kadar ücretsiz iptal",
  p13: "Ücretsiz — istediğiniz zaman iptal",
};
export const cancelOf = (id) => CANCEL[id] || CANCEL.default;

/* Fiyatın neyi kapsadığını tam cümleyle söyler.
   "€185 / grup" ifadesi misafirin kişi başı sanmasına yol açıyordu. */
export const UNIT_TEXT = {
  "kişi": (n) => `kişi başına · ${n} kişi için toplam hesaplanır`,
  "araç": () => "araç başına · içindeki herkes dahil",
  "grup": () => "grup fiyatı · 8 kişiye kadar aynı fiyat",
  "çift": () => "iki kişilik fiyat",
  "tekne": () => "tekne başına · içindeki herkes dahil",
};
export const unitText = (unit, pax = 1) =>
  UNIT_TEXT[unit] ? UNIT_TEXT[unit](pax) : "";

/* Kur — kabaca büyüklük hissi için. Kesin tahsilat euro üzerinden. */
export const RATES = { EUR: 1, USD: 1.09, TRY: 47.5 };
export const SYMBOL = { EUR: "€", USD: "$", TRY: "₺" };
