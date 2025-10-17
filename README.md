## Descripción
Esta PWA fue desarrollada con Vite + React + TypeScript + TailwindCSS, implementando capacidades offline-first, almacenamiento local con IndexedDB, estrategias de cache avanzado y sincronización en segundo plano (Background Sync).
El objetivo es demostrar cómo una aplicación web puede funcionar correctamente sin conexión, almacenar datos localmente y sincronizarlos al volver la red.

## Tecnologías utilizadas
React + Vite
TailwindCSS
IndexedDB (mediante la librería idb)
Service Worker (con estrategias de cache y sincronización)
Background Sync API
Push Notifications (estructura lista para integración)

## Funcionalidades principales
Funcionalidad	Descripción
Almacenamiento offline	Las entradas se guardan en IndexedDB incluso sin conexión.
Sincronización	Cuando la conexión vuelve, los datos pendientes se marcan como sincronizados.
Detección de conexión	La interfaz muestra en tiempo real si el usuario está conectado o no.
Estrategias de cache	Implementadas cache-first para el App Shell y network-first para navegación.
Notificaciones push	Preparado para integrarse con FCM o claves VAPID.

## Estructura del proyecto
src/
 ├─ components/
 │   ├─ EntryForm.tsx      # Formulario con detección de conexión
 │   ├─ EntryList.tsx      # Lista dinámica de entradas
 ├─ lib/
 │   └─ db.ts              # Gestión de IndexedDB y BroadcastChannel
 ├─ sw.js                  # Service Worker con cache y sincronización
 ├─ main.tsx               # Registro del SW y render principal
 └─ index.css / tailwind.config.js

## Cómo ejecutar el proyecto
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build
npm run preview
Luego abre http://localhost:5173/ en el navegador.
Puedes probar el modo offline desde DevTools > Network > Offline.

## Pruebas realizadas
Guardado de notas sin conexión.
Recuperación automática desde IndexedDB.
Sincronización al volver la red.
PWA instalable y funcional offline.
Detección de conexión visible en la interfaz.


## Créditos
Proyecto desarrollado por Johan Emmanuel Balderas Alfonso
para la actividad Funcionalidad offline, sincronización en segundo plano y notificaciones push en AWP.