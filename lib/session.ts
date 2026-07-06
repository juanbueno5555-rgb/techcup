'use client'

import { useEffect, useState } from 'react'
import type { Rol } from './data'

export interface Session {
  rol: Rol
  email: string
}

const SESSION_KEY = 'techcup_session'
const THEME_KEY = 'techcup_theme'

export function saveSession(session: Session) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {}
}

export function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {}
}

/** Client hook returning the current session (null until hydrated). */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setSession(readSession())
    setReady(true)
  }, [])

  return { session, ready }
}

/** Returns the current role, defaulting to Jugador when no session exists. */
export function useRole(): { rol: Rol; ready: boolean } {
  const { session, ready } = useSession()
  return { rol: session?.rol ?? 'Jugador', ready }
}

/* ---------- Theme ---------- */
export function getTheme(): 'light' | 'dark' {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement
  if (theme === 'light') {
    root.classList.add('light')
    localStorage.setItem(THEME_KEY, 'light')
  } else {
    root.classList.remove('light')
    localStorage.setItem(THEME_KEY, 'dark')
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    setTheme(getTheme())
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  return { theme, toggle }
}
