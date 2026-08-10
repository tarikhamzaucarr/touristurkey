/* TouristTurkey — görsel kaynağı */

/* Geçici: picsum. Gerçek tedarikçi fotoğrafları geldiğinde burası
   CDN adresine bağlanacak — tek dosya değişecek. */
export const photoUrl = (seed, w = 1000, h = 700) =>
  `https://picsum.photos/seed/tt-${seed}/${w}/${h}`;
