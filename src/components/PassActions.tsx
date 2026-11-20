import { useState, type RefObject } from 'react'
import { Download, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { downloadDataUrl, renderCardPng } from '@/lib/exportPng'
import { xIntentUrl, type PassData } from '@/lib/pass'

function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const btn =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink'

export function PassActions({
  pass,
  exportRef,
  siteUrl,
  onReset,
}: {
  pass: PassData
  exportRef: RefObject<HTMLDivElement | null>
  siteUrl: string | null
  onReset: () => void
}) {
  const [busy, setBusy] = useState(false)

  const download = async () => {
    if (!exportRef.current || busy) return
    setBusy(true)
    try {
      const png = await renderCardPng(exportRef.current)
      downloadDataUrl(png, `entropy-pass-${pass.handle}.png`)
      toast.success('Pass downloaded. Attach it to your post on X.')
    } catch {
      toast.error('Could not export the pass. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/50">Pass issued to @{pass.handle}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => void download()}
          disabled={busy}
          className={`${btn} bg-paper text-ink hover:bg-white disabled:opacity-60`}
        >
          <Download className="h-4 w-4" aria-hidden />
          {busy ? 'Preparing PNG…' : 'Download Pass'}
        </button>
        <a
          href={siteUrl ? xIntentUrl(siteUrl) : undefined}
          aria-disabled={!siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} border border-paper/30 text-paper hover:border-paper hover:bg-paper/5 ${siteUrl ? '' : 'pointer-events-none opacity-60'}`}
        >
          <XGlyph className="h-4 w-4" />
          Share on X
        </a>
        <button type="button" onClick={onReset} className={`${btn} text-paper/60 hover:text-paper`}>
          <RotateCcw className="h-4 w-4" aria-hidden />
          Generate Another Pass
        </button>
      </div>
      <p className="mt-4 max-w-md text-sm text-paper/40">
        X can&rsquo;t attach images from a link, so download your pass first and add it to your post.
      </p>
    </div>
  )
}
