import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Streaks } from './Streaks'
import { Wordmark } from './EntropyMark'
import { PassForm } from './PassForm'
import { PassActions } from './PassActions'
import { CardStage } from './CardStage'
import { usePassFlow } from '@/hooks/usePassFlow'
import { CREATOR_PROGRAM_URL } from '@/lib/pass'

export function Hero() {
  const reduce = useReducedMotion()
  const flow = usePassFlow()
  const exportRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const { shown } = flow

  // On stacked layouts the card sits below the form, so bring it into view.
  useEffect(() => {
    if (shown === 'idle' || window.innerWidth >= 1024) return
    stageRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }, [shown, reduce])

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <Streaks />
      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-[1360px] items-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <motion.div {...fade(0.05)} className="mb-7 flex items-center gap-3 text-paper">
            <Wordmark className="text-2xl" />
            <span className="h-px w-8 bg-paper/25" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/45">Community Pass</span>
          </motion.div>

          <motion.h1
            {...fade(0.12)}
            className="text-balance font-display text-[clamp(2.6rem,5.4vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-paper"
          >
            Your place in the Entropy community.
          </motion.h1>

          <motion.p {...fade(0.22)} className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-paper/60">
            You&rsquo;re part of the journey. The angle is up to you. Create your personalised Entropy Contributor
            Card and let the community know you&rsquo;re here.
          </motion.p>

          <motion.div {...fade(0.32)} className="mt-9 max-w-lg">
            {shown === 'issued' && flow.issuedPass ? (
              <PassActions
                pass={flow.issuedPass}
                exportRef={exportRef}
                siteUrl={flow.siteUrl}
                onReset={flow.reset}
              />
            ) : (
              <PassForm
                value={flow.value}
                onChange={flow.onChange}
                error={flow.error}
                busy={shown === 'issuing'}
                onSubmit={flow.submit}
              />
            )}
            <a
              href={CREATOR_PROGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] text-paper/60 underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
            >
              Explore the Creator Program <span aria-hidden>&rarr;</span>
            </a>
          </motion.div>
        </div>

        <div ref={stageRef} className="min-w-0 lg:col-span-7">
          <CardStage
            ref={exportRef}
            pass={flow.displayPass}
            qr={flow.qr}
            phase={shown}
            isSample={flow.isSample}
          />
          <p className="mx-auto mt-6 max-w-md text-pretty text-center text-xs leading-relaxed text-paper/30">
            A community-generated commemorative pass. It is not an officially verified Entropy credential, and this
            site does not confirm that an X account exists or belongs to you.
          </p>
        </div>
      </div>
    </section>
  )
}
