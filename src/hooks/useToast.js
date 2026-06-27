import { useState, useCallback, useRef } from 'react'

let idCounter = 0

/**
 * useToast
 * Lightweight toast queue manager. Returns the active toasts plus
 * a `showToast(message, type)` function and a manual `dismissToast(id)`.
 */
export function useToast() {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const showToast = useCallback(
    (message, type = 'success', duration = 2800) => {
      const id = ++idCounter
      setToasts((prev) => [...prev, { id, message, type }])
      const timer = setTimeout(() => dismissToast(id), duration)
      timers.current.set(id, timer)
      return id
    },
    [dismissToast]
  )

  return { toasts, showToast, dismissToast }
}
