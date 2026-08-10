import React from "react";
import { useCurrency, setCurrency } from "../../hooks/useCurrency.js";

/* Kişi sayısı — 6 sabit buton yerine sayaç; üst sınır gerçek kapasite. */
export function Stepper({ value, set, max = 12, min = 1 }) {
  return (
    <div className="step">
      <button onClick={() => set(Math.max(min, value - 1))}
        disabled={value <= min} aria-label="Azalt">−</button>
      <span className="v" aria-live="polite">{value}</span>
      <button onClick={() => set(Math.min(max, value + 1))}
        disabled={value >= max} aria-label="Artır">+</button>
    </div>
  );
}

export function CurrencyPicker() {
  const c = useCurrency();
  return (
    <div className="cur" role="group" aria-label="Para birimi">
      {["EUR", "USD", "TRY"].map((x) => (
        <button key={x} className={c === x ? "on" : ""}
          onClick={() => setCurrency(x)} aria-pressed={c === x}>{x}</button>
      ))}
    </div>
  );
}

/* Saat seçimi — ürünün gerçek seansları. */
export function SlotPicker({ slots, value, onPick }) {
  if (!slots || slots[0] === "esnek") return null;
  return (
    <div className="slots">
      {slots.map((h) => (
        <button key={h} className={`slot${value === h ? " on" : ""}`}
          aria-pressed={value === h} onClick={() => onPick(h)}>{h}</button>
      ))}
    </div>
  );
}
