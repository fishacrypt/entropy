import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PassCard } from './PassCard'
import { PassCardStacked } from './PassCardStacked'
import { EntropyMark } from './EntropyMark'
import { CARD_HEIGHT, CARD_WIDTH } from '@/lib/exportPng'
import type { PassData } from '@/lib/pass'
import type { Phase } from '@/hooks/usePassFlow'

const STEPS = ['Reserving your handle', 'Encoding your QR code', 'Printing your pass']

/** Displays the fixed-size landscape card scaled to its container width. */
function ScaledCard({ pass, qr }: { pass: PassData; qr: string | null }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const update = () => setScale(el.clientWidth / CARD_WIDTH)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={box} className="relative w-full" style={{ height: CARD_HEIGHT * scale }}>
      <div style={{ width: CARD_WIDTH, height: CARD_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <PassCard pass={pass} qr={qr} />
      </div>
    </div>
  )
}

function IssuingOverlay() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 520)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div role="status" aria-live="polite" className="absolute inset-0 z-10 overflow-hidden rounded-[22px] bg-ink/80 sm:rounded-[28px]">
      <div className="absolute inset-0 flex items-center justify-center text-paper/10">
        <EntropyMark className="h-28 w-28" />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/3 border-b border-paper/70 bg-gradient-to-b from-transparent to-paper/20"
        style={{ animation: 'scan 1.3s cubic-bezier(.5,0,.5,1) infinite alternate' }}
      />
      <div className="absolute inset-x-0 bottom-5 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70">
        <span style={{ animation: 'blink 1s steps(2) infinite' }}>&#9632;</span> {STEPS[step]}
      </div>
    </div>
  )
}

/**
 * The hero card: a live preview while typing, an issuing moment, then the issued pass.
 * Also holds the off-screen, fixed-size copy used for PNG export.
 */
export const CardStage = forwardRef<
  HTMLDivElement,
  { pass: PassData; qr: string | null; phase: Phase; isSample: boolean }
>(function CardStage({ pass, qr, phase, isSample }, exportRef) {
  const reduce = useReducedMotion()
  const issued = phase === 'issued'

  return (
    <div>
      <div className="relative">
        <motion.div
          key={issued ? 'issued' : 'draft'}
          initial={
            reduce
              ? false
              : issued
                ? { clipPath: 'inset(0 0 100% 0)', y: -36, opacity: 0.4 }
                : { opacity: 0, y: 20 }
          }
          animate={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
          transition={{ duration: issued ? 1 : 0.9, delay: issued ? 0.05 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[22px] shadow-[0_50px_120px_-40px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.06)] sm:rounded-[32px]"
          style={{ opacity: phase === 'issuing' ? 0.9 : undefined }}
        >
          <div className="hidden md:block">
            <ScaledCard pass={pass} qr={qr} />
          </div>
          <div className="mx-auto max-w-[420px] md:hidden">
            <PassCardStacked pass={pass} qr={qr} />
          </div>
        </motion.div>
        {phase === 'issuing' && <IssuingOverlay />}
      </div>

      <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-paper/40">
        {issued
          ? `Issued ${pass.issued}`
          : phase === 'issuing'
            ? 'Issuing'
            : isSample
              ? 'Live preview. Type your handle'
              : 'Live preview'}
      </p>

      {/* Fixed-size copy used only for PNG export. Never shown. */}
      <div aria-hidden style={{ position: 'fixed', left: -99999, top: 0, pointerEvents: 'none' }}>
        <PassCard ref={exportRef} pass={pass} qr={qr} />
      </div>
    </div>
  )
})
