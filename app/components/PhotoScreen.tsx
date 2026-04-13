'use client'

import { useState } from 'react'

interface PhotoScreenProps {
    src: string
    onNext: () => void
}

export default function PhotoScreen({ src, onNext }: PhotoScreenProps) {
    const [error, setError] = useState(false)

    return (
        <div
            className="screen-photo"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100dvh',
                width: '100%',
                backgroundColor: 'var(--bg)',
                padding: '2.5rem 2rem',
                gap: '2.5rem',
            }}
        >
            {/* Foto */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '340px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 50px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
                    backgroundColor: '#1a1a1a',
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {error ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', padding: '2rem' }}>
                        Immagine non trovata: {src}
                    </p>
                ) : (
                    <img
                        src={src}
                        alt=""
                        onError={() => setError(true)}
                        style={{
                            width: '100%',
                            display: 'block',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </div>

            {/* Bottone */}
            <button
                className="btn-avanti"
                onClick={onNext}
                style={{
                    padding: '1rem 3.5rem',
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
                Avanti
            </button>
        </div>
    )
}