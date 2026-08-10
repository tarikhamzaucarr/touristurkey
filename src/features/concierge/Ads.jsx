import React, { useState } from "react";
import { PRODUCTS, CATS } from "../../data/index.js";
import * as DB from "../../lib/index.js";
import { Photo, Field, Empty } from "../../components/ui/index.jsx";

/* Otel içi hizmet ilanları — teras bar, geç çıkış, spa. */
export function Ads({ hotel, state }) {
  const [f, setF] = useState({ title: "", body: "", photo: "" });
  const list = state.ads.filter((a) => a.hotel === hotel.slug);
  return (
    <>
      <div className="card pad" style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 16 }}>Otel içi hizmet ilanı</h3>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 5 }}>
          Teras bar, spa, geç çıkış, oda servisi… Otelin kendi hizmetlerini
          misafir sayfasının üst kısmında yayınlayın.
        </p>
        <div className="stack" style={{ gap: 11, marginTop: 14 }}>
          <Field label="Başlık" value={f.title} onChange={(v) => setF({ ...f, title: v })}
            placeholder="Teras Bar — Gün Batımı Saati" />
          <Field label="Metin" value={f.body} onChange={(v) => setF({ ...f, body: v })} area
            placeholder="18:00-20:00 arası ikinci içecek ikram." />
          <Field label="Fotoğraf anahtarı" value={f.photo} onChange={(v) => setF({ ...f, photo: v })}
            placeholder="rooftopbar" />
          <button className="btn" disabled={!f.title}
            onClick={() => { DB.addAd({ ...f, hotel: hotel.slug, active: true }); setF({ title: "", body: "", photo: "" }); }}>
            İlanı yayınla
          </button>
        </div>
      </div>
      {list.length === 0 && <Empty>Henüz ilan yok.</Empty>}
      <div className="grid2">
        {list.map((a) => (
          <div key={a.id} className="card">
            <Photo seed={a.photo || "hotelservice"} h={100} />
            <div className="pad">
              <div className="between">
                <h3 style={{ fontSize: 15.5 }}>{a.title}</h3>
                <button className="btn ghost sm" onClick={() => DB.removeAd(a.id)}>Kaldır</button>
              </div>
              <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>{a.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
