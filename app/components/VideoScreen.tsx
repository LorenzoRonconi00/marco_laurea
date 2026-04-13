'use client'

import { useRef, useState, useEffect } from 'react'

interface VideoScreenProps {
    src: string
    onNext: () => void
    isLast?: boolean
}

export default function VideoScreen({ src, onNext, isLast = false }: VideoScreenProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [playing, setPlaying] = useState(false)

    // Ascolta l'uscita dal fullscreen tramite document
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setPlaying(false)
                try {
                    screen.orientation.unlock()
                } catch {
                    // Silenzioso
                }
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }
    }, [])

    const handlePlay = async () => {
        const video = videoRef.current
        if (!video) return

        if (video.paused) {
            await video.play()
            setPlaying(true)

            try {
                await (screen.orientation as any).lock('landscape')
            } catch {
                // Silenzioso
            }

            try {
                if (video.requestFullscreen) {
                    await video.requestFullscreen()
                } else if ((video as any).webkitEnterFullscreen) {
                    ; (video as any).webkitEnterFullscreen()
                }
            } catch {
                // Silenzioso
            }
        } else {
            video.pause()
            setPlaying(false)
        }
    }

    const handleEnded = async () => {
        setPlaying(false)
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen()
            }
            screen.orientation.unlock()
        } catch {
            // Silenzioso
        }
    }

    return (
        <div
            className="screen"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100dvh',
                width: '100%',
                backgroundColor: 'var(--bg)',
                padding: '2rem',
                gap: '2rem',
            }}
        >
            <p
                style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                }}
            >
                Un messaggio per te
            </p>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '360px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
                    backgroundColor: '#000',
                    cursor: 'pointer',
                }}
                onClick={handlePlay}
            >
                <video
                    ref={videoRef}
                    src={src}
                    preload="metadata"
                    playsInline
                    onEnded={handleEnded}
                    style={{
                        width: '100%',
                        display: 'block',
                    }}
                />

                {!playing && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.35)',
                        }}
                    >
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--gold)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderTop: '12px solid transparent',
                                    borderBottom: '12px solid transparent',
                                    borderLeft: '20px solid #000',
                                    marginLeft: '4px',
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <button
                className="btn-avanti"
                onClick={onNext}
                style={{
                    padding: '1rem 3rem',
                    backgroundColor: 'var(--gold)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                }}
            >
                {isLast ? 'Finale 🎉' : 'Avanti'}
            </button>
        </div>
    )
}