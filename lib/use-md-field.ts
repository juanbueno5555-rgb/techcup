'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Robust binding for @material/web form controls.
 *
 * React 19 does not reliably attach lowercase `oninput`/`onchange` prop
 * handlers to these custom elements, so instead we attach native listeners
 * via a ref once the element is mounted (and upgraded). Returns a ref to spread
 * onto the md element plus the current value and a setter.
 */
export function useMdText(initial = '') {
  const ref = useRef<HTMLElement & { value: string }>(null)
  const [value, setValue] = useState(initial)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (el.value !== value) el.value = value
    const handler = () => setValue(el.value)
    el.addEventListener('input', handler)
    el.addEventListener('change', handler)
    return () => {
      el.removeEventListener('input', handler)
      el.removeEventListener('change', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, value, setValue }
}

/** Binding for md-checkbox / md-switch style controls (boolean state). */
export function useMdBool(
  initial = false,
  prop: 'checked' | 'selected' = 'checked',
) {
  const ref = useRef<HTMLElement & Record<string, boolean>>(null)
  const [value, setValue] = useState(initial)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el[prop] = value
    const handler = () => setValue(Boolean(el[prop]))
    el.addEventListener('change', handler)
    return () => el.removeEventListener('change', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, value, setValue }
}
