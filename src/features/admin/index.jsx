import React, { useState, useMemo } from "react";
import * as DB from "../../lib/index.js";
import { HOTELS, PRODUCTS, SUPPLIERS, CONCIERGES } from "../../data/index.js";
import { Link } from "../../router/index.jsx";
import { useStore } from "../../hooks/useStore.js";
import { money as eur } from "../../hooks/useCurrency.js";
import { fmtDate, hoursAgo } from "../../lib/date.js";
import { Pill, Empty, KPI, STATUS } from "../../components/ui/index.jsx";
import { PanelShell } from "../../components/layout/index.js";

const SOURCES = ["keycard", "wifi", "room", "lobby", "wa", "direct"];
const SRC_TR = { keycard: "Anahtar kartı", wifi: "Wi-Fi ekranı", room: "Oda kartı", lobby: "Lobi standı", wa: "WhatsApp", direct: "Doğrudan" };

import { AdminLogin } from "./Login.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { HotelsTab } from "./Hotels.jsx";
import { Operations } from "./Operations.jsx";
import { Partners } from "./Partners.jsx";
import { DataTools } from "./DataTools.jsx";

export default function Admin() {
  const state = useStore();
  const [tab, setTab] = useState("dash");
  const [pin, setPin] = useState("");
  const [ok, setOk] = useState(false);

  if (!ok) return <AdminLogin onEnter={setOk} />;

  const b = state.bookings;
  const done = b.filter((x) => x.status === "done");
  const mult = (x) => (PRODUCTS.find((p) => p.id === x.pid)?.unit === "kişi" ? x.pax : 1);
  const gmv = done.reduce((a, x) => a + x.price * mult(x), 0);
  const gross = done.reduce((a, x) => a + (x.price - x.net) * mult(x), 0);
  const concShare = done.reduce((a, x) => {
    const h = HOTELS.find((y) => y.slug === x.hotel);
    return a + (x.price - x.net) * mult(x) * (h?.split ?? 0.5);
  }, 0);
  const closed = b.filter((x) => ["done", "cancelled"].includes(x.status)).length;
  const confirmRate = b.length ? Math.round((closed / b.length) * 100) : 0;
  const stale = b.filter((x) => ["assigned", "confirmed"].includes(x.status) && hoursAgo(x.createdAt) > 24);

  const TABS = [["dash", "Genel"], ["hotels", "Oteller"], ["ops", "İşlemler"], ["partners", `Başvurular (${state.partners.length})`], ["data", "Veri"]];

  return (
    <PanelShell title="Yönetim paneli" sub={`Veri modu: ${DB.MODE === "supabase" ? "Supabase (canlı)" : "Yerel kalıcı depolama"}`}
      who="Yönetici" onExit={() => setOk(false)}>
      <div className="tabs" style={{ marginBottom: 18 }}>
        {TABS.map(([k, l]) => (
          <button key={k} className={`tab${tab === k ? " on" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "dash" && <Dashboard {...{ b, done, mult, gmv, gross, concShare, confirmRate, stale }} />}
      {tab === "hotels" && <HotelsTab b={b} mult={mult} />}
      {tab === "ops" && <Operations b={b} mult={mult} />}
      {tab === "partners" && <Partners state={state} />}
      {tab === "data" && <DataTools />}
    </PanelShell>
  );
}
