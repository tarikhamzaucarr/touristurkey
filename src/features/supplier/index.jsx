import React, { useState } from "react";
import { SUPPLIERS, productsOfSupplier } from "../../data/index.js";
import { bookingsOfSupplier } from "../../lib/bookings.js";
import { useStore } from "../../hooks/useStore.js";
import { Gate, PanelShell } from "../../components/layout/index.js";
import { DegradedBanner } from "../../components/ui/index.jsx";
import { Jobs } from "./Jobs.jsx";
import { SupplierCalendar } from "./Availability.jsx";

export default function Supplier() {
  const [me, setMe] = useState(null);
  const [tab, setTab] = useState("jobs");
  const state = useStore();

  if (!me) return (
    <div data-t="dark" style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Gate title="Tedarikçi paneli" people={SUPPLIERS} onEnter={setMe} table="suppliers"
        note="İşlerinizi onaylayın, müsait olmadığınız tarihleri kapatın." />
    </div>
  );

  const myProducts = productsOfSupplier(me.id);
  const ids = myProducts.map((p) => p.id);
  const jobs = bookingsOfSupplier(state, ids);
  const pending = jobs.filter((b) => !b.supOK && b.status !== "done");

  return (
    <PanelShell title={me.name} sub={me.cat} who={`${myProducts.length} ürün`} onExit={() => setMe(null)}>
      <div className="tabs" style={{ marginBottom: 18 }}>
        <button className={`tab${tab === "jobs" ? " on" : ""}`} onClick={() => setTab("jobs")}>
          İşler ({pending.length} bekliyor)
        </button>
        <button className={`tab${tab === "cal" ? " on" : ""}`} onClick={() => setTab("cal")}>
          Müsaitlik takvimi
        </button>
      </div>

      <DegradedBanner />
      {tab === "jobs" && <Jobs jobs={jobs} />}
      {tab === "cal" && <SupplierCalendar products={myProducts} state={state} />}
    </PanelShell>
  );
}
