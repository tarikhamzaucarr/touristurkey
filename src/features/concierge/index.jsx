import React, { useState } from "react";
import { CONCIERGES, hotelOfConcierge } from "../../data/index.js";
import { bookingsOfHotel } from "../../lib/bookings.js";
import { Link } from "../../router/index.jsx";
import { useStore } from "../../hooks/useStore.js";
import { Gate, PanelShell } from "../../components/layout/index.js";
import { DegradedBanner } from "../../components/ui/index.jsx";
import { Inbox } from "./Inbox.jsx";
import { Availability } from "./Availability.jsx";
import { Catalog } from "./Catalog.jsx";
import { Ads } from "./Ads.jsx";
import { Money } from "./Earnings.jsx";

const HOTELS_BY_CONCIERGE = hotelOfConcierge;

export default function Concierge() {
  const [me, setMe] = useState(null);
  const [tab, setTab] = useState("inbox");
  const state = useStore();

  if (!me) return (
    <div data-t="dark" style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Gate title="Konsiyerj paneli" people={CONCIERGES} onEnter={setMe}
        note="Masanıza gelen talepleri yönetin, kendi fiyatınızı belirleyin." />
    </div>
  );

  const hotel = hotelOfConcierge(me.id);
  const mine = bookingsOfHotel(state, hotel.slug);

  const TABS = [
    ["inbox", `Talepler (${mine.filter((b) => ["new", "assigned", "confirmed"].includes(b.status)).length})`],
    ["cal", "Müsaitlik"],
    ["cat", "Ürünlerim"],
    ["ads", "Otel hizmetleri"],
    ["money", "Hakediş"],
  ];

  return (
    <PanelShell title={me.desk} sub={`${hotel.name} · touristurkey.com/${hotel.slug}`}
      who={me.name} onExit={() => setMe(null)}
      right={<Link to={`/${hotel.slug}`} className="btn ghost sm">Sayfamı gör</Link>}>
      <div className="tabs" style={{ marginBottom: 18 }}>
        {TABS.map(([k, l]) => (
          <button key={k} className={`tab${tab === k ? " on" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      <DegradedBanner />
      {tab === "inbox" && (
        <div className="banner info" style={{ marginBottom: 14 }}>
          <span aria-hidden="true">ⓘ</span>
          <div>
            <b>Nasıl işliyor:</b> talep düşer → <i>Üstlen</i> → tedarikçiyi ayarlayın →
            <i> Misafire onayla</i> → iş bitince <i>Gerçekleşti</i>. Kapatmadığınız işlemler
            24 saat sonra "teyit bekleyen" listesine düşer ve hakedişinize yazılmaz.
          </div>
        </div>
      )}
      {tab === "inbox" && <Inbox list={mine} hotel={hotel} state={state} />}
      {tab === "cal" && <Availability state={state} />}
      {tab === "cat" && <Catalog me={me} hotel={hotel} state={state} />}
      {tab === "ads" && <Ads hotel={hotel} state={state} />}
      {tab === "money" && <Money list={mine} hotel={hotel} />}
    </PanelShell>
  );
}
