import { History, Link2, Mail, Phone, Type, Trash2 } from 'lucide-react'
import { detectInputType } from '../utils/validators.js'

const TYPE_ICONS = {
  url: Link2,
  email: Mail,
  phone: Phone,
  text: Type,
}

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function HistoryPanel({ items, onSelect, onClear }) {
  if (!items.length) return null

  return (
    <div className="mt-8 w-full animate-fade-in-up">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-haze-200/90">
          <History className="h-4 w-4" aria-hidden="true" />
          Recent codes
        </h3>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs font-medium text-ink-400 hover:text-bloom-500 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const type = detectInputType(item.text)
          const Icon = TYPE_ICONS[type]
          return (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item)}
                className="group flex w-full items-center gap-3 rounded-2xl border border-ink-900/10 dark:border-white/10
                  bg-white/40 dark:bg-white/5 px-4 py-3 text-left
                  transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/70 dark:hover:bg-white/10 hover:shadow-glass
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-400"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink-800 dark:text-haze-50">
                    {item.text}
                  </span>
                  <span className="block text-xs text-ink-400 dark:text-haze-200/40">
                    {timeAgo(item.timestamp)}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
