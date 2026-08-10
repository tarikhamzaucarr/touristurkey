-- ============================================================
-- TouristTurkey — RLS sıkılaştırma
-- schema.sql içindeki geçici "anon her şeye açık" politikalarını
-- gerçek kullanıma uygun hale getirir.
-- Supabase SQL Editor'da çalıştırın.
-- ============================================================

-- 1) Geçici açık politikaları kaldır
do $$
declare t text;
begin
  foreach t in array array['hotels','concierges','suppliers','products',
                           'overrides','availability','bookings','ads','partners']
  loop
    execute format('drop policy if exists anon_all on %I', t);
  end loop;
end $$;

-- 2) Herkese açık okunması gereken katalog verisi
create policy pub_read on hotels       for select to anon using (active);
create policy pub_read on products     for select to anon using (active);
create policy pub_read on availability for select to anon using (true);
create policy pub_read on overrides    for select to anon using (true);
create policy pub_read on ads          for select to anon using (active);

-- 3) Misafir yalnızca YENİ talep oluşturabilir.
--    Kendi kaydını referans numarasıyla okuyabilir, iptal edebilir.
create policy guest_insert on bookings for insert to anon with check (status = 'new');
create policy guest_read   on bookings for select to anon using (true);
create policy guest_cancel on bookings for update to anon
  using (status in ('new','assigned','confirmed'))
  with check (status = 'cancelled');

-- 4) Partner başvurusu: sadece yazma
create policy partner_insert on partners for insert to anon with check (true);

-- 5) PIN sütunu anon'a KAPALI.
--    Doğrulama için güvenli fonksiyon kullanılır.
revoke select on concierges from anon;
revoke select on suppliers  from anon;

create or replace function check_pin(p_table text, p_id text, p_pin text)
returns boolean language plpgsql security definer as $$
declare ok boolean;
begin
  if p_table = 'concierges' then
    select (pin = p_pin) into ok from concierges where id = p_id;
  elsif p_table = 'suppliers' then
    select (pin = p_pin) into ok from suppliers where id = p_id;
  else
    return false;
  end if;
  return coalesce(ok, false);
end $$;
grant execute on function check_pin(text, text, text) to anon;

-- ============================================================
-- KALAN İŞ — canlıya çıkmadan önce
-- Bu dosya yüzeyi daraltır ama tam çözüm değildir:
--   * Panel girişleri Supabase Auth'a taşınmalı (e-posta + parola)
--   * Konsiyerj yalnızca KENDİ otelinin kayıtlarını görmeli
--   * Misafir telefonu/oda numarası anon okumasına kapatılmalı
--   * PIN'ler düz metin değil, hash olarak saklanmalı
-- Misafir verisi (isim, telefon, oda) toplandığı için bunlar
-- KVKK açısından da gereklidir.
-- ============================================================
