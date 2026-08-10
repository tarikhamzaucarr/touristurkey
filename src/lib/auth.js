/* Panel girişi.
   UYARI: Bu tam bir kimlik doğrulama DEĞİLDİR. Supabase modunda PIN
   sunucudaki satırdan doğrulanır, yani istemci paketinde durmaz — ama anon
   anahtar hâlâ tabloyu okuyabilir. Canlıya çıkmadan önce Supabase Auth'a
   geçilmeli; supabase/rls.sql içindeki notlara bakın. */
import { MODE, SB_URL } from "./config.js";
import { headers } from "./supabase.js";

const LOCAL_PINS = {
  c1: "1111", c2: "2222", c3: "3333",
  sup1: "1111", sup2: "2222", sup3: "3333",
  sup4: "4444", sup5: "5555", sup6: "6666",
};

export async function verifyPin(table, id, pin) {
  if (MODE !== "supabase") return LOCAL_PINS[id] === pin;
  try {
    const r = await fetch(
      `${SB_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}&select=pin`,
      { headers });
    if (!r.ok) return false;
    const rows = await r.json();
    return rows.length > 0 && String(rows[0].pin) === String(pin);
  } catch {
    return false;
  }
}
