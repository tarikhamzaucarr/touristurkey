import React, { useState } from "react";
import { PRODUCTS, CATS } from "../../data/index.js";
import * as DB from "../../lib/index.js";
import { KPI, Empty } from "../../components/ui/index.jsx";
import { money as eur } from "../../hooks/useCurrency.js";
import { fmtDate } from "../../lib/date.js";

/* Hakediş. Yalnızca kapatılmış işlemler ödemeye girer. */
export function Money({ list, hotel }) {
  const done = list.filter((b) => b.status === "done");
  const pend = list.filter((b) => ["assigned", "confirmed"].includes(b.status));
  const calc = (arr) => arr.reduce((a, b) => {
    const p = PRODUCTS.find((x) => x.id === b.pid);
    const mult = p.unit === "kişi" ? b.pax : 1;
    return a + (b.price - b.net) * mult * hotel.split;
  }, 0);
  const gmv = done.reduce((a, b) => {
    const p = PRODUCTS.find((x) => x.id === b.pid);
    return a + b.price * (p.unit === "kişi" ? b.pax : 1);
  }, 0);

  return (
    <>
      <div className="kpis">
        <KPI label="Gerçekleşen" value={done.length} />
        <KPI label="Hacim" value={`€${Math.round(gmv)}`} />
        <KPI label="Hakedişiniz" value={`€${Math.round(calc(done))}`} color="var(--brass)" />
        <KPI label="Bekleyen" value={`€${Math.round(calc(pend))}`} sub={`${pend.length} işlem`} />
      </div>
      <div className="card" style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="tbl" style={{ minWidth: 560 }}>
          <thead><tr><th>Referans</th><th>Ürün</th><th>Tarih</th><th>Satış</th><th>Payınız</th></tr></thead>
          <tbody>
            {done.map((b) => {
              const p = PRODUCTS.find((x) => x.id === b.pid);
              const mult = p.unit === "kişi" ? b.pax : 1;
              return (
                <tr key={b.id}>
                  <td className="mono" style={{ fontSize: 12 }}>{b.ref}</td>
                  <td>{p.title}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{fmtDate(b.date)}</td>
                  <td>{eur(b.price * mult)}</td>
                  <td style={{ color: "var(--brass)" }}>€{Math.round((b.price - b.net) * mult * hotel.split)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {done.length === 0 && <div className="pad"><Empty>Henüz kapanan işlem yok.</Empty></div>}
      </div>
    </>
  );
}
