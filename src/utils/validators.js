/**
 * Returns true if the given input is empty / whitespace only.
 */
export function isEmptyInput(value) {
  return !value || value.trim().length === 0
}

const URL_REGEX = /^(https?:\/\/|www\.)[^\s]+\.[^\s]+$/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
const PHONE_REGEX = /^[+]?[\d\s().-]{7,}$/

/**
 * Roughly classify the input so the UI can show a friendly type label
 * (e.g. "URL", "Email", "Phone", "Text"). This is cosmetic only —
 * the QR code always encodes the raw text exactly as typed.
 */
export function detectInputType(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'text'
  if (URL_REGEX.test(trimmed)) return 'url'
  if (EMAIL_REGEX.test(trimmed)) return 'email'
  if (PHONE_REGEX.test(trimmed)) return 'phone'
  return 'text'
}

export const TYPE_LABELS = {
  url: 'URL',
  email: 'Email',
  phone: 'Phone number',
  text: 'Text',
}
