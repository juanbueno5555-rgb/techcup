'use client'

import { MSymbol } from './ui'

export interface ManchasState {
  status: 'greeting' | 'helping' | 'celebrating' | 'thinking' | 'party'
  expression: '¡Vamos!' | '¡Genial!' | '¡Increíble!' | '¡Felicidades!' | '¿Dudas?' | '¡En progreso!'
}

export function Manchas({ state = 'greeting' }: { state?: 'greeting' | 'helping' | 'menu' }) {
  const expressions: Record<string, { title: string; icon: string; emoji: string }> = {
    greeting: { title: 'Hola', emoji: '¡Vamos!', icon: 'thumb_up' },
    helping: { title: 'Ayudando', emoji: '¡Genial!', icon: 'hands_clapping' },
    party: { title: 'Celebrando', emoji: '¡Felicidades!', icon: 'celebration' },
  }

  const exp = expressions[state] || expressions.greeting

  return (
    <div
      className="manchas"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        padding: '16px 20px',
        borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(76,29,149,0.1))',
        border: '1px solid var(--tc-border-strong)',
        textAlign: 'center',
      }}
    >
      {/* Mascot avatar */}
      <div
        style={{
          position: 'relative',
          width: 80,
          height: 80,
        }}
      >
        <img
          src="/manchas.png"
          alt="Manchas, la mascota de TechCup"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '999px',
            objectFit: 'cover',
            background: 'linear-gradient(135deg, var(--tc-violeta), var(--tc-morado))',
            boxShadow: 'var(--tc-glow-violet)',
            border: '2px solid var(--tc-border-strong)',
          }}
        />
        {/* Expression badge */}
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 28,
            height: 28,
            borderRadius: '999px',
            background: 'var(--tc-dorado)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            border: '2px solid var(--tc-base)',
            boxShadow: '0 2px 8px rgba(245,158,11,0.3)',
          }}
        >
          {exp.emoji === '¡Vamos!' && '👍'}
          {exp.emoji === '¡Genial!' && '👏'}
          {exp.emoji === '¡Increíble!' && '❤️'}
          {exp.emoji === '¡Felicidades!' && '🎉'}
          {exp.emoji === '¿Dudas?' && '❓'}
          {exp.emoji === '¡En progreso!' && '💻'}
        </span>
      </div>

      <div>
        <p
          style={{
            margin: '0 0 4px',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--tc-text-primary)',
            fontFamily: 'var(--md-ref-typeface-brand)',
          }}
        >
          ¡Hola! Soy Manchas, tu asistente de TechCup.
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'var(--tc-text-secondary)',
          }}
        >
          ¿En qué puedo ayudarte hoy?
        </p>
      </div>
    </div>
  )
}

export function ManchasMenu() {
  const options = [
    { icon: 'groups', label: '¿Cómo creo un equipo?', color: 'var(--tc-violeta-light)' },
    { icon: 'emoji_events', label: '¿Cómo funciona un reto?', color: 'var(--tc-dorado)' },
    { icon: 'build', label: 'Tengo un problema técnico', color: 'var(--tc-live-red)' },
    { icon: 'chat_bubble', label: 'Otra consulta', color: 'var(--tc-text-secondary)' },
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '20px',
      }}
    >
      <Manchas state="greeting" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 10,
        }}
      >
        {options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 16px',
              borderRadius: 16,
              border: '2px solid var(--tc-border-strong)',
              background: 'var(--tc-surface)',
              color: 'var(--tc-text-primary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 150ms ease-out',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = opt.color
              ;(e.currentTarget as HTMLElement).style.background = `color-mix(in srgb, ${opt.color} 10%, var(--tc-surface))`
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--tc-border-strong)'
              ;(e.currentTarget as HTMLElement).style.background = 'var(--tc-surface)'
            }}
          >
            <MSymbol name={opt.icon} size={20} color={opt.color} />
            {opt.label}
          </button>
        ))}
      </div>

      <form
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 8,
        }}
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.currentTarget.querySelector('input') as HTMLInputElement
          if (input.value.trim()) {
            console.log('[v0] Manchas chat:', input.value)
            input.value = ''
          }
        }}
      >
        <input
          type="text"
          placeholder="Escribe tu mensaje…"
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '999px',
            border: '1px solid var(--tc-border-strong)',
            background: 'var(--tc-surface-2)',
            color: 'var(--tc-text-primary)',
            fontFamily: 'inherit',
            fontSize: 13,
            outline: 'none',
            transition: 'border-color 150ms ease-out',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--tc-violeta)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--tc-border-strong)'
          }}
        />
        <button
          type="submit"
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 40,
            height: 40,
            borderRadius: '999px',
            border: 'none',
            background: 'linear-gradient(135deg, var(--tc-violeta), var(--tc-morado))',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: 'var(--tc-glow-violet)',
            transition: 'opacity 150ms ease-out',
          }}
        >
          <MSymbol name="send" size={18} color="#fff" fill />
        </button>
      </form>
    </div>
  )
}
