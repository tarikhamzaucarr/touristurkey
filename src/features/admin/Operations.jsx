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

export function Operations({ b, mult }) {
  return (

        <div className="card" style={{ overflowX: "auto" }}>
          <table className="tbl" style={{ minWidth: 720 }}>
            <thead><tr><th>Ref</th><th>Otel</th><th>Ürün</th><th>Tarih</th><th>Kaynak</th><th>Tutar</th><th>Durum</th></tr></thead>
            <tbody>
              {b.map((x) => (
                <tr key={x.id}>
                  <td className="mono" style={{ fontSize: 12 }}>{x.ref}</td>
                  <td>{HOTELS.find((h) => h.slug === x.hotel)?.name}</td>
                  <td>{PRODUCTS.find((p) => p.id === x.pid)?.title}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{fmtDate(x.date)}</td>
                  <td className="muted" style={{ fontSize: 12 }}>{SRC_TR[x.source] || x.source}</td>
                  <td className="mono">{eur(x.price * mult(x))}</td>
                  <td><Pill kind={STATUS[x.status].kind}>{STATUS[x.status].label}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}
