import { useCallback, useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import QRGenerator from '../components/QRGenerator.jsx'
import QRDisplay from '../components/QRDisplay.jsx'
import HistoryPanel from '../components/HistoryPanel.jsx'
import ToastContainer from '../components/ToastContainer.jsx'
import { useTheme } from '../hooks/useTheme.js'
import { useToast } from '../hooks/useToast.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { generateQRDataUrl, downloadDataUrl, buildFileName } from '../utils/qrUtils.js'
import { isEmptyInput } from '../utils/validators.js'
import { APP_NAME, APP_SUBTITLE, APP_TAGLINE } from '../utils/siteConfig.js'

const HISTORY_KEY = 'qrfreek_history'
const MAX_HISTORY = 5
const MIN_LOADING_MS = 450

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Home() {
  const { isDark, toggleTheme } = useTheme()
  const { toasts, showToast, dismissToast } = useToast()
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, [])

  const [inputValue, setInputValue] = useState('')
  const [encodedText, setEncodedText] = useState('') // exact text the current QR represents
  const [qrDataUrl, setQrDataUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addToHistory = useCallback(
    (text) => {
      setHistory((prev) => {
        const withoutDuplicate = prev.filter((item) => item.text !== text)
        const next = [
          { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text, timestamp: Date.now() },
          ...withoutDuplicate,
        ]
        return next.slice(0, MAX_HISTORY)
      })
    },
    [setHistory]
  )

  const generateFor = useCallback(
    async (text) => {
      if (isEmptyInput(text)) {
        setError('Please enter some text, a URL, email, or phone number.')
        return
      }
      setError(null)
      setLoading(true)
      try {
        const [dataUrl] = await Promise.all([
          generateQRDataUrl(text.trim()),
          delay(MIN_LOADING_MS),
        ])
        setQrDataUrl(dataUrl)
        setEncodedText(text.trim())
        addToHistory(text.trim())
      } catch (err) {
        console.error(err)
        showToast('Something went wrong generating that QR code.', 'error')
      } finally {
        setLoading(false)
      }
    },
    [addToHistory, showToast]
  )

  const handleChange = (value) => {
    setInputValue(value)
    if (error) setError(null)
  }

  const handleGenerate = () => generateFor(inputValue)

  const handleCopy = async () => {
    if (!inputValue) return
    try {
      await navigator.clipboard.writeText(inputValue)
      showToast('Copied to clipboard!', 'success')
    } catch {
      showToast('Could not copy — try selecting the text manually.', 'error')
    }
  }

  const handleClear = () => {
    setInputValue('')
    setQrDataUrl(null)
    setEncodedText('')
    setError(null)
  }

  const handleDownload = () => {
    if (!qrDataUrl) return
    downloadDataUrl(qrDataUrl, buildFileName(encodedText))
    showToast('QR code downloaded as PNG!', 'success')
  }

  const handleHistorySelect = (item) => {
    setInputValue(item.text)
    generateFor(item.text)
  }

  const handleClearHistory = () => {
    setHistory([])
    showToast('History cleared.', 'info')
  }

  // Esc clears the current QR for fast iteration
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && document.activeElement?.id === 'qr-input') {
        handleClear()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient gradient blobs — signature background atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-signal-400/30 dark:bg-signal-500/20 blur-3xl animate-blob" />
        <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-scan-400/25 dark:bg-scan-500/15 blur-3xl animate-blob-slow" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-bloom-400/15 dark:bg-bloom-500/10 blur-3xl animate-blob" />
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="relative flex min-h-screen flex-col">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />

        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-10 sm:px-8">
          {/* Hero */}
          <div className="mx-auto mt-6 mb-10 max-w-2xl text-center animate-fade-in-up">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-signal-400/30 bg-signal-500/10 px-3.5 py-1.5 text-xs font-medium text-signal-600 dark:text-signal-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {APP_TAGLINE}
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              QR<span className="text-gradient">{APP_NAME.slice(2)}</span>
            </h1>
            <p className="mt-3 text-base text-ink-600 dark:text-haze-200/70 sm:text-lg">
              {APP_SUBTITLE}
            </p>
          </div>

          {/* Main panel */}
          <div className="grid gap-6 lg:grid-cols-5">
            <GlassCard className="p-6 sm:p-8 lg:col-span-3 animate-fade-in-up">
              <QRGenerator
                value={inputValue}
                onChange={handleChange}
                onGenerate={handleGenerate}
                onCopy={handleCopy}
                onClear={handleClear}
                loading={loading}
                error={error}
              />
              <HistoryPanel
                items={history}
                onSelect={handleHistorySelect}
                onClear={handleClearHistory}
              />
            </GlassCard>

            <GlassCard className="flex items-center justify-center p-6 sm:p-8 lg:col-span-2 animate-fade-in-up">
              <QRDisplay
                qrDataUrl={qrDataUrl}
                loading={loading}
                sourceText={encodedText}
                onDownload={handleDownload}
              />
            </GlassCard>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
