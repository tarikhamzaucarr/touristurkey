# TouristTurkey

İstanbul otellerinin konsiyerj masaları için ortak rezervasyon ve satış platformu.

## Sayfalar

| Yol | Ne |
|---|---|
| `/` | Ana sayfa |
| `/rehber` · `/rehber/48-saat` | İstanbul Rehberi (içerik + bağlantılı hizmetler) |
| `/otelpera` | Konsiyerjin kendi sayfası (her masa için ayrı) |
| `/otelpera/tur/bogaz-aksam-yemegi-turu` | Ürün + canlı müsaitlik + rezervasyon |
| `/partner` | Otel & konsiyerj kayıt / tanıtım |
| `/panel` | Konsiyerj paneli — PIN 1111 / 2222 / 3333 |
| `/tedarikci` | Tedarikçi paneli — PIN 1111…6666 |
| `/yonetim` | Yönetim paneli — PIN 0000 |

QR takibi: `/otelpera?s=keycard` (`keycard`, `wifi`, `room`, `lobby`, `wa`).

## Canlı müsaitlik

Tedarikçi panelinde bir tarihe tıklandığında o gün kapanır; değişiklik
anında konsiyerj panelinde ve misafir takviminde görünür.

## Veri katmanı

Varsayılan: tarayıcıda kalıcı depolama + sekmeler arası anlık yayın.
Cihazlar arası gerçek zamanlı çalışma için Supabase:

1. `supabase/schema.sql` dosyasını Supabase SQL Editor'da çalıştırın
2. Vercel → Settings → Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Yeniden dağıtın. Uygulama otomatik olarak Supabase moduna geçer.

## Geliştirme

```bash
npm install
npm run dev
```
