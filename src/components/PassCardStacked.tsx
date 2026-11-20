import { MarkTile } from './EntropyMark'
import { handleFontSize, type PassData } from '@/lib/pass'

const INK = '#14110d'
const MUTED = '#8a7f6c'

/**
 * Mobile preview of the pass. Same two panels and the same content as the
 * landscape card, stacked so the handle and QR stay large on narrow screens.
 * The downloaded PNG always uses the landscape card.
 */
export function PassCardStacked({ pass, qr }: { pass: PassData; qr: string | null }) {
  const handleText = `@${pass.handle}`
  const size = handleFontSize(pass.handle, 290, 52, 26)

  return (
    <div className="overflow-hidden rounded-[28px] font-display shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="p-6 pb-5" style={{ background: 'linear-gradient(135deg, #F8F0DE 0%, #F1E5CC 100%)', color: INK }}>
        <div className="flex items-center gap-3">
          <MarkTile size={44} bg="#EBC85C" fg={INK} />
          <div
            className="font-mono text-[18px] font-medium leading-none tracking-[0.3em]"
          >
            ENTROPY
          </div>
        </div>
        <div
          className="mt-4 inline-block rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.16em]"
          style={{ background: 'rgba(20,17,13,0.08)', color: '#4a4338' }}
        >
          ENTROPY MEMBERSHIP CARD
        </div>

        <div
          className="mt-8 overflow-hidden whitespace-nowrap font-bold"
          style={{ fontSize: size, letterSpacing: '-0.035em', lineHeight: 1.1 }}
        >
          {handleText}
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="space-y-3 font-mono">
            {[
              ['ROLE', 'Contributor'],
              ['MEMBERSHIP', 'Entropy Community'],
              ['ISSUED', pass.issued],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[9px] tracking-[0.22em]" style={{ color: MUTED }}>
                  {label}
                </div>
                <div className="mt-0.5 text-[13px] font-medium">{value}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="font-mono text-[9px] tracking-[0.3em]" style={{ color: MUTED }}>
              X PROFILE
            </div>
            <div className="grid h-[124px] w-[124px] place-items-center rounded-2xl bg-white">
              {qr && <img src={qr} alt="QR code linking to your X profile" className="h-[100px] w-[100px]" />}
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center px-6 pb-6 pt-7 text-center"
        style={{ background: 'linear-gradient(165deg, #3d342a 0%, #1b1713 55%, #0e0c09 100%)' }}
      >
        <MarkTile size={64} bg="#F8F8F6" fg="#0b0b0b" radius={0.28} />
        <div className="mt-6 pl-[0.3em] font-mono text-[12px] tracking-[0.3em]" style={{ color: '#cbbfa5' }}>
          STATUS
        </div>
        <div className="mt-2 text-[40px] font-bold leading-none tracking-[-0.03em] text-gold">Creator</div>
        <div className="my-4 h-px w-14 bg-white/20" />
        <div className="max-w-full overflow-hidden whitespace-nowrap font-mono text-[15px] text-[#ece6d8]">
          {handleText}
        </div>
        <div className="mt-5 font-mono text-[9px] leading-relaxed tracking-[0.14em]" style={{ color: '#8d8574' }}>
          COMMUNITY-GENERATED, NOT AN OFFICIAL CREDENTIAL
        </div>
      </div>
    </div>
  )
}
