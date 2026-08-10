/* TouristTurkey — İstanbul Rehberi içerikleri */

/* ---------------- İstanbul Guide içerikleri ---------------- */
export const GUIDE = [
  {
    slug: "48-saat",
    title: "İstanbul'da 48 Saat",
    kicker: "İlk kez gelenler için",
    photo: "istanbulskyline",
    excerpt: "Ortalama kalış süresi 2,2 gün. İki günde şehri kaçırmadan görmenin en gerçekçi planı.",
    body: [
      { h: "1. Gün — Tarihi Yarımada", p: "Sabah 08:30'da Ayasofya'da olun; kuyruk 10:00'dan sonra bir saati aşıyor. Ardından Sultanahmet ve Yerebatan. Öğleden sonra Topkapı ve Harem. Akşamüstü Kapalıçarşı'da kaybolun — pazarlık beklenen bir şey, rahatsız olmayın." },
      { h: "2. Gün — Boğaz ve modern taraf", p: "Sabah Karaköy'de kahvaltı, sonra Galata çevresi. Öğleden sonra Boğaz'a açılın. Akşamı yemekli tekne turuyla kapatmak, iki günü tamamlayan en yaygın tercih." },
      { h: "Kaçınılacak hatalar", p: "Topkapı salı, Kapalıçarşı pazar kapalı. Havalimanından taksiyle pazarlıklı gitmeyin. Boğaz turunu öğlen değil, gün batımında yapın." },
    ],
    products: ["p02", "p04", "p01", "p08"],
  },
  {
    slug: "bogaz",
    title: "Boğaz'ı Doğru Görmek",
    kicker: "Su üstünde İstanbul",
    photo: "bosphorusview",
    excerpt: "Vapur mu, özel tekne mi, yemekli tur mu? Hangisi kime uygun, net karşılaştırma.",
    body: [
      { h: "Şehir hatları vapuru", p: "En ucuzu ve en otantiği. Ama kalabalık, saat sabit ve durmadan geçiyor. Bütçe odaklı gezginler için doğru seçim." },
      { h: "Küçük grup yat", p: "12 kişiyle, ikramlı, gün batımında. Fiyat/deneyim dengesi en iyi olan seçenek. Çiftlerin ve kutlamaların birinci tercihi." },
      { h: "Yemekli tur + show", p: "Aileler ve ilk kez gelenler için. Akşam yemeğini ve gezmeyi tek kalemde çözüyor. Pencere kenarı masayı mutlaka isteyin." },
    ],
    products: ["p05", "p01", "p15", "p11"],
  },
  {
    slug: "hamam",
    title: "Türk Hamamı Rehberi",
    kicker: "Ne bekleyeceğinizi bilin",
    photo: "hammaminterior",
    excerpt: "İlk kez gidenler için adım adım: ne giyilir, ne yapılır, ne kadar bahşiş verilir.",
    body: [
      { h: "Nasıl işliyor", p: "Peştemalle sıcaklığa girilir, mermer göbek taşında 15-20 dakika terlenir. Ardından kese, sonra köpük masajı. Toplam 60-90 dakika." },
      { h: "Sık sorulanlar", p: "Mayo giyilebilir. Kadın ve erkek bölümleri ayrıdır; özel bölüm opsiyonu çiftler için vardır. Tellak ile aynı cinsiyet standarttır." },
      { h: "Bahşiş", p: "Hizmet bedelinin %10-15'i normaldir ve nakit verilir." },
    ],
    products: ["p07", "p14"],
  },
  {
    slug: "yemek",
    title: "Nerede Yenir?",
    kicker: "Turist tuzağından uzak",
    photo: "turkishfood",
    excerpt: "Sultanahmet'in ana caddesinde yemeyin. Nerede, ne yenir, hangi mahalle neye iyi gelir.",
    body: [
      { h: "Kahvaltı", p: "Beşiktaş ve Karaköy. Serpme kahvaltı iki kişilik gelir, tek porsiyon istemek yaygındır." },
      { h: "Akşam", p: "Meyhane kültürü için Asmalımescit ve Kadıköy. Boğaz manzarası için Ortaköy ve Kuruçeşme — rezervasyon şart." },
      { h: "Sokak", p: "Balık ekmek Eminönü'nde, midye dolma her yerde, kokoreç akşam saatlerinde. Karaköy ve Balat yürüyerek keşfedilir." },
    ],
    products: ["p12", "p13"],
  },
  {
    slug: "ulasim",
    title: "Şehirde Ulaşım",
    kicker: "Pratik bilgiler",
    photo: "istanbultram",
    excerpt: "İstanbulkart, taksi, tramvay ve havalimanı. Turistin en çok para kaybettiği yer burası.",
    body: [
      { h: "Havalimanı", p: "IST şehre 45-60 dakika, SAW 60-90 dakika. Özel transfer sabit fiyatlı ve karşılamalı; ilk gün için en güvenli seçenek." },
      { h: "Şehir içi", p: "İstanbulkart alın, her araçta geçerli. Tramvay tarihi yarımadada en hızlısı. Trafik saatlerinde metro her zaman kazanır." },
      { h: "Taksi", p: "Taksimetre açtırın. Kısa mesafede reddedilme yaygın; uygulama üzerinden çağırmak sorunu azaltır." },
    ],
    products: ["p08", "p14"],
  },
];

export const guideBySlug = (slug) => GUIDE.find((g) => g.slug === slug);
