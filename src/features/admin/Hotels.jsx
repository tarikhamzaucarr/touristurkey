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

export function HotelsTab({ b, mult }) {
  return (

        <div className="stack" style={{ gap: 11 }}>
          {HOTELS.map((h) => {
            const rows = b.filter((x) => x.hotel === h.slug);
            const d = rows.filter((x) => x.status === "done");
            const v = d.reduce((a, x) => a + x.price * mult(x), 0);
            const st = rows.filter((x) => ["assigned", "confirmed"].includes(x.status) && hoursAgo(x.createdAt) > 24).length;
            const c = CONCIERGES.find((y) => y.id === h.conciergeId);
            return (
              <div key={h.slug} className="card pad">
                <div className="between" style={{ flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h3 style={{ fontSize: 16 }}>{h.name}</h3>
                    <div className="mono muted" style={{ fontSize: 11.5, marginTop: 4 }}>
                      /{h.slug} · {c.name} · {c.desk} · pay %{h.split * 100} · {h.rooms} oda
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--display)", fontWeight: 800 }}>€{Math.round(v)}</div>
                    <div className="mono muted" style={{ fontSize: 11.5 }}>{d.length}/{rows.length} işlem</div>
                  </div>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: "var(--line)", marginTop: 11, overflow: "hidden" }}>
                  <div style={{ width: `${rows.length ? (d.length / rows.length) * 100 : 0}%`, height: "100%", background: h.accent }} />
                </div>
                <div className="row" style={{ gap: 7, marginTop: 10, flexWrap: "wrap" }}>
                  {st > 0 && <Pill kind="warn">{st} işlem teyit bekliyor</Pill>}
                  <Link to={`/${h.slug}`} className="pill">sayfayı aç →</Link>
                </div>
              </div>
            );
          })}
        </div>
  );
}
