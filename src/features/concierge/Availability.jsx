import React, { useState } from "react";
import { PRODUCTS, CATS } from "../../data/index.js";
import * as DB from "../../lib/index.js";
import { Pill } from "../../components/ui/index.jsx";
import { fmtDate } from "../../lib/date.js";

/* Tedarikçi bir tarihi kapattığı anda burası kırmızıya döner. */
export function Availability({ state }) {
  const days = DB.nextDays(10);
  const [cat, setCat] = useState("all");
  const list = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);
  return (
    <>
      <div className="card pad" style={{ marginBottom: 14 }}>
        <div className="between" style={{ flexWrap: "wrap", gap: 8 }}>
          <div>
            <h3 style={{ fontSize: 16 }}>Canlı müsaitlik</h3>
            <p className="muted" style={{ fontSize: 13.5, marginTop: 5 }}>
              Tedarikçi bir tarihi kapattığı anda burada kırmızıya döner. Misafir de o tarihi seçemez.
            </p>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Pill kind="ok">müsait</Pill><Pill kind="brass">az yer</Pill><Pill kind="warn">kapalı/dolu</Pill>
          </div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: 14 }}>
        <button className={`tab${cat === "all" ? " on" : ""}`} onClick={() => setCat("all")}>Tümü</button>
        {CATS.map((c) => (
          <button key={c.id} className={`tab${cat === c.id ? " on" : ""}`} onClick={() => setCat(c.id)}>{c.label}</button>
        ))}
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="tbl" style={{ minWidth: 640 }}>
          <thead>
            <tr>
              <th style={{ minWidth: 190 }}>Ürün</th>
              {days.map((d) => <th key={d} style={{ textAlign: "center" }}>{fmtDate(d)}</th>)}
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontSize: 13.5 }}>{p.title}</div>
                  <div className="mono muted" style={{ fontSize: 12 }}>{p.sup}</div>
                </td>
                {days.map((d) => {
                  const s = DB.slotStatus(state, p.id, d);
                  const c = s.code === "open" ? "var(--green)" : s.code === "low" ? "var(--brass)" : "var(--coral)";
                  return (
                    <td key={d} style={{ textAlign: "center" }}>
                      <div title={s.label} style={{ width: 26, height: 26, margin: "0 auto",
                        borderRadius: 7, display: "grid", placeItems: "center",
                        background: `color-mix(in srgb,${c} 18%,transparent)`,
                        border: `1px solid color-mix(in srgb,${c} 45%,transparent)`,
                        color: c, fontFamily: "var(--mono)", fontSize: 12 }}>
                        {s.code === "closed" ? "×" : s.code === "full" ? "0" : s.left}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
