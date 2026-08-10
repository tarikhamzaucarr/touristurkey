import { useEffect, useState } from "react";

/* Küçük istemci yönlendirici.
   Next.js'e geçişte yalnızca bu dosya ve Link kullanımları değişecek. */

const listeners = new Set();

/* QR kaynağı (?s=) ve oda (?r=) sayfa geçişlerinde korunur.
   Aksi halde ilk tıklamada attribution kayboluyordu. */
const KEEP = ["s", "r"];

export function navigate(to) {
  const cur = new URLSearchParams(window.location.search);
  const [path, qs] = to.split("?");
  const next = new URLSearchParams(qs || "");
  KEEP.forEach((k) => { if (cur.get(k) && !next.get(k)) next.set(k, cur.get(k)); });
  const q = next.toString();
  window.history.pushState({}, "", q ? `${path}?${q}` : path);
  listeners.forEach((f) => f());
  window.scrollTo({ top: 0 });
  const main = document.getElementById("main");
  if (main) { main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true }); }
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const f = () => setPath(window.location.pathname);
    listeners.add(f);
    window.addEventListener("popstate", f);
    return () => { listeners.delete(f); window.removeEventListener("popstate", f); };
  }, []);
  return path;
}

export function Link({ to, children, className, style, ...rest }) {
  return (
    <a href={to} className={className} style={style} {...rest}
      onClick={(e) => { e.preventDefault(); navigate(to); }}>
      {children}
    </a>
  );
}

export const srcParam = () =>
  new URLSearchParams(window.location.search).get("s") || "direct";
