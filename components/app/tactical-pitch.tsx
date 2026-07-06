'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { squad } from '@/lib/data'
import type { SquadPlayer } from '@/lib/data'

interface Position {
  dorsal: number
  x: number
  y: number
}

export function TacticalPitch() {
  const [positions, setPositions] = useState<Position[]>([
    { dorsal: 1, x: 50, y: 85 },
    { dorsal: 2, x: 25, y: 65 },
    { dorsal: 3, x: 75, y: 65 },
    { dorsal: 6, x: 50, y: 50 },
    { dorsal: 8, x: 30, y: 45 },
    { dorsal: 7, x: 70, y: 45 },
    { dorsal: 10, x: 50, y: 20 },
    { dorsal: 5, x: 40, y: 70 },
    { dorsal: 9, x: 60, y: 25 },
  ])

  const playerMap = new Map(squad.map((p) => [p.dorsal, p]))

  const handleDragEnd = (dorsal: number, info: any) => {
    const rect = document.querySelector('.tactical-field') as HTMLElement
    if (!rect) return

    const bounds = rect.getBoundingClientRect()
    const x = ((info.x - bounds.left) / bounds.width) * 100
    const y = ((info.y - bounds.top) / bounds.height) * 100

    setPositions((prev) =>
      prev.map((p) =>
        p.dorsal === dorsal ? { ...p, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : p
      )
    )
  }

  return (
    <div className="tactical-wrap">
      <div className="tactical-field">
        <div className="tactical-field__markings" />
        <div className="tactical-field__halfway" />
        <div className="tactical-field__circle" />

        {positions.map((pos) => {
          const player = playerMap.get(pos.dorsal)
          if (!player) return null

          return (
            <motion.div
              key={pos.dorsal}
              className="tactical-token"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              drag
              dragMomentum={false}
              onDragEnd={(_, info) => handleDragEnd(pos.dorsal, info)}
              whileDrag={{ scale: 1.15, zIndex: 10 }}
            >
              <div
                className="tactical-token__dot"
                style={{
                  background: pos.dorsal === 1 ? '#f59e0b' : 'linear-gradient(135deg, #7c3aed, #a855f7)',
                }}
              >
                {pos.dorsal}
              </div>
              <div className="tactical-token__name">{player.nombre}</div>
            </motion.div>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ padding: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: 'var(--tc-text-primary)' }}>
            Formación: 2-3-1
          </h3>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--tc-text-secondary)', lineHeight: 1.5 }}>
            Arrastra los jugadores en el campo para cambiar su posición. El cambio se guardará automáticamente.
          </p>
        </div>

        <div className="tactical-bench">
          {positions.map((pos) => {
            const player = playerMap.get(pos.dorsal)
            if (!player) return null
            return (
              <div key={pos.dorsal} className="tactical-bench__item">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '999px',
                    background: pos.dorsal === 1 ? '#f59e0b' : 'linear-gradient(135deg, #7c3aed, #a855f7)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  {pos.dorsal}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--tc-text-primary)' }}>
                    {player.nombre}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--tc-text-muted)' }}>{player.pos}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
