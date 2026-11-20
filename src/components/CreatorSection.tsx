import { motion, useReducedMotion } from 'framer-motion'
import { CREATOR_PROGRAM_URL } from '@/lib/pass'

export function CreatorSection() {
  const reduce = useReducedMotion()
  return (
    <section className="border-t border-paper/10 bg-ink px-5 py-24 sm:px-8 sm:py-28">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.2fr_1fr] md:items-end"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ash">Creator Program</p>
          <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            More than a community. Become a creator.
          </h2>
        </div>
        <div>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-paper/60">
            Entropy is building an ecosystem where community members can contribute, create, share ideas, and
            help shape what&rsquo;s next.
          </p>
          <a
            href={CREATOR_PROGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/25 px-6 text-[15px] text-paper transition-colors hover:border-paper/60 hover:bg-paper/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/60"
          >
            Explore the Entropy Creator Program
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              &rarr;
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
