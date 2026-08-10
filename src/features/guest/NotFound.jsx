import React from "react";
import { Link } from "../../router/index.jsx";
import { GuestBar } from "../../components/layout/index.js";

export function NotFound() {
  return (
    <>
      <GuestBar />
      <div className="wrap-s" style={{ paddingTop: 80, textAlign: "center" }}>
        <h1 style={{ fontSize: 28 }}>Sayfa bulunamadı</h1>
        <p className="muted" style={{ marginTop: 10 }}>Aradığınız sayfa taşınmış olabilir.</p>
        <Link to="/" className="btn" style={{ marginTop: 20 }}>Ana sayfa</Link>
      </div>
    </>
  );
}
