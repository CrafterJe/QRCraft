# Hooks y utilidades

---

## Hook: `useQRConfig`

**Archivo:** `src/hooks/useQRConfig.js`

Hook central de la aplicación. Concentra todo el estado de configuración del QR, la instancia de `qr-code-styling` y las funciones derivadas.

### Retorno

```js
const {
  config,        // objeto de estado completo
  update,        // actualizador de un campo
  qrRef,         // ref para montar el canvas del QR
  qrInstance,    // ref a la instancia QRCodeStyling
  buildOptions,  // función para construir el objeto de opciones
  getRadiusPx,   // función para convertir % de radio a píxeles
} = useQRConfig();
```

---

### `config` — objeto de estado

| Campo | Tipo | Default | Descripción |
|---|---|---|---|
| `data` | `string` | URL de ejemplo | String de datos que encode el QR |
| `size` | `number` | `400` | Dimensión del QR en px |
| `margin` | `number` | `2` | Margen interior en módulos QR |
| `errorCorrection` | `'M'│'Q'│'H'` | `'H'` | Nivel de corrección de error |
| `borderRadius` | `number` | `0` | Radio de esquinas en % (0–15) |
| `dotStyle` | `string` | `'square'` | Estilo de puntos del QR |
| `cornerSquareStyle` | `string` | `'square'` | Estilo del marco exterior de esquinas |
| `cornerDotStyle` | `string` | `'square'` | Estilo del punto interior de esquinas |
| `useGradient` | `boolean` | `false` | Activar degradado en puntos |
| `dotColor` | `string` | `'#000000'` | Color de puntos (modo sólido) |
| `bgColor` | `string` | `'#ffffff'` | Color de fondo (modo sólido) |
| `bgColorGrad` | `string` | `'#ffffff'` | Color de fondo (modo degradado) |
| `gradColor1` | `string` | `'#3b82f6'` | Color 1 del degradado |
| `gradColor2` | `string` | `'#6366f1'` | Color 2 del degradado |
| `gradType` | `'linear'│'radial'` | `'linear'` | Tipo de degradado |
| `eyeColor` | `string` | `'#000000'` | Color de las esquinas (ojos) |
| `logoUrl` | `string│null` | `null` | Data URL del logo cargado |
| `logoFileName` | `string│null` | `null` | Nombre del archivo del logo |
| `logoSize` | `number` | `22` | Tamaño del logo en % del QR |
| `logoMargin` | `number` | `5` | Margen del logo en px |
| `hideLogoBg` | `boolean` | `true` | Ocultar puntos del QR detrás del logo |
| `fileName` | `string` | `'qr-tecnofix'` | Nombre base para exportar |

---

### `update(key, value)`

Actualiza un campo del config mediante un merge parcial.

```js
update('data', 'https://example.com');
update('dotStyle', 'dots');
update('useGradient', true);
```

Internamente usa `setConfig(prev => ({ ...prev, [key]: value }))`.

---

### `buildOptions(overrideSize?)`

Construye el objeto de opciones compatible con `QRCodeStyling`. Memoizado con `useCallback([config])`.

```js
const opts = buildOptions();        // usa config.size
const opts = buildOptions(1200);    // override para exportar en alta resolución
```

**Salida (ejemplo):**

```js
{
  width: 400,
  height: 400,
  data: 'https://example.com',
  margin: 2,
  qrOptions: { errorCorrectionLevel: 'H' },
  dotsOptions: { type: 'square', color: '#000000' },
  backgroundOptions: { color: '#ffffff' },
  cornersSquareOptions: { type: 'square', color: '#000000' },
  cornersDotOptions: { type: 'square', color: '#000000' },
  // Si hay logo:
  image: 'data:image/png;base64,...',
  imageOptions: { width: 88, height: 88, margin: 5, hideBackgroundDots: true, crossOrigin: 'anonymous' }
}
```

---

### `getRadiusPx(size?)`

Convierte el porcentaje de radio en píxeles para un tamaño dado.

```js
getRadiusPx()       // usa config.size: Math.round(400 * (5 / 100)) → 20
getRadiusPx(1200)   // para exportación Canva: Math.round(1200 * (5 / 100)) → 60
```

---

### `qrRef` y `qrInstance`

```js
// qrRef: se pasa como ref al div contenedor del QR
<div ref={qrRef} style={{ borderRadius: `${radiusPx}px`, overflow: 'hidden' }} />

// qrInstance: acceso a la instancia para .download()
qrInstance.current.download({ name: 'mi-qr', extension: 'png' });
```

El `useEffect` interno gestiona el ciclo de vida:
- Primera vez: crea la instancia y la monta en el DOM
- Actualizaciones: llama a `qrInstance.current.update(opts)`
- No hay cleanup porque la instancia vive mientras vive la página

---

---

## Utilidades de exportación

**Archivo:** `src/utils/qrExport.js`

Funciones que manejan la descarga de los archivos generados.

---

### `downloadPNG(qrInstance, name, radiusPx, buildOptions)`

Descarga el QR como PNG. Si `radiusPx > 0`, renderiza el QR en un div offscreen, recorta las esquinas con canvas 2D y descarga el resultado.

**Parámetros**

| Param | Tipo | Descripción |
|---|---|---|
| `qrInstance` | `QRCodeStyling` | Instancia activa (del hook) |
| `name` | `string` | Nombre del archivo sin extensión |
| `radiusPx` | `number` | Radio de esquinas en píxeles |
| `buildOptions` | `() => Object` | Función para obtener las opciones actuales |

**Implementación del recorte de esquinas:**

```js
function roundedCanvas(srcCanvas, radius) {
  const dst = document.createElement('canvas');
  // ... crea path con quadraticCurveTo en las 4 esquinas
  ctx.clip();
  ctx.drawImage(srcCanvas, 0, 0);
  return dst;
}
```

---

### `downloadSVG(qrInstance, name)`

Delegado directo a `qrInstance.download({ name, extension: 'svg' })`.

**Nota:** Los SVG con logos pueden ser rechazados por Canva. Para ese caso existe `downloadForCanva`.

---

### `downloadForCanva(name, borderRadiusPct, buildOptions)`

Exporta el QR en PNG a **1200 × 1200 px** con el radio recalculado para esa resolución.

```js
const canvaRadius = Math.round(1200 * (borderRadiusPct / 100));
const opts = buildOptions(1200);  // buildOptions respeta el tamaño override
```

Si el logo estaba configurado, `buildOptions(1200)` lo escala proporcionalmente al nuevo tamaño.

---

### Función interna: `renderOffscreen(opts, delay, callback)`

Monta un `QRCodeStyling` temporal en un `div` fuera de pantalla (`position: fixed; left: -9999px`), espera `delay` ms para que el canvas renderice, ejecuta el callback y limpia el DOM.

```js
renderOffscreen(opts, 300, (div, qr) => {
  const canvas = div.querySelector('canvas');
  // ... hacer algo con el canvas
});
```

El delay existe porque `qr-code-styling` renderiza el canvas de forma asíncrona.
