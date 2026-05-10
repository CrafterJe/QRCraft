# QRCraft

Generador de códigos QR personalizados con soporte multi-tipo, diseño avanzado y exportación en alta resolución.

![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat&logo=tailwindcss)

---

## Features

- **Tipos de QR** — URL, texto, Wi-Fi, vCard, email, SMS, WhatsApp, redes sociales, Google Maps, iCal, App Store y más *(en desarrollo)*
- **Estilizado avanzado** — 6 estilos de puntos, 3 estilos de esquinas, colores sólidos o degradado lineal/radial
- **Logo central** — drag & drop, control de tamaño, margen y fondo
- **Esquinas redondeadas** — slider global con recorte real en exportación
- **Exportación** — PNG, SVG y PNG 1200 px optimizado para Canva
- **Responsive** — layout de dos paneles en desktop, tabs en móvil

## Stack

| | |
|---|---|
| React 19 | UI |
| Vite 8 | Bundler |
| Tailwind CSS 4 | Estilos (`@theme` tokens) |
| qr-code-styling | Generación y estilizado del QR |
| React Router 7 | Routing |

## Inicio rápido

```bash
npm install
npm run dev
```

```bash
npm run build    # build de producción
npm run preview  # preview del build
```

## Estructura

```
src/
├── modules/        # un módulo por tipo de QR
├── components/     # UI: paneles, secciones, átomos
├── hooks/          # useQRConfig — estado del QR
├── utils/          # exportación y encoders
└── types/          # JSDoc typedefs
docs/               # documentación técnica
```

Para agregar un nuevo tipo de QR ver [`docs/module-system.md`](docs/module-system.md).
