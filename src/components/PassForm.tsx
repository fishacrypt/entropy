import type { FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'

export function PassForm({
  value,
  onChange,
  error,
  busy,
  onSubmit,
}: {
  value: string
  onChange: (v: string) => void
  error: string | null
  busy: boolean
  onSubmit: (e: FormEvent) => void
}) {
  return (
    <form id="generate" onSubmit={onSubmit} noValidate className="scroll-mt-24">
      <label htmlFor="handle" className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/50">
        Your X handle
      </label>
      <div
        className={`mt-3 flex flex-col gap-2 rounded-3xl border bg-coal p-2 transition-colors sm:flex-row sm:items-center sm:rounded-full ${
          error ? 'border-red-400/60' : 'border-paper/15 focus-within:border-paper/60'
        }`}
      >
        <input
          id="handle"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={busy}
          placeholder="@yourusername"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={!!error}
          aria-describedby={error ? 'handle-error' : 'handle-hint'}
          className="min-h-12 w-full min-w-0 flex-1 bg-transparent px-4 font-display text-xl text-paper placeholder:text-paper/25 focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-6 text-[15px] font-semibold text-ink transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-coal disabled:opacity-60"
        >
          {busy ? 'Issuing…' : 'Generate My Pass'}
          {!busy && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />}
        </button>
      </div>
      {error ? (
        <p id="handle-error" role="alert" className="mt-3 px-2 text-sm text-red-300">
          {error}
        </p>
      ) : (
        <p id="handle-hint" className="mt-3 px-2 text-sm text-paper/40">
          No wallet, email or login. Your card is drawn in your browser.
        </p>
      )}
    </form>
  )
}
