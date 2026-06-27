import { QrCode, Download, ScanLine } from 'lucide-react'
import Button from './Button.jsx'

/**
 * ScanFrame
 * Signature visual: a viewfinder-style frame with animated corner
 * brackets, echoing the act of scanning a QR code. Wraps whatever
 * is passed as children (placeholder, skeleton, or the real QR).
 */
function ScanFrame({ children, active = false }) {
  return (
    <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
      {/* corner brackets */}
      {[
        'top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl',
        'top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl',
        'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl',
        'bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl',
      ].map((pos, i) => (
        <span
          key={i}
          className={`absolute h-7 w-7 border-signal-400/70 dark:border-scan-400/70 ${pos} transition-colors duration-500`}
        />
      ))}

      {/* scanning sweep, only while active */}
      {active && (
        <div className="absolute inset-3 overflow-hidden rounded-xl">
          <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-scan-400/40 to-transparent animate-scanline" />
        </div>
      )}

      <div className="absolute inset-3 flex items-center justify-center rounded-xl">
        {children}
      </div>
    </div>
  )
}

export default function QRDisplay({ qrDataUrl, loading, sourceText, onDownload }) {
  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <ScanFrame active>
          <div className="flex flex-col items-center gap-3 text-ink-400 dark:text-haze-200/50">
            <ScanLine className="h-9 w-9 animate-pulse" aria-hidden="true" />
            <p className="text-sm font-medium">Generating your code…</p>
          </div>
        </ScanFrame>
      ) : qrDataUrl ? (
        <ScanFrame>
          <img
            src={qrDataUrl}
            alt={`QR code encoding: ${sourceText}`}
            className="h-full w-full animate-pop-in rounded-lg bg-white p-2 shadow-glass"
          />
        </ScanFrame>
      ) : (
        <ScanFrame>
          <div className="flex flex-col items-center gap-3 px-6 text-center text-ink-400 dark:text-haze-200/40">
            <QrCode className="h-9 w-9" aria-hidden="true" />
            <p className="text-sm font-medium">
              Your QR code will appear here
            </p>
          </div>
        </ScanFrame>
      )}

      {qrDataUrl && !loading && (
        <div className="mt-6 w-full max-w-xs animate-fade-in-up">
          <Button
            variant="primary"
            icon={<Download className="h-4 w-4" aria-hidden="true" />}
            onClick={onDownload}
            className="w-full"
          >
            Download PNG
          </Button>
          <p className="mt-3 truncate text-center text-xs text-ink-500 dark:text-haze-200/50">
            {sourceText}
          </p>
        </div>
      )}
    </div>
  )
}
