import { useEffect, useState, type CSSProperties } from 'react'

/**
 * The Entropy "iO" mark.
 *
 * To use the official artwork, save a transparent-background SVG of the mark to
 * `public/brand/entropy-mark.svg`. It is picked up automatically and recoloured
 * (black on the cream tile, white-on-black on the identity panel). Until that file
 * exists, a vector redraw of the mark is shown instead.
 */
const OFFICIAL_SVG = '/brand/entropy-mark.svg'

interface OfficialMark {
  viewBox: string
  inner: string
}

let officialPromise: Promise<OfficialMark | null> | undefined

function loadOfficial(): Promise<OfficialMark | null> {
  officialPromise ??= fetch(OFFICIAL_SVG)
    .then(async (res) => {
      const type = res.headers.get('content-type') ?? ''
      if (!res.ok || !type.includes('svg')) return null
      const doc = new DOMParser().parseFromString(await res.text(), 'image/svg+xml')
      const svg = doc.querySelector('svg')
      if (!svg || doc.querySelector('parsererror')) return null
      svg.querySelectorAll('script, foreignObject').forEach((n) => n.remove())
      const viewBox =
        svg.getAttribute('viewBox') ?? `0 0 ${svg.getAttribute('width') ?? 100} ${svg.getAttribute('height') ?? 100}`
      return { viewBox, inner: svg.innerHTML }
    })
    .catch(() => null)
  return officialPromise
}

function useOfficialMark(): OfficialMark | null {
  const [mark, setMark] = useState<OfficialMark | null>(null)
  useEffect(() => {
    let alive = true
    void loadOfficial().then((m) => {
      if (alive) setMark(m)
    })
    return () => {
      alive = false
    }
  }, [])
  return mark
}

export function EntropyMark({
  className,
  style,
  title = 'Entropy',
}: {
  className?: string
  style?: CSSProperties
  title?: string
}) {
  const official = useOfficialMark()

  if (official) {
    return (
      <svg
        viewBox={official.viewBox}
        className={`entropy-official-mark ${className ?? ''}`}
        style={style}
        role="img"
        aria-label={title}
        fill="currentColor"
        dangerouslySetInnerHTML={{ __html: official.inner }}
      />
    )
  }

  return (
    <svg
      viewBox="61 64 280 280"
      className={className}
      style={style}
      role="img"
      aria-label={title}
      fill="currentColor"
      fillRule="evenodd"
    >
      <path d="M83 115H121V145H83Z" />
      <path d="M83 153H121V296H101L83 278Z" />
      <path d="M168 113H268Q320 113 320 165V240L276 285H186Q143 285 143 242V150ZM180 150H283V232H180Z" />
    </svg>
  )
}

/** Logo tile: the mark centred in a rounded square. */
export function MarkTile({
  size,
  bg,
  fg,
  radius = 0.26,
}: {
  size: number
  bg: string
  fg: string
  radius?: number
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * radius,
        background: bg,
        color: fg,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      <EntropyMark style={{ width: size * 0.72, height: size * 0.72 }} />
    </div>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-tight ${className ?? ''}`}>
      entropy<span className="text-paper/60">.io</span>
    </span>
  )
}
