import Link from 'next/link'
import Image from 'next/image'
import { MSymbol, Overline } from '@/components/app/ui'
import { Ambient, Tilt } from '@/components/landing/decor'

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 90,
        paddingBottom: 0,
        minHeight: 640,
      }}
    >
      {/* Deep dark background */}
      <div
        aria-hidden="true"
        className="hero-gradient"
        style={{ position: 'absolute', inset: 0 }}
      />
      {/* Strong purple bloom top-right behind the player */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(55% 70% at 78% 20%, rgba(109,40,217,0.65), transparent 65%)',
        }}
      />
      {/* Gold accent glow bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '5%',
          width: 340,
          height: 180,
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.18), transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Cohesive decorative layer: diagonal lines, glow orbs, particles */}
      <Ambient orbs="violet-gold" />

      {/* Player image — absolute right side, only left edge fades into dark bg */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '58%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        {/* Diagonal gold stripe behind player */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '70%',
            height: '80%',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.13) 0%, transparent 60%)',
            transform: 'skewX(-10deg)',
            pointerEvents: 'none',
          }}
        />
        <Tilt
          max={5}
          style={{
            position: 'relative',
            width: '100%',
            /* Only fade the LEFT edge — right/top/bottom stay open */
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 32%)',
            maskImage: 'linear-gradient(to right, transparent 0%, #000 32%)',
          }}
        >
          <Image
            src="/hero-player.png"
            alt=""
            width={820}
            height={820}
            priority
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'right bottom',
            }}
          />
        </Tilt>
      </div>

      {/* Text content — left side, sits above the player layer */}
      <div className="tc-container" style={{ position: 'relative', zIndex: 2, paddingBottom: 64 }}>
        <div style={{ maxWidth: 560 }}>
          <Overline>El torneo definitivo de la Decanatura</Overline>

          <h1 style={{ margin: '10px 0 18px', lineHeight: 0.85 }}>
            <span
              className="tc-display tc-slant"
              style={{
                display: 'inline-block',
                fontSize: 'clamp(64px, 11vw, 128px)',
                color: '#fff',
                textShadow: '0 4px 40px rgba(0,0,0,0.35)',
              }}
            >
              TECH
              <span style={{ color: 'var(--tc-violeta-light)' }}>CUP</span>
            </span>
          </h1>

          <p
            className="tc-heading"
            style={{
              fontSize: 'clamp(18px, 2.8vw, 26px)',
              lineHeight: 1.2,
              color: '#fff',
              margin: '0 0 16px',
            }}
          >
            Torneos de fútbol de la<br />Decanatura de Ingeniería de Sistemas
          </p>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: 'rgba(248,250,252,0.78)',
              margin: '0 0 32px',
              maxWidth: 420,
            }}
          >
            La competencia que conecta talento, pasión y tecnología.
            Vive la experiencia de representar a tu equipo y dejar huella en la cancha.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 24px',
                borderRadius: 12,
                background: 'linear-gradient(180deg, var(--tc-dorado-light), var(--tc-dorado))',
                color: '#241a00',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 8px 26px rgba(234,179,8,0.35)',
              }}
            >
              Inscribe tu equipo
              <MSymbol name="arrow_forward" size={20} color="#241a00" />
            </Link>

            <Link
              href="/tournaments"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 24px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
              }}
            >
              Ver torneos
              <MSymbol name="arrow_forward" size={20} color="#fff" />
            </Link>
          </div>
        </div>

        {/* Inscripciones abiertas floating card — anchored bottom-right of hero */}
        <div
          style={{
            position: 'absolute',
            right: 24,
            bottom: -16,
            zIndex: 4,
            width: 244,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '16px 20px',
            borderRadius: 16,
            background: 'rgba(10,6,26,0.92)',
            border: '1px solid rgba(124,58,237,0.35)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span
            style={{
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(124,58,237,0.2)',
            }}
          >
            <MSymbol name="calendar_month" size={24} color="var(--tc-violeta-light)" />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="tc-heading" style={{ fontSize: 15, color: '#fff', lineHeight: 1.1 }}>
              Inscripciones<br />abiertas
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 5,
                fontSize: 12,
                color: 'rgba(248,250,252,0.7)',
              }}
            >
              <span className="live-dot" style={{ background: '#22c55e' }} />
              ¡Asegura tu cupo!
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
