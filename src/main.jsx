import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { init } from "./lib/store.js";
import { AppRouter } from "./router/routes.jsx";

/* Uygulama, veri katmanı hazır olduktan sonra bağlanır:
   ilk karede yanlış müsaitlik göstermemek için. */
function Root() {
  return (
    <>
      <a className="skip" href="#main">İçeriğe atla</a>
      <div id="main"><AppRouter /></div>
    </>
  );
}

init().then(() => {
  createRoot(document.getElementById("root")).render(<Root />);
});
