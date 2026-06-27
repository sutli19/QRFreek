import { Sun, Moon } from 'lucide-react'

/**
 * ThemeToggle
 * Pill-shaped switch that toggles dark/light mode, with an animated
 * sliding knob and crossfading sun/moon icons.
 */
export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative inline-flex h-10 w-[72px] items-center rounded-full
        border border-ink-900/10 dark:border-white/10
        bg-white/50 dark:bg-ink-800/60
        backdrop-blur-md shadow-inner-glass
        transition-colors duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-400"
    >
      <span
        className={`absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full
          bg-gradient-to-br from-signal-500 to-scan-500 shadow-glow-signal
          transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isDark ? 'translate-x-[32px]' : 'translate-x-0'}`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-white" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4 text-white" aria-hidden="true" />
        )}
      </span>
      <Sun
        className={`absolute left-2.5 h-3.5 w-3.5 text-bloom-400/50 transition-opacity duration-200 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute right-2.5 h-3.5 w-3.5 text-signal-300/60 transition-opacity duration-200 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />
    </button>
  )
}
