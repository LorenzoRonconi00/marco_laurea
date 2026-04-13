'use client'

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import TextScreen from './components/TextScreen'
import PhotoScreen from './components/PhotoScreen'
import VideoScreen from './components/VideoScreen'

type ScreenItem =
  | { type: 'text'; icon: string; text: React.ReactNode; subtitle?: string }
  | { type: 'photo'; src: string }
  | { type: 'video'; src: string; isLast?: boolean }

const SEQUENCE: ScreenItem[] = [
  {
    type: 'text',
    icon: '📖',
    text: (
      <>
        Ciao Marco 👋
        <br />
        <span style={{ color: 'var(--gold)' }}>
          Se stai leggendo questo…
        </span>
        <br />
        significa che ce l&apos;hai fatta.
      </>
    ),
    subtitle: 'Ora sono cazzi tuoi a programmare...',
  },
  { type: 'photo', src: '/images/1.jpg' },
  {
    type: 'text',
    icon: '😅',
    text: (
      <>
        Non è stato sempre facile.
        <br />
        <span style={{ color: 'var(--gold)' }}>
          Ci sono stati esami, professori un po&apos; stronzi
        </span>
        <br />
        e progetti copiati…
      </>
    ),
    subtitle: 'Ronconi? Non sappiamo chi sia...',
  },
  { type: 'photo', src: '/images/2.jpg' },
  {
    type: 'text',
    icon: '🥂',
    text: (
      <>
        …ma anche{' '}
        <span style={{ color: 'var(--gold)' }}>
          risate, amici
        </span>{' '}
        e ricordi che resteranno per sempre.
      </>
    ),
  },
  { type: 'photo', src: '/images/3.jpg' },
  {
    type: 'text',
    icon: '🎓',
    text: (
      <>
        Oggi non festeggiamo solo una laurea.
        <br />
        <span style={{ color: 'var(--gold)' }}>
          Festeggiamo il percorso
        </span>
        <br />
        che ti ha portato qui.
      </>
    ),
  },
  { type: 'photo', src: '/images/4.jpg' },
  {
    type: 'text',
    icon: '🎥',
    text: (
      <>
        E ci sono alcune persone
        <br />
        che vogliono{' '}
        <span style={{ color: 'var(--gold)' }}>
          dirti qualcosa.
        </span>
      </>
    ),
    subtitle: 'Premi play e alza il volume. 🔊',
  },
  { type: 'video', src: '/videos/1.mp4' },
  { type: 'video', src: '/videos/2.mp4' },
  { type: 'video', src: '/videos/3.mp4', isLast: true },
]

const TOTAL_SEQUENCE = SEQUENCE.length

function HomeContent() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/song.mp3')
    audio.loop = true
    audio.volume = 0.6
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const current = SEQUENCE[step]
    if (current?.type === 'video') fadeOut(audio)
  }, [step])

  const fadeOut = (audio: HTMLAudioElement) => {
    const fadeStep = 0.05
    const interval = setInterval(() => {
      if (audio.volume > fadeStep) {
        audio.volume = Math.max(0, audio.volume - fadeStep)
      } else {
        audio.volume = 0
        audio.pause()
        clearInterval(interval)
      }
    }, 80)
  }

  const handleStart = () => {
    audioRef.current?.play().catch(() => { })
    setStarted(true)
  }

  const goNext = () => setStep((prev) => prev + 1)

  // ─── Schermata apertura ──────────────────────────────────
  if (!started) {
    return (
      <div
        className="screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          gap: '3rem',
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.8rem' }}>🎓</span>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Un regalo per te
          </p>
        </div>

        <button
          className="btn-avanti"
          onClick={handleStart}
          style={{
            padding: '1.1rem 3.5rem',
            backgroundColor: 'var(--gold)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontFamily: 'Georgia, serif',
          }}
        >
          Inizia
        </button>
      </div>
    )
  }

  // ─── Sequenza principale ─────────────────────────────────
  if (step < TOTAL_SEQUENCE) {
    const current = SEQUENCE[step]

    if (current.type === 'text') {
      return (
        <TextScreen
          key={step}
          screenKey={step}
          icon={current.icon}
          text={current.text}
          subtitle={current.subtitle}
          onNext={goNext}
        />
      )
    }

    if (current.type === 'photo') {
      return (
        <PhotoScreen
          key={step}
          src={current.src}
          onNext={goNext}
        />
      )
    }

    if (current.type === 'video') {
      return (
        <VideoScreen
          key={step}
          src={current.src}
          isLast={current.isLast}
          onNext={goNext}
        />
      )
    }
  }

  // ─── Schermata finale ────────────────────────────────────
  return (
    <div
      className="screen-fade"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        gap: '2rem',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'var(--bg)',
      }}
    >
      <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>🦁🎓</span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1
          style={{
            fontSize: '2.2rem',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
          }}
        >
          Auguri{' '}
          <span style={{ color: 'var(--gold)' }}>Dottor Mufasa</span>
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            letterSpacing: '0.04em',
            fontStyle: 'italic',
          }}
        >
          Siamo fieri di te.
        </p>
      </div>
    </div>
  )
}

const Home = dynamic(() => Promise.resolve(HomeContent), { ssr: false })
export default Home