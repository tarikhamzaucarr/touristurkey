/* Konsiyerjin kendi sayfasını yönettiği veriler: fiyat/foto düzenlemeleri,
   otel içi hizmet ilanları ve partner başvuruları. */
import { MODE } from "./config.js";
import { upsert } from "./supabase.js";
import { mutate } from "./store.js";

export function setOverride(conciergeId, pid, patch) {
  return mutate((s) => {
    const k = `${conciergeId}|${pid}`;
    s.overrides[k] = { ...(s.overrides[k] || {}), ...patch };
    if (MODE === "supabase") {
      upsert("overrides", [{ concierge_id: conciergeId, product_id: pid, ...s.overrides[k] }]);
    }
    return s;
  });
}

export const getOverride = (state, conciergeId, pid) =>
  state.overrides[`${conciergeId}|${pid}`] || {};

/* Ürünün o otelde nasıl görüneceğini hesaplar. */
export function viewProduct(state, product, hotel) {
  if (!hotel) return { ...product, price: product.list, photo: product.photo, hidden: false };
  const ov = getOverride(state, hotel.conciergeId, product.id);
  return {
    ...product,
    price: ov.price != null && ov.price !== "" ? Number(ov.price) : product.list,
    photo: ov.photo || product.photo,
    hidden: !!ov.hidden,
  };
}

export const addAd = (ad) =>
  mutate((s) => { s.ads = [{ ...ad, id: `a${Date.now()}` }, ...s.ads]; return s; });

export const removeAd = (id) =>
  mutate((s) => { s.ads = s.ads.filter((a) => a.id !== id); return s; });

export const adsOfHotel = (state, slug) =>
  state.ads.filter((a) => a.hotel === slug && a.active !== false);

export function addPartner(p) {
  return mutate((s) => {
    s.partners = [{ ...p, id: `pt${Date.now()}`, at: Date.now() }, ...s.partners];
    if (MODE === "supabase") upsert("partners", [p]);
    return s;
  });
}
