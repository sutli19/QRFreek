import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const ACCENTS = {
  success: 'border-scan-500/30 text-scan-500',
  error: 'border-bloom-500/30 text-bloom-500',
  info: 'border-signal-500/30 text-signal-500',
}

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null

  return (
    <div
      className="fixed top-5 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2.5 px-4 sm:left-auto sm:right-5 sm:translate-x-0"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || Info
        return (
          <div
            key={toast.id}
            className={`animate-toast-in glass-surface flex items-center gap-3 rounded-2xl border px-4 py-3.5 ${
              ACCENTS[toast.type] || ACCENTS.info
            }`}
            role="status"
          >
            <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <p className="flex-1 text-sm font-medium text-ink-800 dark:text-haze-50">
              {toast.message}
            </p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="flex-shrink-0 rounded-lg p-1 text-ink-400 hover:bg-ink-900/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
