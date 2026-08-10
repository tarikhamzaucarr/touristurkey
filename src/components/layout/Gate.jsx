import React, { useState } from "react";
import { verifyPin } from "../../lib/auth.js";
import { Kicker, Field } from "../ui/index.jsx";

/* Panel girişi. Gerçek kimlik doğrulama değil — bkz. lib/auth.js notu. */
export function Gate({ title, note, people, onEnter, table = "concierges" }) {
  const [sel, setSel] = useState(people[0].id);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const person = people.find((p) => p.id === sel);
  return (
    <div className="wrap-s" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="card pad rise">
        <Kicker>TouristTurkey</Kicker>
        <h1 style={{ fontSize: 26, margin: "8px 0 6px" }}>{title}</h1>
        <p className="muted" style={{ fontSize: 14, marginBottom: 18 }}>{note}</p>
        <div className="stack" style={{ gap: 12 }}>
          <div>
            <label className="lbl">Hesap</label>
            <select className="inp" value={sel} onChange={(e) => setSel(e.target.value)}>
              {people.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.desk || p.cat}</option>)}
            </select>
          </div>
          <Field label="PIN" value={pin} onChange={setPin} placeholder="••••" type="password" />
          {err && <div style={{ color: "var(--coral)", fontSize: 13.5 }} role="alert">{err}</div>}
          <button className="btn full" disabled={busy} onClick={async () => {
            setBusy(true); setErr("");
            const ok = await verifyPin(table, person.id, pin);
            setBusy(false);
            if (ok) onEnter(person); else setErr("PIN hatalı.");
          }}>{busy ? "Kontrol ediliyor…" : "Giriş yap"}</button>
          <p className="muted" style={{ fontSize: 12, textAlign: "center", margin: 0 }}>
            PIN'i unuttuysanız yöneticinizle iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  );
}

