-- Mevcut Supabase projesine yeni alanları ekler.
-- schema.sql'i zaten çalıştırdıysanız yalnızca bunu çalıştırın.
alter table bookings add column if not exists slot text;
alter table bookings add column if not exists phone text;
alter table hotels   add column if not exists logo text;
alter table hotels   add column if not exists hours text;

update hotels set logo = 'PV', hours = '09:00 – 20:00' where slug = 'otelpera';
update hotels set logo = 'GH', hours = '08:00 – 22:00' where slug = 'galatahouse';
update hotels set logo = 'SC', hours = '24 saat'       where slug = 'sultancourt';
