/* Tarih yardımcıları.
   ÖNEMLİ: toISOString() UTC döndürdüğü için İstanbul'da (UTC+3) gece yarısı
   ile 03:00 arasında "bugün" bir gün geriye kayıyordu — tam da misafirin
   odada plan yaptığı saatlerde. Bu yüzden her yerde yerel tarih üretilir. */

export const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

const pad = (n) => String(n).padStart(2, "0");
export const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const today = () => iso(new Date());

export const plusDays = (n) => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);   // yaz saati kaymalarına karşı gün ortası
  d.setDate(d.getDate() + n);
  return iso(d);
};

export const nextDays = (n = 14) => Array.from({ length: n }, (_, i) => plusDays(i));

export const fmtDate = (isoStr) => {
  const d = new Date(isoStr + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
};

export const hoursAgo = (t) => Math.max(0, Math.round((Date.now() - t) / 3600e3));
