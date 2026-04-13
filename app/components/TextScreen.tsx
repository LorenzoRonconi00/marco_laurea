interface TextScreenProps {
    icon?: string
    text: React.ReactNode
    subtitle?: string
    onNext: () => void
    screenKey: number
}

export default function TextScreen({
    icon,
    text,
    subtitle,
    onNext,
}: TextScreenProps) {
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
                padding: '2.5rem 2rem',
                backgroundColor: 'var(--bg)',
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.75rem',
                    maxWidth: '340px',
                    width: '100%',
                }}
            >
                {/* Icona */}
                {icon && (
                    <span
                        style={{
                            fontSize: '1.8rem',
                            filter: 'drop-shadow(0 2px 8px rgba(240,165,0,0.3))',
                        }}
                    >
                        {icon}
                    </span>
                )}

                {/* Testo principale */}
                <h1
                    style={{
                        fontSize: '2rem',
                        fontStyle: 'italic',
                        lineHeight: 1.4,
                        color: 'var(--text-primary)',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                    }}
                >
                    {text}
                </h1>

                {/* Sottotitolo opzionale */}
                {subtitle && (
                    <p
                        style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                            fontStyle: 'normal',
                            fontFamily: 'Georgia, serif',
                            maxWidth: '280px',
                        }}
                    >
                        {subtitle}
                    </p>
                )}

                {/* Bottone */}
                <button
                    className="btn-avanti"
                    onClick={onNext}
                    style={{
                        marginTop: '0.5rem',
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
        </div>
    )
}