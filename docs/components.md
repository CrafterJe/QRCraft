# Referencia de componentes

---

## Páginas

### `QRGenerator` — `src/pages/generators/QRGenerator.jsx`

Componente raíz de la aplicación. Orquesta el layout de dos paneles y contiene el único estado que no vive en el hook: el módulo activo.

**Estado local**

```js
const [activeModuleId, setActiveModuleId] = useState('url');
```

**Props recibidas:** ninguna.

**Hooks usados:** `useQRConfig`

**Responsabilidades:**
- Renderizar el `<header>` global
- Renderizar `ControlPanel` con el módulo activo y el handler de cambio
- Renderizar `QRPreview` con la ref del QR
- Resetear `config.data` a `''` cuando el usuario cambia de módulo

---

## Panel de control

### `ControlPanel` — `src/components/ControlPanel.jsx`

Contenedor del panel izquierdo. Renderiza las secciones de forma vertical con scroll interno.

**Props**

| Prop | Tipo | Descripción |
|---|---|---|
| `config` | `Object` | Estado completo del QR (del hook) |
| `update` | `(key, value) => void` | Actualizador del estado |
| `qrInstance` | `React.MutableRefObject` | Ref a la instancia de qr-code-styling |
| `buildOptions` | `(size?) => Object` | Construye el objeto de opciones del QR |
| `getRadiusPx` | `(size?) => number` | Calcula el radio en píxeles |
| `activeModuleId` | `string` | ID del módulo actualmente seleccionado |
| `onModuleChange` | `(id: string) => void` | Callback cuando el usuario cambia de módulo |

**Lógica interna:**
- Busca el módulo activo en `MODULES[]`
- Si `activeModule.Form` existe → renderiza `<ActiveForm value onChange />`
- Si no → renderiza `<ComingSoon label />`

---

### `TypeSelector` — `src/components/TypeSelector.jsx`

Selector de tipo de QR organizado en categorías colapsables.

**Props**

| Prop | Tipo | Descripción |
|---|---|---|
| `activeModuleId` | `string` | ID del módulo activo (para resaltar el chip) |
| `onSelect` | `(id: string) => void` | Llamado cuando el usuario selecciona un módulo activo |

**Estado interno:** `Set<string>` con las categorías abiertas. Inicialmente contiene la categoría del módulo activo.

**Comportamiento:**
- Categorías colapsables con flecha animada
- Módulos bloqueados: `disabled`, gris, badge "Soon"
- Módulo activo: resaltado en azul con fondo `#1e3a5f`

---

## Panel de preview

### `QRPreview` — `src/components/QRPreview.jsx`

Panel derecho que contiene el canvas del QR y una etiqueta informativa.

**Props**

| Prop | Tipo | Descripción |
|---|---|---|
| `qrRef` | `React.RefObject<HTMLDivElement>` | Ref al div donde qr-code-styling monta el canvas |
| `config` | `Object` | Para leer `config.size` y `config.data` |
| `getRadiusPx` | `(size?) => number` | Calcula el border-radius a aplicar al contenedor |

**Detalles de implementación:**
- El fondo del panel es un patrón de cuadros (`linear-gradient` × 4) que simula transparencia
- El div con `qrRef` recibe `borderRadius` + `overflow: hidden` como estilos inline para recortar las esquinas del canvas sin modificar el canvas directamente

---

## Secciones del panel

### `QRSettingsSection` — `src/components/sections/QRSettingsSection.jsx`

Controles generales que aplican a todos los tipos de QR.

**Controles:** Tamaño (px), Margen, Corrección de error (M / Q / H)

**Props:** `config`, `update`

---

### `ShapeSection` — `src/components/sections/ShapeSection.jsx`

Slider para redondear globalmente las esquinas del QR.

**Controles:** Range 0–15 % con valor mostrado en tiempo real

**Props:** `config`, `update`

**Nota:** El porcentaje se convierte a píxeles con `getRadiusPx()` antes de usarse en CSS y en la exportación PNG.

---

### `DotsSection` — `src/components/sections/DotsSection.jsx`

Grid de 6 botones para elegir el estilo de puntos del QR.

**Estilos disponibles:**

| ID (qr-code-styling) | Label |
|---|---|
| `square` | Cuadrado |
| `dots` | Círculos |
| `rounded` | Redondeado |
| `extra-rounded` | Oval |
| `classy` | Clásico |
| `classy-rounded` | Clás. Redondo |

Cada botón muestra una miniatura SVG del estilo. El botón activo se resalta con borde azul y fondo `#1e3a5f`.

**Props:** `config`, `update`

---

### `CornersSection` — `src/components/sections/CornersSection.jsx`

Selectores para los "ojos" del QR (las tres esquinas cuadradas grandes).

**Controles:**
- **Marco exterior** (`cornersSquareOptions.type`): `square` | `extra-rounded` | `dot`
- **Punto interior** (`cornersDotOptions.type`): `square` | `dot`

**Props:** `config`, `update`

---

### `ColorsSection` — `src/components/sections/ColorsSection.jsx`

Control de color de puntos (sólido o degradado) y color de esquinas.

**Modo sólido:**
- Color de puntos
- Color de fondo

**Modo degradado:**
- Color 1 y Color 2
- Tipo: Lineal / Radial
- Color de fondo (independiente del modo sólido para no perder el valor al alternar)

**Toggle:** Cambia entre modo sólido y degradado sin perder los colores configurados en el otro modo.

**Props:** `config`, `update`

---

### `LogoSection` — `src/components/sections/LogoSection.jsx`

Upload del logo central del QR.

**Controles:**
- Dropzone (clic o drag & drop)
- Tamaño del logo en % del QR (5–40 %)
- Margen alrededor del logo (0–20 px)
- Toggle: fondo blanco detrás del logo (`hideBackgroundDots`)

**Formatos aceptados:** `.svg`, `.png`, `.jpg`, `.jpeg`, `.webp`

**Implementación:** Usa `FileReader` para convertir el archivo a Data URL y almacenarlo en `config.logoUrl`.

**Props:** `config`, `update`

---

### `ExportSection` — `src/components/sections/ExportSection.jsx`

Controles de exportación del QR generado.

**Controles:**
- Input de nombre de archivo
- Botón PNG (respeta esquinas redondeadas)
- Botón SVG
- Botón Canva PNG 1200 px

**Props**

| Prop | Tipo | Descripción |
|---|---|---|
| `config` | `Object` | Para leer `config.fileName` y `config.borderRadius` |
| `update` | `Function` | Para actualizar el nombre de archivo |
| `qrInstance` | `MutableRefObject` | Instancia de qr-code-styling para llamar `.download()` |
| `buildOptions` | `Function` | Para regenerar el QR en resolución diferente (Canva) |
| `getRadiusPx` | `Function` | Para calcular el radio antes de exportar |

---

## Componentes UI (átomos)

### `Toggle` — `src/components/ui/Toggle.jsx`

Switch on/off estilizado.

**Props**

| Prop | Tipo | Descripción |
|---|---|---|
| `checked` | `boolean` | Estado actual del toggle |
| `onChange` | `(value: boolean) => void` | Llamado con el nuevo valor |

**Implementación:** `<button>` con un `<span>` interno animado via `translate-x`. No usa `<input type="checkbox">` para mantener control total del estilo.

---

### `ColorPicker` — `src/components/ui/ColorPicker.jsx`

Combinación de swatch de color nativo + input de texto hex, sincronizados bidireccionalmente.

**Props**

| Prop | Tipo | Descripción |
|---|---|---|
| `value` | `string` | Color en formato `#rrggbb` |
| `onChange` | `(hex: string) => void` | Llamado cuando el color cambia (valid hex only) |

**Sincronización:**
- Swatch → actualiza input hex en tiempo real
- Input hex → actualiza swatch solo si el valor es un hex válido (`/^#[0-9a-fA-F]{6}$/`)
- `useEffect([value])` mantiene el input en sincronía si el valor cambia desde el padre

---

### `SectionTitle` — `src/components/ui/SectionTitle.jsx`

Encabezado de sección del panel de control.

**Props:** `children` (texto)

**Estilo:** Uppercase, tracking-widest, color muted, borde inferior.

---

### `ComingSoon` — `src/components/ui/ComingSoon.jsx`

Placeholder mostrado cuando el módulo activo está bloqueado.

**Props**

| Prop | Tipo | Descripción |
|---|---|---|
| `label` | `string` | Nombre del módulo (mostrado en el mensaje) |

**Estilo:** Borde dashed, ícono de info azul, texto centrado.
