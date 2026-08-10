import React, { useEffect, useState } from "react";
import { photoUrl } from "../../data/index.js";
import { useStore } from "../../hooks/useStore.js";

/* Küçük, durumsuz arayüz parçaları. */

export function Photo({ seed, h = 190, tag, price, rounded, alt = "", children }) {
  const [err, setErr] = useState(false);
  return (
    <div className="ph" style={{ height: h, borderRadius: rounded ? 12 : 0 }}>
      {!err ? (
        <img src={photoUrl(seed)} alt={alt} loading="lazy" onError={() => setErr(true)} />
      ) : (
        <div style={{ width: "100%", height: "100%",
          background: "linear-gradient(140deg,#0E6B6E22,#0B1A2611)" }} />
      )}
      <div className="sh" />
      {tag && <span className="tag">{tag}</span>}
      {price && <span className="price">{price}</span>}
      {children}
    </div>
  );
}

export const Pill = ({ children, kind = "" }) => <span className={`pill ${kind}`}>{children}</span>;
export const Kicker = ({ children }) => <div className="kicker">{children}</div>;

export const KPI = ({ label, value, sub, color }) => (
  <div className="card pad">
    <div className="lbl" style={{ marginBottom: 4 }}>{label}</div>
    <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 800,
      color: color || "var(--ink)" }}>{value}</div>
    {sub && <div className="mono" style={{ fontSize: 12, color: "var(--mute)", marginTop: 3 }}>{sub}</div>}
  </div>
);

export const Empty = ({ children }) => (
  <div style={{ border: "1px dashed var(--line)", borderRadius: 12, padding: 28,
    textAlign: "center", color: "var(--mute)", fontSize: 14 }}>{children}</div>
);

export function Field({ label, value, onChange, placeholder, area, type = "text" }) {
  const id = React.useId();
  return (
    <div>
      <label className="lbl" htmlFor={id}>{label}</label>
      {area
        ? <textarea id={id} className="inp" value={value} placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)} />
        : <input id={id} className="inp" type={type} value={value} placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)} />}
    </div>
  );
}

export const Skeleton = ({ h = 16, w = "100%", style }) => (
  <div className="skel" style={{ height: h, width: w, ...style }} aria-hidden="true" />
);

export function CardSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <Skeleton h={186} style={{ borderRadius: 0 }} />
      <div className="pad">
        <Skeleton h={18} w="70%" />
        <Skeleton h={13} w="95%" style={{ marginTop: 10 }} />
        <Skeleton h={13} w="55%" style={{ marginTop: 6 }} />
      </div>
    </div>
  );
}

/* Yıkıcı işlemler tek dokunuşla çalışmaz — telefonda yanlışlıkla basılıyordu. */
export function ConfirmButton({ label, confirmLabel, onConfirm, className = "btn ghost sm" }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return undefined;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);
  return armed
    ? <button className="btn warn sm" onClick={() => { setArmed(false); onConfirm(); }}>
        {confirmLabel || "Emin misiniz?"}
      </button>
    : <button className={className} onClick={() => setArmed(true)}>{label}</button>;
}

/* Bağlantı bozulduğunda arayüz susmaz; rezervasyon da kilitlenir. */
export function DegradedBanner() {
  const st = useStore();
  if (!st.degraded) return null;
  return (
    <div className="banner" role="alert" style={{ margin: "14px 0" }}>
      <span aria-hidden="true">⚠</span>
      <div>
        <b>Müsaitlik şu an doğrulanamıyor.</b> Bağlantı sorunu nedeniyle takvim
        güncel olmayabilir; bu yüzden rezervasyon geçici olarak kapalı.
        Acil talepleriniz için otelinizdeki masaya doğrudan yazın.
      </div>
    </div>
  );
}

export const STATUS = {
  new: { label: "Yeni talep", kind: "brass" },
  assigned: { label: "Üstlenildi", kind: "iznik" },
  confirmed: { label: "Onaylandı", kind: "iznik" },
  done: { label: "Gerçekleşti", kind: "ok" },
  cancelled: { label: "İptal", kind: "warn" },
};
