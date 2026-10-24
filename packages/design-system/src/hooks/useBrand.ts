import { useState, useCallback, useEffect } from 'react'

export type Brand = '1' | '2' | '3'

const STORAGE_KEY = 'ds-brand'
const DEFAULT_BRAND: Brand = '1'

function applyBrand(brand: Brand) {
  document.documentElement.setAttribute('data-brand', brand)
}

/**
 * useBrand — manages the active brand across the app.
 *
 * Sets data-brand on <html>, persists to localStorage,
 * and syncs across tabs via the storage event.
 *
 * Usage:
 *   const { brand, setBrand } = useBrand()
 */
export function useBrand() {
  const [brand, setBrandState] = useState<Brand>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Brand | null
    return stored ?? DEFAULT_BRAND
  })

  // Apply on mount and whenever brand changes
  useEffect(() => {
    applyBrand(brand)
    localStorage.setItem(STORAGE_KEY, brand)
  }, [brand])

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setBrandState(e.newValue as Brand)
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const setBrand = useCallback((next: Brand) => {
    setBrandState(next)
  }, [])

  return { brand, setBrand }
}
