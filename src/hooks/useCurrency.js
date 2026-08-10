import { useEffect, useState } from "react";
import { RATES, SYMBOL } from "../data/index.js";

/* Para birimi oturum boyunca yaşar, tarayıcıya yazılmaz.
   Kur sabit: kesin tahsilat euro üzerinden, bu yalnızca büyüklük hissi. */
let current = "EUR";
const listeners = new Set();

export const getCurrency = () => current;
export function setCurrency(c) { current = c; listeners.forEach((f) => f()); }

export function useCurrency() {
  const [, force] = useState(0);
  useEffect(() => {
    const f = () => force((n) => n + 1);
    listeners.add(f);
    return () => listeners.delete(f);
  }, []);
  return current;
}

export function money(n) {
  if (n === 0) return "Ücretsiz";
  const v = n * RATES[current];
  const r = current === "TRY" ? Math.round(v / 5) * 5 : Math.round(v);
  return `${SYMBOL[current]}${r.toLocaleString("tr-TR")}`;
}
