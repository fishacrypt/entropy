import { forwardRef } from 'react'
import { MarkTile } from './EntropyMark'
import { CARD_HEIGHT, CARD_WIDTH } from '@/lib/exportPng'
import { handleFontSize, type PassData } from '@/lib/pass'

const INK = '#14110d'
const MUTED = '#8a7f6c'

/**
 * The shareable membership card at its fixed export size (1200 x 628, 1.91:1).
 * It is always rendered at this size and scaled with CSS for display, so the
 * exported PNG matches the preview exactly.
 */
export const PassCard = forwardRef<HTMLDivElement, { pass: PassData; qr: string | null }>(function PassCard(
  { pass, qr },
  ref,
) {
  const handleText = `@${pass.handle}`
  const size = handleFontSize(pass.handle, 500, 96, 40)

  return (
    <div
      ref={ref}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 32,
        overflow: 'hidden',
        display: 'flex',
        position: 'relative',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Left: membership information */}
      <div
        style={{
          width: 860,
          height: '100%',
          padding: '52px 56px 44px',
          background: 'linear-gradient(135deg, #F8F0DE 0%, #F1E5CC 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: INK,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <MarkTile size={66} bg="#EBC85C" fg={INK} />
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 34,
                fontWeight: 500,
                letterSpacing: '0.34em',
                lineHeight: 1,
              }}
            >
              ENTROPY
            </div>
          </div>
          <div
            style={{
              background: 'rgba(20,17,13,0.08)',
              borderRadius: 999,
              padding: '16px 28px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 15,
              letterSpacing: '0.16em',
              color: '#4a4338',
              whiteSpace: 'nowrap',
            }}
          >
            ENTROPY MEMBERSHIP CARD
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <div
            style={{
              fontSize: size,
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              flex: 1,
              minWidth: 0,
              paddingBottom: 6,
            }}
          >
            {handleText}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 14,
                letterSpacing: '0.32em',
                color: MUTED,
              }}
            >
              X PROFILE
            </div>
            <div
              style={{
                width: 208,
                height: 208,
                borderRadius: 24,
                background: '#fff',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {qr && <img src={qr} alt="" width={168} height={168} style={{ display: 'block' }} />}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(20,17,13,0.14)',
            paddingTop: 24,
            display: 'flex',
            gap: 48,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {[
            ['ROLE', 'Contributor'],
            ['MEMBERSHIP', 'Entropy Community'],
            ['ISSUED', pass.issued],
          ].map(([label, value]) => (
            <div key={label}>
              <div style={{ fontSize: 14, letterSpacing: '0.22em', color: MUTED }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 500, marginTop: 10, whiteSpace: 'nowrap' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: identity panel */}
      <div
        style={{
          flex: 1,
          height: '100%',
          background: 'linear-gradient(165deg, #3d342a 0%, #1b1713 55%, #0e0c09 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 28px 40px',
          position: 'relative',
        }}
      >
        <MarkTile size={112} bg="#F8F8F6" fg="#0b0b0b" radius={0.28} />
        <div
          style={{
            marginTop: 56,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 19,
            letterSpacing: '0.34em',
            color: '#cbbfa5',
            paddingLeft: '0.34em',
          }}
        >
          STATUS
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#E4B84D',
            lineHeight: 1.05,
          }}
        >
          Creator
        </div>
        <div style={{ width: 72, height: 1, background: 'rgba(255,255,255,0.2)', margin: '26px 0 22px' }} />
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 22,
            color: '#ece6d8',
            maxWidth: 284,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {handleText}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 30,
            textAlign: 'center',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.14em',
            lineHeight: 1.6,
            color: '#8d8574',
          }}
        >
          COMMUNITY-GENERATED
          <br />
          NOT AN OFFICIAL CREDENTIAL
        </div>
      </div>
    </div>
  )
})
