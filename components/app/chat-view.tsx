'use client'

import { useState, useRef, useEffect } from 'react'
import { MSymbol } from './ui'
import { ManchasMenu } from './manchas'
import { conversations as seed } from '@/lib/data'
import type { Conversation, ChatMessage } from '@/lib/data'

export function ChatView() {
  const [convos, setConvos] = useState<Conversation[]>(seed)
  const [activeId, setActiveId] = useState<string>(seed[0].id)
  const [showThreadMobile, setShowThreadMobile] = useState(false)
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const active = convos.find((c) => c.id === activeId) ?? convos[0]

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active.mensajes.length, activeId])

  function openConvo(id: string) {
    setActiveId(id)
    setShowThreadMobile(true)
    setConvos((prev) => prev.map((c) => (c.id === id ? { ...c, noLeidos: 0 } : c)))
  }

  function send(e: React.FormEvent) {
    e.preventDefault()
    const texto = draft.trim()
    if (!texto) return
    const msg: ChatMessage = {
      id: `local-${Date.now()}`,
      autor: 'Tú',
      texto,
      propio: true,
    }
    setConvos((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, mensajes: [...c.mensajes, msg] } : c)),
    )
    setDraft('')
  }

  return (
    <main className="app-page" style={{ maxWidth: 1160 }}>
      <div style={{ paddingBottom: 8 }}>
        <div className={`chat-shell${showThreadMobile ? ' chat-shell--thread' : ''}`}>
          {/* Conversation list */}
          <aside className="chat-list" aria-label="Conversaciones">
            {convos.map((c) => {
              const last = c.mensajes[c.mensajes.length - 1]
              const isActive = c.id === activeId
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => openConvo(c.id)}
                  className={`chat-list__item${isActive ? ' chat-list__item--active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="chat-list__avatar">
                    <MSymbol name={c.icon} size={22} color="var(--tc-violeta-light)" />
                  </span>
                  <span className="chat-list__body">
                    <span className="chat-list__top">
                      <span className="chat-list__title">{c.titulo}</span>
                      {c.noLeidos > 0 && <span className="chat-list__badge">{c.noLeidos}</span>}
                    </span>
                    <span className="chat-list__preview">
                      {last ? `${last.propio ? 'Tú: ' : ''}${last.texto}` : c.subtitulo}
                    </span>
                  </span>
                </button>
              )
            })}
          </aside>

          {/* Thread */}
          <section className="chat-thread" aria-label={`Conversación: ${active.titulo}`}>
            <header className="chat-thread__head">
              <button
                type="button"
                className="chat-thread__back"
                onClick={() => setShowThreadMobile(false)}
                aria-label="Volver a conversaciones"
              >
                <MSymbol name="arrow_back" size={22} />
              </button>
              <span className="chat-list__avatar">
                <MSymbol name={active.icon} size={20} color="var(--tc-violeta-light)" />
              </span>
              <span style={{ minWidth: 0 }}>
                <span className="chat-thread__title">{active.titulo}</span>
                <span className="chat-thread__sub">{active.subtitulo}</span>
              </span>
            </header>

            <div className="chat-thread__body">
              {/* Show Manchas menu only in support chat when conversation is fresh */}
              {active.id === 'c2' && active.mensajes.length <= 1 && (
                <ManchasMenu />
              )}

              {active.mensajes.map((m) => (
                <div key={m.id} style={{ display: 'flex', gap: 8 }}>
                  {!m.propio && (
                    <img
                      src="/manchas.png"
                      alt="Manchas"
                      width={32}
                      height={32}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '999px',
                        objectFit: 'cover',
                        background: 'linear-gradient(135deg, var(--tc-violeta), var(--tc-morado))',
                        border: '1px solid var(--tc-border-strong)',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div
                    className={`chat-bubble${m.propio ? ' chat-bubble--own' : ''}`}
                  >
                    {!m.propio && <span className="chat-bubble__author">{m.autor}</span>}
                    <span className="chat-bubble__text">{m.texto}</span>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <form className="chat-composer" onSubmit={send}>
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Escribe un mensaje…"
                aria-label="Escribe un mensaje"
                className="chat-composer__input"
              />
              <button
                type="submit"
                className="chat-composer__send"
                aria-label="Enviar mensaje"
                disabled={!draft.trim()}
              >
                <MSymbol name="send" size={20} color="#fff" fill />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}
