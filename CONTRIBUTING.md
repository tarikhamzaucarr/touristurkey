# Katkı Kuralları

## Klasör düzeni

```
src/
  data/        Sabit içerik (oteller, ürünler, rehber). Kod yok.
  lib/         Veri erişimi ve iş mantığı. React'e bağımlı değil.
  hooks/       React'e bağlı yardımcılar.
  router/      İstemci yönlendirme.
  components/  Yeniden kullanılabilir arayüz.
    ui/        Durumsuz küçük parçalar.
    booking/   Rezervasyon parçaları.
    layout/    Bar, footer, panel çerçevesi.
  features/    Ekranlar. Her klasör bir rol veya akış.
  styles/      tokens → base → components sırasıyla.
```

## Kurallar

1. **Dosya başına 200 satır.** Aşıyorsa böl. `data/` muaftır — içerik dosyası.
2. **`lib/` içinde React yok.** Test edilebilir ve Next.js'e taşınabilir kalmalı.
3. **Veriye erişim `lib/index.js` üzerinden.** Bileşenler `supabase.js`'i doğrudan çağırmaz.
4. **Tarih üretimi yalnızca `lib/date.js` ile.** `toISOString()` kullanmayın — UTC
   döndürüyor ve İstanbul'da gece yarısı tarihi bir gün kaydırıyor.
5. **Yıkıcı işlemler `ConfirmButton` ile.** Tek dokunuşla iptal olmaz.
6. **Durum yalnızca renkle anlatılmaz.** Renk + simge + metin.
7. **Dokunma hedefleri en az 44px.**
8. **Metin en az 12px.**

## Değiştirmeden önce bilinmesi gerekenler

- `degraded` bayrağı: Supabase'e ulaşılamazsa rezervasyon kilitlenir. Kaldırmayın —
  aksi halde misafir dolu bir tekneye rezervasyon yapar.
- `?s=` parametresi QR kaynağını taşır ve `navigate()` içinde korunur. Attribution
  buna bağlı.
- PIN doğrulaması gerçek kimlik doğrulama değildir. Bkz. `supabase/rls.sql`.

## Sürüm alma

```bash
npm install
npm run dev      # geliştirme
npm run build    # üretim derlemesi
```
