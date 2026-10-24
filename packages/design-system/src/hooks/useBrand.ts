import { useState, useCallback, useEffect } from 'react'

export type Brand = '1' | '2' | '3'

const STORAGE_KEY = 'ds-brand'
const DEFAULT_BRAND: Brand = '1'

export type Theme = 'dark' | 'light'
const THEME_KEY = 'ds-theme'

function applyBrand(brand: Brand, theme: Theme) {
  document.documentElement.setAttribute('data-brand', brand)
  // Only Brand 3 has a light theme. Dark is its default, so no attribute means dark.
  if (brand === '3' && theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

/**
 * useBrand — manages the active brand across the app.
 *
 * Sets data-brand (and, for Brand 3 light, data-theme) on <html>, persists to localStorage,
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

  const [theme, setThemeState] = useState<Theme>(() =>
    localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
  )

  // Apply on mount and whenever brand or theme changes
  useEffect(() => {
    applyBrand(brand, theme)
    localStorage.setItem(STORAGE_KEY, brand)
    localStorage.setItem(THEME_KEY, theme)
  }, [brand, theme])

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setBrandState(e.newValue as Brand)
      }
      if (e.key === THEME_KEY && e.newValue) {
        setThemeState(e.newValue === 'light' ? 'light' : 'dark')
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const setBrand = useCallback((next: Brand) => {
    setBrandState(next)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  return { brand, setBrand, theme, setTheme }
}
