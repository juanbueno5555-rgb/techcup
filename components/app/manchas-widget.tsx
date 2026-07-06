'use client'

import { useState } from 'react'
import { MSymbol } from './ui'

type ManchasExpression = 'default' | 'vamos' | 'genial' | 'increible' | 'felicidades' | 'dudas' | 'progreso'

interface Option {
  icon: string
  label: string
  desc: string
}

const OPTIONS: Option[] = [
  { icon: 'people', label: '¿Cómo creo un equipo?', desc: 'Crear equipo' },
  { icon: 'trophy', label: '¿Cómo funciona un reto?', desc: 'Entender reto' },
  { icon: 'build', label: 'Tengo un problema técnico', desc: 'Problema técnico' },
  { icon: 'chat', label: 'Otra consulta', desc: 'Otra consulta' },
]

const EXPRESSIONS: Record<ManchasExpression, { text: string; emoji: string }> = {
  default: { text: '¡Hola! 👋', emoji: '👋' },
  vamos: { text: '¡Vamos!', emoji: '💪' },
  genial: { text: '¡Genial!', emoji: '🎉' },
  increible: { text: '¡Increíble!', emoji: '❤️' },
  felicidades: { text: '¡Felicidades!', emoji: '🎊' },
  dudas: { text: '¿Dudas?', emoji: '❓' },
  progreso: { text: '¡En progreso!', emoji: '⚙️' },
}

export function HelpWidget() {
  const [open, setOpen] = useState(false)
  const [expression, setExpression] = useState<ManchasExpression>('default')
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const handleOptionClick = (option: Option) => {
    setSelectedChat(option.label)
    setExpression('genial')
    setTimeout(() => {
      setExpression('default')
    }, 2000)
  }

  const close = () => {
    setOpen(false)
    setSelectedChat(null)
    setExpression('default')
  }

  return (
    <>
      {/* Help Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="help-widget-fab"
          aria-label="Abrir ayuda con Manchas"
          title="¿Necesitas ayuda?"
        >
          <img src="/manchas.png" alt="Manchas" style={{ width: 40, height: 40, borderRadius: '999px', objectFit: 'cover' }} />
        </button>
      )}

      {/* Modal - Panel de Ayuda */}
      {open && (
        <div className="help-widget-overlay" onClick={close} />
      )}

      <div className={`help-widget-panel ${open ? 'help-widget-panel--open' : ''}`}>
        {/* Header con Manchas */}
        <div className="help-widget-header">
          <div className="help-widget-manchas">
            <div className="help-widget-manchas__avatar">
              <img src="/manchas.png" alt="Manchas" style={{ width: '100%', height: '100%', borderRadius: '999px', objectFit: 'cover' }} />
            </div>
            <div className="help-widget-manchas__expression">
              {EXPRESSIONS[expression].emoji}
            </div>
          </div>
          <button
            onClick={close}
            className="help-widget-close"
            aria-label="Cerrar ayuda"
          >
            ✕
          </button>
        </div>

        {/* Body - Menú o Conversación */}
        {!selectedChat ? (
          <div className="help-widget-body">
            <div className="help-widget-greeting">
              <h3 className="help-widget-title">¿Necesitas ayuda?</h3>
              <p className="help-widget-subtitle">
                Nuestro equipo está aquí para ti
              </p>
            </div>

            <div className="help-widget-options">
              {OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(opt)}
                  className="help-widget-option"
                  type="button"
                >
                  <MSymbol name={opt.icon} size={20} />
                  <span className="help-widget-option__text">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="help-widget-input">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="help-widget-input__field"
              />
              <button
                type="button"
                className="help-widget-input__send"
                aria-label="Enviar"
              >
                <MSymbol name="send" size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="help-widget-body help-widget-body--chat">
            <div className="help-widget-message help-widget-message--bot">
              <div className="help-widget-message__avatar">
                <img src="/manchas.png" alt="Manchas" style={{ width: '100%', height: '100%', borderRadius: '999px', objectFit: 'cover' }} />
              </div>
              <div className="help-widget-message__bubble">
                <p>
                  ¡Hola! Soy Manchas, tu asistente de TechCup. ¿En qué puedo
                  ayudarte hoy?
                </p>
              </div>
            </div>

            <div className="help-widget-message help-widget-message--user">
              <div className="help-widget-message__bubble">
                <p>{selectedChat}</p>
              </div>
            </div>

            <div className="help-widget-message help-widget-message--bot">
              <div className="help-widget-message__avatar">
                <img src="/manchas.png" alt="Manchas" style={{ width: '100%', height: '100%', borderRadius: '999px', objectFit: 'cover' }} />
              </div>
              <div className="help-widget-message__bubble">
                <p>
                  Con gusto te ayudo. Para más información detallada, te
                  recomiendo visitar la sección de Noticias o contactar al
                  equipo administrativo. ¿Hay algo más que pueda hacer por ti?
                </p>
              </div>
            </div>

            <div className="help-widget-input">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="help-widget-input__field"
              />
              <button
                type="button"
                className="help-widget-input__send"
                aria-label="Enviar"
              >
                <MSymbol name="send" size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
