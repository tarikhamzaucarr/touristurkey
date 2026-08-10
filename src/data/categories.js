/* TouristTurkey — kategoriler */

export const CATS = [
  { id: "bogaz", label: "Boğaz & Tekne" },
  { id: "kultur", label: "Kültür & Müze" },
  { id: "transfer", label: "Transfer" },
  { id: "hamam", label: "Hamam & Spa" },
  { id: "lezzet", label: "Lezzet" },
  { id: "ozel", label: "Özel & Lüks" },
];

export const catLabel = (id) => CATS.find((c) => c.id === id)?.label || "";
