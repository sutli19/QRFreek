import { ScanLine } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="relative z-10 w-full">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-signal-500 to-scan-500 shadow-glow-signal">
            <ScanLine className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            QR<span className="text-gradient">Freek</span>
          </span>
        </div>

        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}
