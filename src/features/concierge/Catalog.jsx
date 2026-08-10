import React, { useState } from "react";
import { PRODUCTS, CATS } from "../../data/index.js";
import * as DB from "../../lib/index.js";
import { Photo, Pill } from "../../components/ui/index.jsx";

/* Konsiyerjin kendi sayfasındaki fiyat, fotoğraf ve görünürlük ayarları.
   Değişiklikler yalnızca o otelin sayfasında geçerlidir. */
export function Catalog({ me, hotel, state }) {
  return (
    <>
      <div className="card pad" style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 16 }}>Kendi sayfanızı yönetin</h3>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 5 }}>
          Buradaki değişiklikler yalnızca <b>touristurkey.com/{hotel.slug}</b> sayfasında geçerlidir.
          Diğer masaların fiyatını görmez, onlar da sizinkini görmez.
        </p>
      </div>
      <div className="stack" style={{ gap: 11 }}>
        {PRODUCTS.map((p) => {
          const ov = DB.getOverride(state, me.id, p.id);
          const price = ov.price ?? p.list;
          const margin = price - p.net;
          return (
            <div key={p.id} className="card" style={{ opacity: ov.hidden ? .55 : 1 }}>
              <div className="pad">
                <div className="between" style={{ gap: 12, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, minWidth: 0 }}>
                    <div style={{ width: 72, flexShrink: 0 }}>
                      <Photo seed={ov.photo || p.photo} h={54} rounded />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ fontSize: 15.5 }}>{p.title}</h3>
                      <div className="mono muted" style={{ fontSize: 11.5, marginTop: 4 }}>
                        net alış €{p.net} · liste €{p.list} · {p.sup}
                      </div>
                    </div>
                  </div>
                  <button className="btn ghost sm"
                    onClick={() => DB.setOverride(me.id, p.id, { hidden: !ov.hidden })}>
                    {ov.hidden ? "Göster" : "Gizle"}
                  </button>
                </div>

                <div className="grid2" style={{ marginTop: 12 }}>
                  <div>
                    <label className="lbl">Sizin satış fiyatınız (€)</label>
                    <input className="inp" type="number" value={ov.price ?? ""} placeholder={String(p.list)}
                      onChange={(e) => DB.setOverride(me.id, p.id, { price: e.target.value === "" ? null : Number(e.target.value) })} />
                  </div>
                  <div>
                    <label className="lbl">Fotoğraf anahtarı</label>
                    <input className="inp" value={ov.photo ?? ""} placeholder={p.photo}
                      onChange={(e) => DB.setOverride(me.id, p.id, { photo: e.target.value })} />
                  </div>
                </div>

                <div className="row" style={{ gap: 8, marginTop: 11, flexWrap: "wrap" }}>
                  <Pill kind={margin > 0 ? "ok" : "warn"}>marj €{margin}</Pill>
                  {price < p.net && <Pill kind="warn">zararına satıyorsunuz</Pill>}
                  {(ov.price != null || ov.photo) &&
                    <button className="btn ghost sm"
                      onClick={() => DB.setOverride(me.id, p.id, { price: null, photo: "" })}>Varsayılana dön</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
