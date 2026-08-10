import React from "react";
import { Link } from "../../router/index.jsx";

/* İsim iki kelimenin üst üste binmesinden geliyor: touris(t)urkey.
   Ortak "t" renkle işaretlenerek okunurluk sağlanıyor. */
export function Wordmark({ size = 16 }) {
  return (
    <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: size,
      letterSpacing: "-.03em", whiteSpace: "nowrap" }}>
      touris<span style={{ color: "var(--iznik)" }}>turkey</span>
    </span>
  );
}

export const HomeLink = ({ to = "/", size = 16 }) => (
  <Link to={to} aria-label="TouristTurkey ana sayfa"><Wordmark size={size} /></Link>
);
