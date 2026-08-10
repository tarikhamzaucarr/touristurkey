/* TouristTurkey — tedarikçiler */

export const SUPPLIERS = [
  { id: "sup1", name: "Mavi Yıldız Tekne", cat: "Tekne & Boğaz", wa: "+90 542 000 10 01" },
  { id: "sup2", name: "Elif Rehberlik", cat: "Rehberli turlar", wa: "+90 542 000 10 02" },
  { id: "sup3", name: "Nova Transfer", cat: "Transfer & araç", wa: "+90 542 000 10 03" },
  { id: "sup4", name: "Çınar Hamamı", cat: "Hamam & spa", wa: "+90 542 000 10 04" },
  { id: "sup5", name: "Bilet Noktası", cat: "Müze & bilet", wa: "+90 542 000 10 05" },
  { id: "sup6", name: "Anadolu Seyahat", cat: "Şehir dışı", wa: "+90 542 000 10 06" },
];

export const supplierById = (id) => SUPPLIERS.find((s) => s.id === id);
