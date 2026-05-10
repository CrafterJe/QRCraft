# QRCraft — Documentación

> Generador de códigos QR personalizados con soporte multi-tipo, diseño avanzado y exportación en alta resolución.

---

## Tabla de contenidos

| Documento | Descripción |
|---|---|
| [index.md](./index.md) | Este archivo — visión general, setup y features |
| [architecture.md](./architecture.md) | Estructura de carpetas, flujo de datos, decisiones de diseño |
| [module-system.md](./module-system.md) | Sistema de módulos: registro, contrato y cómo agregar uno nuevo |
| [components.md](./components.md) | Referencia de todos los componentes React |
| [hooks-utils.md](./hooks-utils.md) | Hook `useQRConfig`, utilidades de exportación |
| [qr-encoders.md](./qr-encoders.md) | Referencia de formatos QR y funciones encoder |

---

## ¿Qué es QRCraft?

QRCraft es una aplicación web construida con **React + Vite** que permite generar códigos QR altamente personalizados. Soporta múltiples tipos de contenido (URLs, contactos, Wi-Fi, redes sociales, etc.), estilizado avanzado de puntos y esquinas, degradados, inserción de logo y exportación en PNG y SVG.

La interfaz sigue un diseño de dos paneles: control a la izquierda, vista previa en tiempo real a la derecha.

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19.x | UI |
| Vite | 8.x | Bundler / dev server |
| Tailwind CSS | 4.x | Estilos utilitarios |
| qr-code-styling | 1.6.x | Generación y estilizado del QR |
| React Router DOM | 7.x | Routing (preparado para escalar) |

---

## Features actuales

### Tipos de QR
- ✅ URL / enlace web
- 🔒 Texto plano *(próximamente)*
- 🔒 Wi-Fi *(próximamente)*
- 🔒 vCard, Email, SMS, Llamada, WhatsApp *(próximamente)*
- 🔒 Redes sociales: Instagram, Facebook, TikTok, X, YouTube, LinkedIn *(próximamente)*
- 🔒 Google Maps, iCal, App Store / Play Store, PDF/Imagen *(próximamente)*

### Personalización visual
- 6 estilos de puntos: Cuadrado, Círculos, Redondeado, Oval, Clásico, Clás. Redondo
- 3 estilos de marco exterior de esquinas + 2 estilos de punto interior
- Color sólido o degradado (lineal / radial) en puntos
- Color independiente para esquinas (ojos)
- Esquinas redondeadas globales del QR (slider 0–15 %)
- Logo central con control de tamaño, margen y fondo blanco

### Exportación
- PNG a cualquier resolución configurada
- SVG vectorial
- PNG 1200 px optimizado para Canva
- Todos los formatos respetan el radio de esquinas configurado

---

## Instalación y desarrollo

```bash
# Clonar e instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## Estructura rápida del proyecto

```
QRCraft/
├── docs/                 ← esta documentación
├── src/
│   ├── modules/          ← módulos por tipo de QR
│   ├── components/       ← componentes React
│   ├── hooks/            ← estado global del QR
│   ├── utils/            ← exportación y encoders
│   └── types/            ← JSDoc typedefs
├── public/
└── qr-generator.html     ← prototipo HTML original de referencia
```

Ver [architecture.md](./architecture.md) para el desglose completo.
