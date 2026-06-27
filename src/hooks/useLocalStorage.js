import { useState, useEffect, useCallback } from 'react'

/**
 * useLocalStorage
 * A drop-in replacement for useState that persists its value to localStorage.
 * Safe for SSR / environments without window, and resilient to corrupt JSON.
 */
export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: failed to read key "${key}"`, error)
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(readValue)

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(`useLocalStorage: failed to set key "${key}"`, error)
      }
    },
    [key, storedValue]
  )

  // Keep in sync if the key changes elsewhere (e.g. another tab)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch {
          /* ignore malformed updates from other tabs */
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  return [storedValue, setValue]
}
