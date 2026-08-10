import React from "react";
import { Link } from "../../router/index.jsx";
import { Wordmark } from "./Wordmark.jsx";
import { CurrencyPicker } from "../booking/Controls.jsx";

/* Misafir tarafı üst barı. Otel bağlamı varsa marka o otele döner. */
export function GuestBar({ hotel }) {
  return (
    <div className="topbar">
      <div className="wrap between" style={{ height: 58 }}>
        <Link to={hotel ? `/${hotel.slug}` : "/"} aria-label="Ana sayfa">
          <Wordmark size={16} />
        </Link>
        <div className="row" style={{ gap: 12, fontSize: 14 }}>
          <CurrencyPicker />
          <Link to="/rehber" className="muted hide-sm">İstanbul Rehberi</Link>
          {hotel ? (
            <span className="row" style={{ gap: 7 }}>
              <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: 7,
                background: hotel.accent, color: "#fff", display: "grid", placeItems: "center",
                fontFamily: "var(--display)", fontWeight: 800, fontSize: 11 }}>{hotel.logo}</span>
              <span style={{ fontSize: 13.5 }}>{hotel.name}</span>
            </span>
          ) : (
            <Link to="/partner" className="btn sm">Otelim için</Link>
          )}
        </div>
      </div>
    </div>
  );
}
