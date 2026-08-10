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

export function Partners({ state }) {
  return (
    <>

        <>
          {state.partners.length === 0 && <Empty>Henüz başvuru yok. /partner sayfasından gelirler.</Empty>}
          <div className="stack" style={{ gap: 10 }}>
            {state.partners.map((p) => (
              <div key={p.id} className="card pad">
                <div className="between">
                  <div>
                    <h3 style={{ fontSize: 15.5 }}>{p.name} — {p.org || "—"}</h3>
                    <div className="mono muted" style={{ fontSize: 12, marginTop: 5 }}>
                      {p.phone} · {p.hotel || "otel belirtilmedi"}
                    </div>
                  </div>
                  <Pill kind="iznik">{p.type}</Pill>
                </div>
                {p.note && <p className="muted" style={{ fontSize: 13.5, marginTop: 9 }}>{p.note}</p>}
              </div>
            ))}
          </div>
        </>
    </>
  );
}
