# Alootid

Alootid es una extensión de Chrome para **copiar rápidamente items y mapas** desde [ratemyserver.net](https://ratemyserver.net). Está enfocada en agilizar el flujo de consulta y reutilización de información dentro del juego o para compartir con otros jugadores.

## ✨ Características
- Copia rápida de items y mapas desde ratemyserver.net.
- Flujo simple: seleccionar y copiar en pocos clics.
- Construida con TypeScript y Webpack.

## ✅ Requisitos
- Node.js 16+ (recomendado)
- npm

## 📦 Instalación
```bash
npm i
```

## 🛠️ Build
Genera la carpeta de salida (dist/bundle) con Webpack:
```bash
npm run build
```

## 🧩 Instalación manual en Chrome
1. Ejecuta `npm run build`.
2. Abre `chrome://extensions/`.
3. Activa **Developer mode**.
4. Haz clic en **Load unpacked**.
5. Selecciona la carpeta generada por el build.

## 🚀 Uso
1. Visita ratemyserver.net.
2. Abre la extensión.
3. Copia el item o mapa que necesitas.

## 🧱 Estructura del proyecto
- `src/` – Código fuente en TypeScript.
- `public/` – Archivos estáticos para la extensión.
- `webpack.config.js` – Configuración de build.

## 📄 Licencia
ISC
