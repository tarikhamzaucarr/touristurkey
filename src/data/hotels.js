/* TouristTurkey — oteller ve konsiyerj masaları */

export const HOTELS = [
  { slug: "otelpera", name: "Pera Vista Hotel", district: "Beyoğlu", rooms: 62,
    accent: "#0E6B6E", conciergeId: "c1", split: 0.5, cover: "perahotel",
    logo: "PV", hours: "09:00 – 20:00" },
  { slug: "galatahouse", name: "Galata House", district: "Karaköy", rooms: 38,
    accent: "#8A5E17", conciergeId: "c2", split: 0.6, cover: "galatahotel",
    logo: "GH", hours: "08:00 – 22:00" },
  { slug: "sultancourt", name: "Sultan Court Suites", district: "Sultanahmet", rooms: 84,
    accent: "#B0432D", conciergeId: "c3", split: 0.5, cover: "sultanhotel",
    logo: "SC", hours: "24 saat" },
];

export const CONCIERGES = [
  { id: "c1", name: "Emre A.", desk: "Vista Travel Desk", wa: "+90 532 000 00 01", hotels: ["otelpera"] },
  { id: "c2", name: "Selin K.", desk: "Bosphorus Concierge", wa: "+90 533 000 00 02", hotels: ["galatahouse"] },
  { id: "c3", name: "Kaan T.", desk: "Court Tourism", wa: "+90 535 000 00 03", hotels: ["sultancourt"] },
];

export const hotelBySlug = (slug) => HOTELS.find((h) => h.slug === slug);
export const conciergeOf = (hotel) => CONCIERGES.find((c) => c.id === hotel?.conciergeId);
export const hotelOfConcierge = (id) => HOTELS.find((h) => h.conciergeId === id);
