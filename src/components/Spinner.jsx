import { Loader2 } from 'lucide-react'

/**
 * Spinner
 * Small inline loading indicator for buttons and tight spaces.
 */
export default function Spinner({ size = 16, className = '' }) {
  return (
    <Loader2
      className={`animate-spin text-current ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}
