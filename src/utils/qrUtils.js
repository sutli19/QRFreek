import QRCode from 'qrcode'

/**
 * Generate a QR code as a data URL (PNG) for the given text.
 * @param {string} text - the content to encode
 * @param {object} options - extra qrcode.js options (colors, scale, etc.)
 * @returns {Promise<string>} PNG data URL
 */
export async function generateQRDataUrl(text, options = {}) {
  const defaultOptions = {
    width: 480,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#0B0F1A',
      light: '#FFFFFF',
    },
  }

  return QRCode.toDataURL(text, { ...defaultOptions, ...options })
}

/**
 * Trigger a browser download of a data URL.
 * @param {string} dataUrl
 * @param {string} filename
 */
export function downloadDataUrl(dataUrl, filename = 'qrfreek-code.png') {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Build a safe, descriptive filename from the source text.
 * @param {string} text
 */
export function buildFileName(text) {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40)
  return `qrfreek-${slug || 'code'}.png`
}
