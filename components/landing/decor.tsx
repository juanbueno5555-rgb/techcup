'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

/* Floating golden particles that drift upward across a section. */
export function Particles({ count = 18 }: { count?: number }) {
  // Generate positions only on the client after mount to avoid SSR/CSR
  // hydration mismatches from Math.random().
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.round(Math.random() * 4)
        return {
          id: i,
          left: Math.random() * 100,
          top: 40 + Math.random() * 60,
          size,
          duration: 6 + Math.random() * 8,
          delay: Math.random() * 8,
          gold: Math.random() > 0.4,
        }
      }),
    [count],
  )

  if (!mounted) return <div className="tc-particles" aria-hidden="true" />

  return (
    <div className="tc-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="tc-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.gold ? 'var(--tc-dorado-light)' : 'var(--tc-violeta-light)',
            boxShadow: p.gold
              ? '0 0 8px rgba(251,191,36,0.8)'
              : '0 0 8px rgba(167,139,250,0.8)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/*
 * 3D tilt wrapper: children rotate slightly following the pointer, giving a
 * subtle parallax / depth effect. Falls back gracefully when the pointer
 * leaves and respects reduced-motion via CSS.
 */
export function Tilt({
  children,
  max = 10,
  className,
  style,
}: {
  children: React.ReactNode
  max?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)')

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const ry = (px - 0.5) * (max * 2)
    const rx = (0.5 - py) * (max * 2)
    setTransform(`rotateX(${rx}deg) rotateY(${ry}deg)`)
  }

  function handleLeave() {
    setTransform('rotateX(0deg) rotateY(0deg)')
  }

  return (
    <div className={`tc-tilt-scene ${className ?? ''}`} style={style}>
      <div
        ref={ref}
        className="tc-tilt-target"
        style={{ transform }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </div>
    </div>
  )
}

/*
 * Layered ambient background for a section: diagonal energy lines, a couple of
 * glow orbs and drifting particles. Purely decorative.
 */
export function Ambient({
  lines = true,
  particles = true,
  orbs = 'violet-gold',
}: {
  lines?: boolean
  particles?: boolean
  orbs?: 'violet-gold' | 'violet' | 'none'
}) {
  return (
    <>
      {lines && <div className="tc-diagonal-lines" aria-hidden="true" />}
      {orbs !== 'none' && (
        <>
          <span
            className="tc-glow-orb tc-glow-orb--violet"
            aria-hidden="true"
            style={{ width: 340, height: 340, top: -80, left: -60 }}
          />
          {orbs === 'violet-gold' && (
            <span
              className="tc-glow-orb tc-glow-orb--gold"
              aria-hidden="true"
              style={{ width: 300, height: 300, bottom: -100, right: -40 }}
            />
          )}
        </>
      )}
      {particles && <Particles />}
    </>
  )
}
