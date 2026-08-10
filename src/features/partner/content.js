/* Partner sayfası metinleri — kod değil içerik. */
export const REASONS = [
  { n: "01", t: "Masanız 24 saat açık olur", p: "Misafir turu gece 23:00'te odasında planlıyor. O saatte masanız kapalı, satış Viator'a gidiyor. Dijital masanız hiç kapanmaz." },
  { n: "02", t: "Lobiden geçmeyen misafire de ulaşırsınız", p: "Otelde 60 oda var ama masanızın önünden günde 20 kişi geçiyor. QR ve Wi-Fi ekranıyla 60 odanın tamamına ulaşırsınız." },
  { n: "03", t: "5 dilde konuşursunuz", p: "Rus, Arap, İranlı ve Alman misafirle dil bariyeri satışı bitiriyor. Sayfanız ve mesajlaşma çok dilli çalışır." },
  { n: "04", t: "Hiçbir şey kaybolmaz", p: "Not defteri, WhatsApp, ekran görüntüsü yok. Her talep referans numarasıyla kayıtlı, durumu belli." },
  { n: "05", t: "Fiyatınız sizin kalır", p: "Kendi sayfanızda fiyatı, fotoğrafı ve hangi ürünün görüneceğini siz belirlersiniz. Marjınız size ait, kimseye görünmez." },
];

/* Rakip karşılaştırma tablosu. */
export const COMPARE = [
  { t: "Uluslararası platform", a: ["Komisyon yurt dışına gider", "Misafirle otel arasına girer", "Sizi hiç tanımaz", "İptalde muhatap yok"], bad: true },
  { t: "TouristTurkey", a: ["Komisyon şehirde kalır", "Misafir sizin masanıza gelir", "Sayfa sizin adınıza çalışır", "Muhatap sizsiniz"], bad: false },
  { t: "Tek başına çalışmak", a: ["Tedarikçiden pahalı fiyat", "Gece ve odalardan satış yok", "Dil bariyeri", "Kayıt tutulmuyor"], bad: true },
];
