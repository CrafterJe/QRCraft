# Sistema de módulos

El sistema de módulos permite que QRCraft soporte múltiples tipos de QR (URL, Wi-Fi, vCard, etc.) sin modificar el layout ni los componentes visuales. Cada tipo de QR es un **módulo** independiente con su propio formulario de datos.

---

## Conceptos clave

| Concepto | Descripción |
|---|---|
| **Módulo** | Objeto que describe un tipo de QR: metadatos, ícono y componente Form |
| **Registro** | Array `MODULES[]` en `src/modules/index.jsx` con todos los módulos disponibles |
| **Categoría** | Agrupación de módulos (Básicos, Contacto, Redes sociales, etc.) |
| **Form** | Componente React que recibe `value/onChange` y emite el string de datos del QR |
| **Encoder** | Función pura en `qrEncoders.js` que convierte campos de formulario en el string del QR |

---

## Forma de un módulo (`QRModule`)

```js
// src/types/module.js — JSDoc typedef

/**
 * @typedef {Object} QRModule
 * @property {string}   id         - Identificador único (ej: 'wifi', 'vcard')
 * @property {string}   label      - Nombre visible en el selector
 * @property {string}   categoryId - ID de la categoría padre
 * @property {boolean}  available  - true = activo, false = bloqueado ("Soon")
 * @property {ReactNode} icon      - SVG de 18×18 px
 * @property {React.ComponentType<ModuleFormProps>|null} Form
 *   - Componente del formulario, null si el módulo está bloqueado
 */

/**
 * @typedef {Object} ModuleFormProps
 * @property {string}   value    - String QR actual (puede estar vacío al entrar)
 * @property {(data: string) => void} onChange - Llama con el nuevo string codificado
 */
```

---

## Registro central (`src/modules/index.jsx`)

```js
import urlModule from './basics/url';

export const CATEGORIES = [
  { id: 'basics',   label: 'Básicos' },
  { id: 'contact',  label: 'Contacto y comunicación' },
  { id: 'social',   label: 'Redes sociales' },
  { id: 'location', label: 'Ubicación' },
  { id: 'events',   label: 'Eventos y agenda' },
  { id: 'apps',     label: 'Apps' },
  { id: 'files',    label: 'Archivos' },
];

// Helper para módulos aún no implementados
const locked = (meta) => ({ ...meta, available: false, Form: null });

export const MODULES = [
  urlModule,                         // ← módulo real importado de su carpeta
  locked({ id: 'wifi', ... }),       // ← módulo bloqueado definido inline
  locked({ id: 'vcard', ... }),
  // ...
];
```

### Regla importante

- Los módulos **activos** (`available: true`) se importan desde su carpeta propia.
- Los módulos **bloqueados** (`available: false`) se definen inline con el helper `locked()` directamente en el registro. No necesitan carpeta propia hasta que se implementen.

---

## Cómo funciona el TypeSelector

`TypeSelector` lee `MODULES` y `CATEGORIES` del registro y renderiza:

1. Una lista de categorías colapsables
2. Dentro de cada categoría, chips con el ícono y nombre del módulo
3. Los módulos bloqueados aparecen en gris con badge "Soon" y están `disabled`
4. La categoría del módulo activo se expande automáticamente al montar

Cuando el usuario selecciona un módulo activo:
- `QRGenerator` actualiza `activeModuleId` (estado local)
- `ControlPanel` busca el módulo en el registro y renderiza su `Form`
- El campo `data` del QR se resetea a `''`

---

## Cómo agregar un nuevo módulo

Ejemplo completo: implementar el módulo **Wi-Fi**.

### Paso 1 — Crear la carpeta del módulo

```
src/modules/basics/wifi/index.jsx
```

### Paso 2 — Escribir el formulario

```jsx
// src/modules/basics/wifi/index.jsx
import { useState, useEffect } from 'react';
import { encodeWifi } from '../../../utils/qrEncoders';

const inputClass = 'w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#f0f0f0] text-sm outline-none focus:border-blue-500 transition-colors';

function WifiForm({ onChange }) {
  const [fields, setFields] = useState({ ssid: '', password: '', security: 'WPA' });

  const set = (key, val) => setFields(prev => ({ ...prev, [key]: val }));

  useEffect(() => {
    if (fields.ssid) onChange(encodeWifi(fields));
  }, [fields, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="block text-xs text-[#8b949e] mb-1">Nombre de red (SSID)</label>
        <input
          type="text"
          value={fields.ssid}
          onChange={e => set('ssid', e.target.value)}
          placeholder="Mi Red WiFi"
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-xs text-[#8b949e] mb-1">Contraseña</label>
        <input
          type="password"
          value={fields.password}
          onChange={e => set('password', e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-xs text-[#8b949e] mb-1">Seguridad</label>
        <select
          value={fields.security}
          onChange={e => set('security', e.target.value)}
          className={inputClass}
        >
          <option value="WPA">WPA / WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Sin contraseña</option>
        </select>
      </div>
    </div>
  );
}

export default {
  id: 'wifi',
  label: 'Wi-Fi',
  categoryId: 'basics',
  available: true,          // ← cambiado a true
  icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
      <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Form: WifiForm,
};
```

### Paso 3 — Registrar el módulo

En `src/modules/index.jsx`, reemplazar la entrada `locked` de Wi-Fi por el import real:

```diff
+ import wifiModule from './basics/wifi';

  export const MODULES = [
    urlModule,
-   locked({ id: 'wifi', label: 'Wi-Fi', categoryId: 'basics', icon: <...> }),
+   wifiModule,
    // ...
  ];
```

El ícono ya no se necesita en el registro porque viene del módulo. Si quieres mantener el mismo ícono, cópialo al módulo o extráelo a `src/components/icons/`.

### Paso 4 — ¡Listo!

No hay que tocar `ControlPanel`, `TypeSelector`, ni `QRGenerator`. El módulo aparece automáticamente en el selector y su Form se renderiza cuando el usuario lo selecciona.

---

## Módulos disponibles por categoría

### Básicos

| ID | Label | Estado | Encoder |
|---|---|---|---|
| `url` | URL / enlace web | ✅ Activo | — (raw URL) |
| `text` | Texto plano | 🔒 | — (raw text) |
| `wifi` | Wi-Fi | 🔒 | `encodeWifi()` |

### Contacto y comunicación

| ID | Label | Estado | Encoder |
|---|---|---|---|
| `vcard` | vCard | 🔒 | `encodeVCard()` |
| `email` | Email | 🔒 | `encodeEmail()` |
| `sms` | SMS | 🔒 | `encodeSMS()` |
| `phone` | Llamada telefónica | 🔒 | `encodePhone()` |
| `whatsapp` | WhatsApp | 🔒 | `encodeWhatsApp()` |

### Redes sociales

| ID | Label | Estado | Encoder |
|---|---|---|---|
| `instagram` | Instagram | 🔒 | `encodeSocialProfile('instagram', handle)` |
| `facebook` | Facebook | 🔒 | `encodeSocialProfile('facebook', handle)` |
| `tiktok` | TikTok | 🔒 | `encodeSocialProfile('tiktok', handle)` |
| `twitter` | X / Twitter | 🔒 | `encodeSocialProfile('twitter', handle)` |
| `youtube` | YouTube | 🔒 | `encodeSocialProfile('youtube', handle)` |
| `linkedin` | LinkedIn | 🔒 | `encodeSocialProfile('linkedin', handle)` |

### Ubicación

| ID | Label | Estado | Encoder |
|---|---|---|---|
| `maps` | Google Maps | 🔒 | `encodeMaps(query)` |

### Eventos

| ID | Label | Estado | Encoder |
|---|---|---|---|
| `ical` | Evento (iCal) | 🔒 | `encodeICal()` |

### Apps

| ID | Label | Estado | Encoder |
|---|---|---|---|
| `store` | App Store / Play Store | 🔒 | `encodeAppStore()` |

### Archivos

| ID | Label | Estado | Encoder |
|---|---|---|---|
| `file` | PDF / Imagen (URL) | 🔒 | — (raw URL) |
