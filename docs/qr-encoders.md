# Referencia de encoders QR

**Archivo:** `src/utils/qrEncoders.js`

Todas las funciones son **puras** (sin efectos secundarios, sin imports de React). Reciben los datos del formulario y devuelven el string que se pasa al campo `data` del QR.

---

## Básicos

### URL y texto plano

No requieren encoder. El valor del input se pasa directamente a `config.data`.

```js
// URL
onChange('https://tecnofix.com')

// Texto plano
onChange('Hola mundo')
```

---

### `encodeWifi({ ssid, password, security })`

Genera el formato estándar para conexión automática a redes Wi-Fi.

**Parámetros**

| Campo | Tipo | Descripción |
|---|---|---|
| `ssid` | `string` | Nombre de la red |
| `password` | `string` | Contraseña |
| `security` | `'WPA'│'WEP'│'nopass'` | Tipo de seguridad |

**Formato de salida:**

```
WIFI:S:<ssid>;T:<security>;P:<password>;;
```

**Ejemplos:**

```js
encodeWifi({ ssid: 'MiRed', password: 'pass1234', security: 'WPA' })
// → "WIFI:S:MiRed;T:WPA;P:pass1234;;"

encodeWifi({ ssid: 'PublicWifi', password: '', security: 'nopass' })
// → "WIFI:S:PublicWifi;T:nopass;P:;;"
```

---

## Contacto y comunicación

### `encodeVCard({ firstName, lastName, phone?, email?, org?, title?, url? })`

Genera una tarjeta de contacto en formato vCard 3.0.

**Parámetros**

| Campo | Requerido | Descripción |
|---|---|---|
| `firstName` | ✅ | Nombre |
| `lastName` | ✅ | Apellido |
| `phone` | ❌ | Teléfono |
| `email` | ❌ | Correo electrónico |
| `org` | ❌ | Empresa / organización |
| `title` | ❌ | Cargo |
| `url` | ❌ | Sitio web |

**Ejemplo de salida:**

```
BEGIN:VCARD
VERSION:3.0
N:Juárez;Raúl
FN:Raúl Juárez
TEL:+52 222 000 0000
EMAIL:raul@tecnofix.com
ORG:TecnoFix
TITLE:Director
URL:https://tecnofix.com
END:VCARD
```

---

### `encodeEmail({ to, subject?, body? })`

Genera un enlace `mailto:` con campos opcionales pre-llenados.

```js
encodeEmail({ to: 'contacto@tecnofix.com', subject: 'Consulta', body: 'Hola!' })
// → "mailto:contacto@tecnofix.com?subject=Consulta&body=Hola!"
```

Los campos `subject` y `body` se codifican con `encodeURIComponent`.

---

### `encodeSMS({ number, message? })`

Genera un enlace `sms:` para abrir el mensaje de texto con número y mensaje pre-escritos.

```js
encodeSMS({ number: '+522221234567', message: 'Hola TecnoFix' })
// → "sms:+522221234567?body=Hola%20TecnoFix"
```

---

### `encodePhone(number)`

Genera un enlace `tel:` para marcar directamente.

```js
encodePhone('+522221234567')
// → "tel:+522221234567"
```

---

### `encodeWhatsApp({ number, message? })`

Genera el link de WhatsApp con número limpio (sin caracteres no-numéricos) y mensaje opcional.

```js
encodeWhatsApp({ number: '+52 222 123 4567', message: '¿Tienes disponibilidad?' })
// → "https://wa.me/522221234567?text=%C2%BFTienes%20disponibilidad%3F"
```

**Nota:** Se eliminan automáticamente espacios, guiones y paréntesis del número.

---

## Redes sociales

### `encodeSocialProfile(platform, handle)`

Genera la URL del perfil para cada plataforma.

**Plataformas soportadas:** `instagram`, `facebook`, `tiktok`, `twitter`, `youtube`, `linkedin`

| Plataforma | URL generada |
|---|---|
| `instagram` | `https://instagram.com/<handle>` |
| `facebook` | `https://facebook.com/<handle>` |
| `tiktok` | `https://tiktok.com/@<handle>` |
| `twitter` | `https://x.com/<handle>` |
| `youtube` | `https://youtube.com/@<handle>` |
| `linkedin` | `https://linkedin.com/in/<handle>` |

```js
encodeSocialProfile('instagram', 'tecnofix.puebla')
// → "https://instagram.com/tecnofix.puebla"

encodeSocialProfile('tiktok', 'tecnofix')
// → "https://tiktok.com/@tecnofix"
```

---

## Ubicación

### `encodeMaps(query)`

Genera una URL de Google Maps con la dirección o coordenadas como query.

```js
encodeMaps('TecnoFix Puebla')
// → "https://maps.google.com/?q=TecnoFix%20Puebla"

encodeMaps('19.0414,-98.2063')
// → "https://maps.google.com/?q=19.0414%2C-98.2063"
```

---

## Eventos

### `encodeICal({ title, start, end, location?, description? })`

Genera un evento de calendario en formato iCalendar (RFC 5545).

**Parámetros**

| Campo | Requerido | Formato | Descripción |
|---|---|---|---|
| `title` | ✅ | string | Título del evento |
| `start` | ✅ | `YYYYMMDDTHHmmss` o `YYYYMMDD` | Inicio |
| `end` | ✅ | `YYYYMMDDTHHmmss` o `YYYYMMDD` | Fin |
| `location` | ❌ | string | Lugar |
| `description` | ❌ | string | Descripción |

**Ejemplo:**

```js
encodeICal({
  title: 'Revisión de equipo',
  start: '20260115T100000',
  end:   '20260115T110000',
  location: 'TecnoFix Puebla',
})
```

**Salida:**

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Revisión de equipo
DTSTART:20260115T100000
DTEND:20260115T110000
LOCATION:TecnoFix Puebla
END:VEVENT
END:VCALENDAR
```

---

## Apps

### `encodeAppStore({ ios?, android? })`

Devuelve el link de iOS si está disponible, de lo contrario el de Android.

```js
encodeAppStore({ ios: 'https://apps.apple.com/app/id123456' })
// → "https://apps.apple.com/app/id123456"

encodeAppStore({ android: 'https://play.google.com/store/apps/details?id=com.example' })
// → "https://play.google.com/store/apps/details?id=com.example"
```

Para mostrar ambos en el formulario y permitir elegir, el módulo puede implementar un selector de plataforma internamente.

---

## Archivos

No requieren encoder. El formulario pide la URL directa al PDF o imagen y la pasa sin transformar a `config.data`.

---

## Notas de compatibilidad

| Tipo | Escaneadores móviles | Google Lens | Cámara nativa iOS |
|---|---|---|---|
| URL | ✅ | ✅ | ✅ |
| Texto plano | ✅ | ✅ | ✅ |
| WIFI | ✅ | ✅ | ✅ |
| vCard | ✅ | ✅ | ✅ |
| mailto | ✅ | ✅ | ✅ |
| tel / sms | ✅ | ✅ | ✅ |
| WhatsApp | ✅ | ✅ | ✅ |
| iCal | ✅ (parcial) | ⚠️ | ✅ |
| Google Maps URL | ✅ | ✅ | ✅ |

> ⚠️ El formato iCal tiene soporte variable en escaneadores de terceros. La cámara nativa de iOS lo interpreta directamente como evento de calendario.
