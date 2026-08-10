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

export function Dashboard({ b, done, mult, gmv, gross, concShare, confirmRate, stale }) {
  return (

        <>
          <div className="kpis">
            <KPI label="Toplam talep" value={b.length} />
            <KPI label="Gerçekleşen" value={done.length} sub={`dönüşüm %${b.length ? Math.round(done.length / b.length * 100) : 0}`} color="var(--green)" />
            <KPI label="Hacim (GMV)" value={`€${Math.round(gmv).toLocaleString()}`} />
            <KPI label="Brüt marj" value={`€${Math.round(gross)}`} color="var(--brass)" />
            <KPI label="Konsiyerj payı" value={`€${Math.round(concShare)}`} />
            <KPI label="Size kalan" value={`€${Math.round(gross - concShare)}`} color="var(--iznik)" />
            <KPI label="Teyit oranı" value={`%${confirmRate}`}
              sub={confirmRate >= 85 ? "sağlıklı" : confirmRate >= 60 ? "izleyin" : "sızıntı riski"}
              color={confirmRate >= 85 ? "var(--green)" : confirmRate >= 60 ? "var(--brass)" : "var(--coral)"} />
            <KPI label="Teyit bekleyen" value={stale.length} color={stale.length ? "var(--coral)" : "var(--ink)"} />
          </div>

          <h3 style={{ fontSize: 16, margin: "26px 0 12px" }}>QR kaynağına göre talep</h3>
          <div className="card pad stack" style={{ gap: 11 }}>
            {SOURCES.map((s) => {
              const n = b.filter((x) => x.source === s).length;
              const max = Math.max(1, ...SOURCES.map((y) => b.filter((x) => x.source === y).length));
              return (
                <div key={s}>
                  <div className="between mono" style={{ fontSize: 12, marginBottom: 5 }}>
                    <span className="muted">{SRC_TR[s]}</span><span>{n}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 4, background: "var(--line)", overflow: "hidden" }}>
                    <div style={{ width: `${(n / max) * 100}%`, height: "100%", background: "var(--iznik)" }} />
                  </div>
                </div>
              );
            })}
          </div>

          <h3 style={{ fontSize: 16, margin: "26px 0 12px" }}>En çok talep alan ürünler</h3>
          <div className="card" style={{ overflowX: "auto" }}>
            <table className="tbl" style={{ minWidth: 520 }}>
              <thead><tr><th>Ürün</th><th>Tedarikçi</th><th>Talep</th><th>Hacim</th></tr></thead>
              <tbody>
                {PRODUCTS.map((p) => {
                  const rows = b.filter((x) => x.pid === p.id);
                  const v = rows.filter((x) => x.status === "done").reduce((a, x) => a + x.price * mult(x), 0);
                  return { p, n: rows.length, v };
                }).filter((r) => r.n > 0).sort((a, z) => z.n - a.n).slice(0, 8).map(({ p, n, v }) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td className="muted">{SUPPLIERS.find((s) => s.id === p.sup)?.name}</td>
                    <td className="mono">{n}</td>
                    <td className="mono">€{Math.round(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
  );
}
