/**
 * @typedef {Object} QRModule
 * @property {string} id - Unique module identifier
 * @property {string} label - Display name shown in the UI
 * @property {string} categoryId - ID of the parent category
 * @property {boolean} available - Whether the module is usable (false = locked)
 * @property {import('react').ReactNode} icon - SVG icon element (18x18)
 * @property {import('react').ComponentType<ModuleFormProps>|null} Form - Form component, null if locked
 */

/**
 * @typedef {Object} ModuleFormProps
 * @property {string} value - Current encoded QR data string
 * @property {(data: string) => void} onChange - Called when the encoded data changes
 */

/**
 * @typedef {Object} QRCategory
 * @property {string} id - Unique category identifier
 * @property {string} label - Display name
 */
