import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  icon: 'btn-icon',
}

/**
 * Button
 * A single reusable button used across the app.
 *
 * @param {'primary'|'ghost'|'icon'} variant
 * @param {boolean} loading - shows a spinner and disables the button
 * @param {React.ReactNode} icon - optional leading icon
 */
export default function Button({
  variant = 'primary',
  loading = false,
  icon = null,
  children,
  className = '',
  disabled = false,
  ...rest
}) {
  const base = VARIANTS[variant] || VARIANTS.primary

  return (
    <button
      className={`${base} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      {children}
    </button>
  )
}
