# Next.js + TypeScript Migrasyon Planı

Mevcut yığın: Vite + React (JS) + el yazısı CSS + Supabase REST.
Hedef yığın: Next.js (App Router) + TypeScript strict + Tailwind + shadcn/ui
+ React Hook Form + Zod + Drizzle/Supabase.

Bu **2-3 haftalık** bir iş. Tek oturumda "bitti" demek gerçekçi değil.
Aşağıdaki sıra, her aşamada çalışan bir ürün bırakacak şekilde kuruldu.

## Aşama 1 — İskelet ve tipler (3-4 gün)
- `create-next-app --typescript --tailwind --app`
- `types/index.ts`: Product, Hotel, Concierge, Supplier, Booking, Availability
- `lib/schema.ts`: Zod şemaları (booking formu, partner formu)
- `lib/db.ts`: Supabase istemcisi (server) + `lib/db.client.ts` (realtime)
- Tailwind token'ları: mevcut CSS değişkenleri `tailwind.config.ts` içine

## Aşama 2 — Sunucu tarafı sayfalar (4-5 gün)
Statik/az değişen içerik RSC olur, SEO buradan kazanılır:
- `app/page.tsx` — ana sayfa (RSC, ürünler DB'den)
- `app/[hotel]/page.tsx` — otel sayfası (RSC, `generateStaticParams`)
- `app/rehber/[slug]/page.tsx` — rehber (RSC)
- `app/[hotel]/tur/[slug]/page.tsx` — ürün (RSC + client rezervasyon adası)
- `generateMetadata` ile per-route meta + JSON-LD

## Aşama 3 — Etkileşimli adalar (3-4 gün)
Bunlar zorunlu olarak `'use client'`:
- `components/booking/Calendar.tsx` (canlı müsaitlik aboneliği)
- `components/booking/BookingForm.tsx` (RHF + Zod)
- `components/ui/CurrencyPicker.tsx`
- Paneller: `app/panel`, `app/tedarikci`, `app/yonetim`

## Aşama 4 — Server Actions ve auth (3-4 gün)
- Yazma işlemleri: `app/actions/booking.ts` (`'use server'`)
- Supabase Auth: konsiyerj ve tedarikçi girişi (PIN yerine e-posta+parola)
- RLS politikalarını kullanıcıya bağla (konsiyerj sadece kendi otelini görsün)

## Aşama 5 — Kalite (2-3 gün)
- `loading.tsx`, `error.tsx`, `not-found.tsx` her segment için
- Playwright ile 375px ve 1280px görsel testler
- Lighthouse: LCP, CLS, erişilebilirlik puanı

---

## Prompt'tan sapılan noktalar ve gerekçeleri

**1. "Tüm bileşenler varsayılan RSC"**
Uygulanacak, ama panellerin tamamı ve rezervasyon akışı client kalacak.
Bunlar durum, tarayıcı API'si ve 3 saniyelik canlı senkronizasyon gerektiriyor.
Doğru sınır: *sayfa ve veri RSC, etkileşimli yapraklar client.*

**2. "Client'ta doğrudan API çağrısı yok"**
Yazma işlemleri Server Action'a taşınacak. Ancak **canlı müsaitlik okuması
istemcide kalacak** — Supabase Realtime tasarımı gereği istemci taraflıdır ve
sunucuya taşımak 3 saniyelik güncellemeyi öldürür.

**3. "Dosya başına 200 satır"**
Kod dosyaları için uygulanacak. `data/products.ts` gibi içerik dosyaları
muaf — 16 ürünün açıklaması kod değil, içerik.

**4. MCP araçları**
Context7, Playwright, GitHub ve Sentry bu ortamda bağlı değil. Bağlandıklarında
belge doğrulama, görsel test ve hata takibi adımları devreye alınacak.

## Migrasyon sırasında korunacaklar
- Saat dilimi düzeltmesi (yerel tarih üretimi)
- `degraded` bayrağı ve rezervasyon kilidi
- QR kaynak parametresi taşıma (`?s=`)
- Kontrast düzeltilmiş renk token'ları
- İptal politikası ve takip sayfası akışı
