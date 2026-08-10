import React, { useState } from "react";
import { slotStatus } from "../../lib/availability.js";
import { nextDays, fmtDate, MONTHS } from "../../lib/date.js";
import { useStore } from "../../hooks/useStore.js";

/* 60 günlük takvim, üçer haftalık sayfalama.
   Durum renk + simge ile verilir; yalnızca renk renk körü kullanıcıyı
   dışarıda bırakıyordu. */
const WEEKS = 3;
const DAYS = WEEKS * 7;
const RANGE = 60;

export function Calendar({ pid, value, onPick, pax = 1 }) {
  const state = useStore();
  const [offset, setOffset] = useState(0);
  const all = nextDays(RANGE);
  const page = all.slice(offset * DAYS, offset * DAYS + DAYS);
  const maxPage = Math.ceil(all.length / DAYS) - 1;
  const label = page.length ? `${fmtDate(page[0])} – ${fmtDate(page[page.length - 1])}` : "";

  return (
    <>
      <div className="between" style={{ marginBottom: 9 }}>
        <button className="btn ghost sm" disabled={offset === 0}
          onClick={() => setOffset(offset - 1)} aria-label="Önceki tarihler">←</button>
        <span className="mono" style={{ fontSize: 12 }}>{label}</span>
        <button className="btn ghost sm" disabled={offset >= maxPage}
          onClick={() => setOffset(offset + 1)} aria-label="Sonraki tarihler">→</button>
      </div>

      <div className="cal">
        {page.map((iso) => {
          const s = slotStatus(state, pid, iso);
          const d = new Date(`${iso}T00:00:00`);
          const off = s.code === "closed" || s.code === "full" || s.left < pax;
          const icon = off ? "✕" : s.code === "low" ? "!" : "✓";
          const color = off ? "var(--coral)" : s.code === "low" ? "var(--brass)" : "var(--green)";
          return (
            <button key={iso} disabled={off} onClick={() => !off && onPick(iso)}
              className={`day${value === iso ? " sel" : ""}${off ? " off" : ""}${s.code === "low" ? " low" : ""}`}
              aria-label={`${fmtDate(iso)} — ${off ? "uygun değil" : s.label}`}>
              <div className="d">{d.getDate()}</div>
              <div className="m">{MONTHS[d.getMonth()]}</div>
              <div className="state" style={{ color, marginTop: 3 }}>{icon}</div>
            </button>
          );
        })}
      </div>

      <div className="row" style={{ gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        <span className="state" style={{ color: "var(--green)" }}>✓ müsait</span>
        <span className="state" style={{ color: "var(--brass)" }}>! az yer</span>
        <span className="state" style={{ color: "var(--coral)" }}>✕ uygun değil</span>
      </div>

      {value && (
        <div className="mono" style={{ fontSize: 12, marginTop: 9, color: "var(--mute)" }}>
          {fmtDate(value)} · {slotStatus(state, pid, value).label}
        </div>
      )}
    </>
  );
}
