import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("✅ Service Worker registrado con éxito:", reg.scope);
        if (reg.waiting) {
          reg.waiting.postMessage({ type: "SKIP_WAITING" });
        }
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          console.log("🔁 Nueva versión del Service Worker activa. Recargando...");
          window.location.reload();
        });
      })
      .catch((err) => console.error("❌ Error al registrar el Service Worker:", err));
  });
}

