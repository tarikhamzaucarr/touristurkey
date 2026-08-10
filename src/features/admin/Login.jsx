import React, { useState } from "react";

/* Yönetim girişi. PIN geçici; Supabase Auth'a taşınacak. */
export function AdminLogin({ onEnter }) {
  const [pin, setPin] = useState("");
  return (
    <div data-t="dark" style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="wrap-s" style={{ paddingTop: 70 }}>
        <div className="card pad">
          <div className="kicker">TouristTurkey</div>
          <h1 style={{ fontSize: 25, marginTop: 8 }}>Yönetim paneli</h1>
          <p className="muted" style={{ fontSize: 14, marginTop: 6, marginBottom: 16 }}>
            Ağın tamamı: oteller, konsiyerjler, tedarikçiler, gelir.
          </p>
          <label className="lbl" htmlFor="apin">Yönetici PIN</label>
          <input id="apin" className="inp" type="password" value={pin}
            onChange={(e) => setPin(e.target.value)} placeholder="••••" />
          <button className="btn full" style={{ marginTop: 12 }}
            onClick={() => onEnter(pin === "0000")}>Giriş</button>
        </div>
      </div>
    </div>
  );
}
