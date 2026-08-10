/* Arka uç seçimi. Ortam değişkeni yoksa yerel kalıcı depolama kullanılır. */
export const SB_URL = import.meta.env?.VITE_SUPABASE_URL || "";
export const SB_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || "";
export const MODE = SB_URL && SB_KEY ? "supabase" : "local";

export const STORAGE_KEY = "touristurkey.v1";
export const SYNC_CHANNEL = "touristurkey.sync";

/* Müsaitlik en kritik veri; diğer tablolar daha seyrek tazelenir. */
export const POLL_AVAILABILITY_MS = 3000;
export const POLL_REST_MS = 12000;

/* Bağlantı sağlığı — arayüz bunu okuyup rezervasyonu kilitler. */
export const health = { ok: null, lastSync: null, error: null };
