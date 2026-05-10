# Arquitectura

## Estructura de carpetas

```
src/
├── App.jsx                          ← Entry point React, renderiza QRGenerator
├── main.jsx                         ← Bootstrap con BrowserRouter + StrictMode
├── index.css                        ← @import tailwindcss + custom scrollbar CSS
│
├── pages/
│   └── generators/
│       └── QRGenerator.jsx          ← Página principal: orquesta layout y estado
│
├── modules/                         ← Sistema de módulos (un folder por tipo de QR)
│   ├── index.jsx                    ← Registro central: MODULES[], CATEGORIES[]
│   └── basics/
│       └── url/
│           └── index.jsx            ← Módulo URL (único activo)
│
├── components/
│   ├── ControlPanel.jsx             ← Panel izquierdo: TypeSelector + Form activo + secciones
│   ├── QRPreview.jsx                ← Panel derecho: canvas del QR + info
│   ├── TypeSelector.jsx             ← Selector de tipo de QR por categorías
│   │
│   ├── sections/                    ← Secciones del panel de control
│   │   ├── QRSettingsSection.jsx    ← Tamaño, margen, corrección de error
│   │   ├── ShapeSection.jsx         ← Slider de esquinas redondeadas
│   │   ├── DotsSection.jsx          ← Grid de estilos de puntos
│   │   ├── CornersSection.jsx       ← Estilos de ojos/esquinas
│   │   ├── ColorsSection.jsx        ← Colores sólidos o degradado
│   │   ├── LogoSection.jsx          ← Upload y configuración del logo
│   │   └── ExportSection.jsx        ← Nombre de archivo + botones de descarga
│   │
│   └── ui/                          ← Átomos reutilizables
│       ├── Toggle.jsx               ← Switch on/off
│       ├── ColorPicker.jsx          ← Swatch de color + input hex sincronizados
│       ├── SectionTitle.jsx         ← Encabezado de sección (uppercase + borde)
│       └── ComingSoon.jsx           ← Placeholder para módulos bloqueados
│
├── hooks/
│   └── useQRConfig.js               ← Todo el estado del QR + instancia qr-code-styling
│
├── utils/
│   ├── qrExport.js                  ← Funciones de descarga (PNG, SVG, Canva)
│   └── qrEncoders.js               ← Funciones puras de encoding por tipo de QR
│
└── types/
    └── module.js                    ← JSDoc: QRModule, ModuleFormProps, QRCategory
```

---

## Árbol de componentes

```
App
└── QRGenerator                      (estado: activeModuleId)
    ├── <header>
    ├── ControlPanel                 (recibe config, update, módulo activo)
    │   ├── TypeSelector             (recibe activeModuleId, onSelect)
    │   ├── <ActiveForm />           (form del módulo activo, o <ComingSoon />)
    │   ├── QRSettingsSection
    │   ├── ShapeSection
    │   ├── DotsSection
    │   ├── CornersSection
    │   ├── ColorsSection
    │   ├── LogoSection
    │   └── ExportSection
    └── QRPreview                    (recibe qrRef, config, getRadiusPx)
```

---

## Flujo de datos

```
Usuario escribe en un form
        │
        ▼
update('data', encodedString)       ← función del hook useQRConfig
        │
        ▼
setConfig({ ...prev, data: value }) ← useState interno
        │
        ▼
buildOptions() se recalcula         ← useCallback([config])
        │
        ▼
useEffect([buildOptions]) dispara
        │
        ├── qrInstance.current es null? → new QRCodeStyling(opts).append(qrRef)
        └── qrInstance.current existe?  → qrInstance.current.update(opts)
                                                   │
                                                   ▼
                                        Canvas/SVG del QR se actualiza en el DOM
```

El QR se re-renderiza en tiempo real con cada cambio de estado porque `buildOptions` es un `useCallback` que cambia cuando cambia `config`, lo que dispara el `useEffect`.

---

## Decisiones de diseño

### ¿Por qué `qr-code-styling` y no `react-qr-code`?

`react-qr-code` genera únicamente un SVG básico sin opciones de estilizado. `qr-code-styling` es la única librería del ecosistema que ofrece:

- Estilos de puntos (cuadrado, círculo, redondeado, etc.)
- Estilos de esquinas (cuadrado, extra-redondeado, punto)
- Degradados en puntos
- Inserción de logo con máscara

Al ser un wrapper DOM (no un componente React), se gestiona con `useRef` + `useEffect` en lugar de renderizado declarativo.

### ¿Por qué el registro de módulos en lugar de rutas?

Todos los tipos de QR comparten exactamente la misma interfaz visual (colores, puntos, logo, exportación). Solo cambia el **formulario de datos**. Un sistema de registro (`MODULES[]`) permite:

- Swappear el formulario sin tocar el layout
- Definir módulos bloqueados sin código muerto
- Agregar nuevos tipos sin modificar componentes existentes
- Mantener los encoders completamente separados de la UI

### Estado centralizado en un solo hook

`useQRConfig` concentra todo el estado del QR en un único `useState`. Esto evita prop drilling profundo y facilita que el formulario de cualquier módulo solo necesite `value` y `onChange`.

### Separación encoders / UI

Las funciones en `qrEncoders.js` son **funciones puras** que no saben nada de React. Pueden ser testeadas en aislamiento y reutilizadas fuera de componentes.

---

## Layout CSS

La página usa CSS Grid con dos columnas fijas:

```css
grid-template-columns: 420px 1fr;
grid-template-rows: auto 1fr;
height: 100vh;
overflow: hidden;
```

- El header ocupa `col-span-2` (fila 1)
- ControlPanel ocupa la celda `[2,1]` con `overflow-y: auto` (scrolleable)
- QRPreview ocupa la celda `[2,2]` y centra el QR

---

## Paleta de colores (tokens CSS implícitos)

| Variable | Valor | Uso |
|---|---|---|
| `--bg` | `#0d1117` | Fondo de la app y de inputs |
| `--card` | `#161b22` | Panel izquierdo y header |
| `--border` | `#30363d` | Bordes de todos los elementos |
| `--accent` | `#3b82f6` | Azul activo (estados, focus) |
| `--accent2` | `#6366f1` | Índigo (botón SVG) |
| `--text` | `#f0f0f0` | Texto principal |
| `--muted` | `#8b949e` | Labels y texto secundario |
| `--preview-bg` | `#0a0f16` | Fondo del panel de preview |
