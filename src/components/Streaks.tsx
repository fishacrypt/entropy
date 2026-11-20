import { useMemo } from 'react'

// Deterministic pseudo-random so streaks are stable between renders.
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function Streaks({ count = 36 }: { count?: number }) {
  const streaks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i / count) * 100 + rand(i + 1) * (100 / count)}%`,
        height: `${12 + rand(i + 7) * 38}%`,
        top: `${rand(i + 13) * 60}%`,
        duration: `${12 + rand(i + 21) * 16}s`,
        delay: `${-rand(i + 31) * 20}s`,
        opacity: 0.12 + rand(i + 41) * 0.4,
      })),
    [count],
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {streaks.map((s, i) => (
        <span
          key={i}
          className="streak"
          style={
            {
              left: s.left,
              top: s.top,
              height: s.height,
              '--streak-d': s.duration,
              '--streak-delay': s.delay,
              '--streak-o': s.opacity,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,#080808_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  )
}
