import { EntropyMark } from './EntropyMark'
import { ENTROPY_URL, ENTROPY_X_URL } from '@/lib/pass'

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink px-5 pb-24 pt-10 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-paper/70">
          <EntropyMark className="h-6 w-6" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]">Community initiative</span>
        </div>
        <div className="flex gap-6 text-[13px] text-paper/50">
          <a className="hover:text-paper" href={ENTROPY_URL} target="_blank" rel="noopener noreferrer">
            entropy.io
          </a>
          <a className="hover:text-paper" href={ENTROPY_X_URL} target="_blank" rel="noopener noreferrer">
            @entropyIO
          </a>
        </div>
      </div>
    </footer>
  )
}
