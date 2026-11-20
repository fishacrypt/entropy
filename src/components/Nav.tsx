import { EntropyMark } from './EntropyMark'
import { CREATOR_PROGRAM_URL, ENTROPY_URL } from '@/lib/pass'

const linkClass =
  'inline-flex min-h-11 items-center text-[13px] text-paper/60 transition-colors hover:text-paper focus-visible:text-paper focus-visible:outline-none'

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="flex min-h-11 items-center gap-3 text-paper"
          aria-label="Entropy Community Pass, back to top"
        >
          <EntropyMark className="h-7 w-7" />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50 sm:inline">
            Entropy Community Pass
          </span>
        </a>
        <div className="flex items-center gap-4 sm:gap-7">
          <a href={CREATOR_PROGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Creator Program
          </a>
          <a
            href={ENTROPY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-paper/20 px-4 text-[13px] text-paper transition-colors hover:border-paper/60 hover:bg-paper/5"
          >
            Visit Entropy
          </a>
        </div>
      </nav>
    </header>
  )
}
