import React from "react";
import { CATS, cancelOf } from "../../data/index.js";
import { viewProduct } from "../../lib/content.js";
import { Link } from "../../router/index.jsx";
import { money } from "../../hooks/useCurrency.js";
import { Photo, Pill } from "../../components/ui/index.jsx";

const eur = money;

export function ProductCard({ p, hotel, state }) {
  const v = viewProduct(state, p, hotel);
  if (v.hidden) return null;
  const to = hotel ? `/${hotel.slug}/tur/${p.slug}` : `/tur/${p.slug}`;
  return (
    <Link to={to} className="card rise lift" style={{ display: "block" }}>
      <Photo seed={v.photo} h={186} alt={p.title}
        tag={p.rank <= 5 ? `EN ÇOK SATAN #${p.rank}` : CATS.find((c) => c.id === p.cat)?.label}
        price={eur(v.price)} />
      <div className="pad">
        <h3 style={{ fontSize: 17 }}>{p.title}</h3>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 6 }}>{p.short}</p>
        <div className="row" style={{ gap: 6, marginTop: 11, flexWrap: "wrap" }}>
          <Pill>{p.dur}</Pill>
          {p.peak && <Pill kind="brass">Yoğun talep</Pill>}
        </div>
        <div className="state" style={{ color: "var(--green)", marginTop: 9 }}>
          ✓ {cancelOf(p.id)}
        </div>
      </div>
    </Link>
  );
}
