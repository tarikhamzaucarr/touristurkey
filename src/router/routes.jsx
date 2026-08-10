import React from "react";
import { usePath } from "./index.jsx";
import { Home, HotelPage, ProductPage, NotFound } from "../features/guest/index.js";
import { GuideIndex, GuideArticle } from "../features/guide/index.js";
import Partner from "../features/partner/index.jsx";
import Concierge from "../features/concierge/index.jsx";
import Supplier from "../features/supplier/index.jsx";
import Admin from "../features/admin/index.jsx";
import Track from "../features/track/index.jsx";

/* Ayrılmış yollar otel slug'ı olarak yorumlanmaz. */
const RESERVED = ["rehber", "tur", "partner", "panel", "tedarikci", "yonetim", "t"];

export function AppRouter() {
  const [a, b, c] = usePath().split("/").filter(Boolean);

  if (!a) return <Home />;
  if (a === "rehber") return b ? <GuideArticle slug={b} /> : <GuideIndex />;
  if (a === "tur" && b) return <ProductPage slug={b} />;
  if (a === "partner") return <Partner />;
  if (a === "panel") return <Concierge />;
  if (a === "tedarikci") return <Supplier />;
  if (a === "yonetim") return <Admin />;
  if (a === "t") return <Track ref={b} />;

  if (!RESERVED.includes(a)) {
    if (b === "tur" && c) return <ProductPage slug={c} hotelSlug={a} />;
    if (!b) return <HotelPage slug={a} />;
  }
  return <NotFound />;
}
