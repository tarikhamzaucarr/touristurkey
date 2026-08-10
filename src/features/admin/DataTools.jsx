import React from "react";
import { HOTELS, PRODUCTS, SUPPLIERS, CONCIERGES } from "../../data/index.js";
import * as DB from "../../lib/index.js";
import { Link } from "../../router/index.jsx";
import { money as eur } from "../../hooks/useCurrency.js";
import { fmtDate, hoursAgo } from "../../lib/date.js";
import { Pill, Empty, KPI, STATUS } from "../../components/ui/index.jsx";

export const SOURCES = ["keycard", "wifi", "room", "lobby", "wa", "direct"];
export const SRC_TR = { keycard: "Anahtar kartı", wifi: "Wi-Fi ekranı", room: "Oda kartı",
  lobby: "Lobi standı", wa: "WhatsApp", direct: "Doğrudan" };

export function DataTools() {
  return (

        <div className="stack" style={{ gap: 14 }}>
          <div className="card pad">
            <h3 style={{ fontSize: 16 }}>Veri kaynağı</h3>
            <p className="muted" style={{ fontSize: 13.5, marginTop: 6 }}>
              Şu an <b>{DB.MODE === "supabase" ? "Supabase" : "yerel kalıcı depolama"}</b> kullanılıyor.
              Yerel modda veriler tarayıcıda saklanır ve sekmeler arasında anlık senkronize olur —
              tedarikçi bir tarihi kapattığında konsiyerj panelinde hemen görünür.
              Cihazlar arası gerçek zamanlı çalışma için Supabase bağlanmalıdır.
            </p>
            <div className="mono" style={{ fontSize: 11.5, marginTop: 12, color: "var(--mute)", lineHeight: 1.9 }}>
              VITE_SUPABASE_URL=…<br />VITE_SUPABASE_ANON_KEY=…
            </div>
            <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>
              Şema dosyaları depoda: <span className="mono">supabase/schema.sql</span> ve{" "}
              <span className="mono">supabase/seed.sql</span>
            </p>
            {DB.MODE === "supabase" && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
                  <Pill kind={DB.health.ok ? "ok" : "warn"}>
                    {DB.health.ok ? "bağlantı çalışıyor" : "bağlantı yok"}
                  </Pill>
                  {DB.health.lastSync && (
                    <Pill>son eşitleme {Math.round((Date.now() - DB.health.lastSync) / 1000)} sn önce</Pill>
                  )}
                </div>
                {DB.health.error && (
                  <p style={{ color: "var(--coral)", fontSize: 13, marginTop: 9 }}>{DB.health.error}</p>
                )}
              </div>
            )}
          </div>
          <div className="card pad">
            <h3 style={{ fontSize: 16 }}>Bakım</h3>
            <div className="row" style={{ gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <button className="btn ghost sm" onClick={() => {
                const blob = new Blob([JSON.stringify(DB.getState(), null, 2)], { type: "application/json" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob); a.download = "touristurkey-veri.json"; a.click();
              }}>Veriyi indir (JSON)</button>
              <button className="btn warn sm" onClick={() => {
                if (confirm("Tüm demo veriler sıfırlansın mı?")) DB.resetAll();
              }}>Veriyi sıfırla</button>
            </div>
          </div>
        </div>
  );
}
