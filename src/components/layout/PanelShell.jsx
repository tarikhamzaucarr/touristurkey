import React from "react";
import { Link } from "../../router/index.jsx";
import { Wordmark } from "./Wordmark.jsx";

/* Koyu temalı panel çerçevesi. Misafir tarafı açık tema kullanır. */
export function PanelShell({ title, sub, who, onExit, children, right }) {
  return (
    <div data-t="dark" style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="topbar">
        <div className="wrap between" style={{ height: 56 }}>
          <Link to="/"><Wordmark size={15} /></Link>
          <div className="row" style={{ gap: 10 }}>
            {right}
            {who && <span className="pill">{who}</span>}
            {onExit && <button className="btn ghost sm" onClick={onExit}>Çıkış</button>}
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingTop: 22, paddingBottom: 70 }}>
        <h1 style={{ fontSize: 25 }}>{title}</h1>
        {sub && <p className="muted" style={{ fontSize: 14, marginTop: 5 }}>{sub}</p>}
        <div style={{ marginTop: 20 }}>{children}</div>
      </div>
    </div>
  );
}
