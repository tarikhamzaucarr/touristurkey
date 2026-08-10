import React from "react";
import { PRODUCTS, HOTELS } from "../../data/index.js";
import * as DB from "../../lib/index.js";
import { fmtDate } from "../../lib/date.js";
import { Pill, Empty, KPI, STATUS, ConfirmButton } from "../../components/ui/index.jsx";

/* Tedarikçi onayı kritik: konsiyerj işlemi açık bıraksa bile
   buradan "Yapıldı" denince kayıt kapanır. Sistem tek bir tarafın
   hafızasına bağlı kalmaz. */
export function Jobs({ jobs }) {
  const done = jobs.filter((b) => b.status === "done");
  const rev = done.reduce((a, b) => {
    const p = PRODUCTS.find((x) => x.id === b.pid);
    return a + b.net * (p.unit === "kişi" ? b.pax : 1);
  }, 0);

  return (
    <>
      <div className="kpis" style={{ marginBottom: 16 }}>
        <KPI label="Toplam iş" value={jobs.length} />
        <KPI label="Tamamlanan" value={done.length} color="var(--green)" />
        <KPI label="Onay bekleyen" value={jobs.filter((b) => !b.supOK && b.status !== "done").length} color="var(--brass)" />
        <KPI label="Hakedişiniz" value={`€${Math.round(rev)}`} />
      </div>

      {jobs.length === 0 && <Empty>Henüz iş gelmedi.</Empty>}
      <div className="stack" style={{ gap: 11 }}>
        {jobs.map((b) => {
          const p = PRODUCTS.find((x) => x.id === b.pid);
          const h = HOTELS.find((x) => x.slug === b.hotel);
          const mult = p.unit === "kişi" ? b.pax : 1;
          return (
            <div key={b.id} className="card"
              style={{ borderColor: b.supOK ? "color-mix(in srgb,var(--green) 45%,transparent)" : "var(--line)" }}>
              <div className="pad">
                <div className="between" style={{ alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontSize: 15.5 }}>{p.title}</h3>
                    <div className="mono muted" style={{ fontSize: 11.5, marginTop: 5 }}>
                      {b.ref} · {h?.name} · {b.pax} kişi · {fmtDate(b.date)}
                    </div>
                  </div>
                  <Pill kind={STATUS[b.status].kind}>{STATUS[b.status].label}</Pill>
                </div>

                <div className="between" style={{ marginTop: 12, paddingTop: 12,
                  borderTop: "1px solid var(--line)", flexWrap: "wrap", gap: 8 }}>
                  <div className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>
                    size ödenecek <b style={{ color: "var(--ink)" }}>€{b.net * mult}</b>
                  </div>
                  {b.supOK ? (
                    <Pill kind="ok">onayladınız</Pill>
                  ) : (
                    <div className="row" style={{ gap: 6 }}>
                      <button className="btn sm ok"
                        onClick={() => DB.updateBooking(b.id, { supOK: true, status: "done" }, "Tedarikçi onayladı — iş tamamlandı")}>
                        Yapıldı
                      </button>
                      <ConfirmButton label="Gelmedi" confirmLabel="Evet, gelmedi"
                        onConfirm={() => DB.updateBooking(b.id, { supOK: true, status: "cancelled" }, "Tedarikçi: misafir gelmedi")} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card pad" style={{ marginTop: 16, borderStyle: "dashed" }}>
        <p className="muted" style={{ fontSize: 13.5 }}>
          <b style={{ color: "var(--ink)" }}>Neden bu ekran önemli:</b> konsiyerj işlemi açık
          bıraksa bile siz "Yapıldı" dediğinizde kayıt otomatik kapanır. Sistem tek bir
          tarafın hafızasına bağlı kalmaz.
        </p>
      </div>
    </>
  );
}
