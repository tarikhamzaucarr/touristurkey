import React, { useState } from "react";
import * as DB from "../../lib/index.js";
import { fmtDate } from "../../lib/date.js";
import { Pill } from "../../components/ui/index.jsx";

/* Bir güne tıklamak o tarihi kapatır; değişiklik anında konsiyerj
   panellerinde ve misafir takviminde görünür. */
export function SupplierCalendar({ products, state }) {
  const days = DB.nextDays(14);
  const [reason, setReason] = useState("Kontenjan doldu");
  return (
    <>
      <div className="card pad" style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 16 }}>Müsaitlik takvimi</h3>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 5 }}>
          Bir güne tıklayarak kapatın veya açın. Değişiklik <b>anında</b> konsiyerj
          panellerinde ve misafir sayfalarında görünür.
        </p>
        <div style={{ marginTop: 12, maxWidth: 320 }}>
          <label className="lbl">Kapatma nedeni</label>
          <select className="inp" value={reason} onChange={(e) => setReason(e.target.value)}>
            {["Kontenjan doldu", "Bakım", "Hava muhalefeti", "Özel kiralama", "Personel yok"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="stack" style={{ gap: 14 }}>
        {products.map((p) => (
          <div key={p.id} className="card pad">
            <div className="between" style={{ flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontSize: 15.5 }}>{p.title}</h3>
              <Pill>kapasite {p.cap}</Pill>
            </div>
            <div style={{ overflowX: "auto", marginTop: 12 }}>
              <div style={{ display: "flex", gap: 6, minWidth: 620 }}>
                {days.map((d) => {
                  const s = DB.slotStatus(state, p.id, d);
                  const raw = DB.slotFor(state, p.id, d);
                  const c = s.code === "open" ? "var(--green)" : s.code === "low" ? "var(--brass)" : "var(--coral)";
                  return (
                    <button key={d} className="day" style={{ flex: "1 0 62px", borderColor: `color-mix(in srgb,${c} 45%,transparent)` }}
                      onClick={() => DB.toggleClosed(p.id, d, !raw.closed, reason)}
                      title={raw.closed ? "Açmak için tıklayın" : "Kapatmak için tıklayın"}>
                      <div className="d">{new Date(d + "T00:00:00").getDate()}</div>
                      <div className="m">{fmtDate(d).split(" ")[1]}</div>
                      <div className="mono" style={{ fontSize: 9, color: c, marginTop: 4 }}>
                        {s.code === "closed" ? "kapalı" : s.code === "full" ? "dolu" : `${s.left} yer`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
