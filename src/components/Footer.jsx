import { Mail, Sparkles, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react'
import {
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  DIGITAL_HEROES_URL,
  APP_NAME,
} from '../utils/siteConfig.js'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 w-full">
      <div className="mx-auto max-w-5xl px-5 pb-10 sm:px-8">
        <div className="glass-panel rounded-3xl px-6 py-8 sm:px-10">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-base font-semibold text-ink-900 dark:text-haze-50">
                {AUTHOR_NAME}
              </p>
              <a
                href={`mailto:${AUTHOR_EMAIL}`}
                className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-600 dark:text-haze-200/80 hover:text-signal-500 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {AUTHOR_EMAIL}
              </a>
            </div>

            <a
              href={DIGITAL_HEROES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Built for Digital Heroes
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-ink-900/10 dark:border-white/10 pt-6 sm:flex-row">
            <p className="text-xs text-ink-500 dark:text-haze-200/50">
              © {new Date().getFullYear()} {APP_NAME}. All processing happens
              locally in your browser.
            </p>
            <div className="flex items-center gap-4 text-xs text-ink-500 dark:text-haze-200/50">
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-signal-500" aria-hidden="true" />
                No sign-up
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-scan-500"
                  aria-hidden="true"
                />
                100% private
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
