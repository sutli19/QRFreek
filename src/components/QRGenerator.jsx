import { useRef } from 'react'
import { QrCode, Copy, X, Link2, Mail, Phone, Type } from 'lucide-react'
import Button from './Button.jsx'
import { detectInputType, TYPE_LABELS } from '../utils/validators.js'

const TYPE_ICONS = {
  url: Link2,
  email: Mail,
  phone: Phone,
  text: Type,
}

/**
 * QRGenerator
 * The primary input surface: text field, live content-type badge,
 * and the Generate / Copy / Clear action row.
 */
export default function QRGenerator({
  value,
  onChange,
  onGenerate,
  onCopy,
  onClear,
  loading,
  error,
}) {
  const inputRef = useRef(null)
  const type = detectInputType(value)
  const TypeIcon = TYPE_ICONS[type]

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label
        htmlFor="qr-input"
        className="mb-2 block text-sm font-medium text-ink-700 dark:text-haze-200/80"
      >
        Text, URL, email, or phone number
      </label>

      <div className="relative">
        <input
          id="qr-input"
          ref={inputRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck="false"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com or any text…"
          className={`input-field ${
            error ? 'ring-2 ring-bloom-500 border-bloom-500/60' : ''
          }`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'qr-input-error' : undefined}
        />

        {value && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full bg-signal-500/10 px-2.5 py-1 text-xs font-medium text-signal-600 dark:text-signal-300">
            <TypeIcon className="h-3 w-3" aria-hidden="true" />
            {TYPE_LABELS[type]}
          </span>
        )}
      </div>

      {error && (
        <p
          id="qr-input-error"
          className="mt-2 text-sm font-medium text-bloom-500"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          icon={<QrCode className="h-4 w-4" aria-hidden="true" />}
          className="flex-1 sm:flex-none"
        >
          {loading ? 'Generating…' : 'Generate QR code'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          icon={<Copy className="h-4 w-4" aria-hidden="true" />}
          onClick={onCopy}
          disabled={!value}
        >
          Copy
        </Button>

        <Button
          type="button"
          variant="ghost"
          icon={<X className="h-4 w-4" aria-hidden="true" />}
          onClick={onClear}
          disabled={!value}
        >
          Clear
        </Button>
      </div>
    </form>
  )
}
