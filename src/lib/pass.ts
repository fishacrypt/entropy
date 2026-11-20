export const ENTROPY_URL = 'https://entropy.io/'
export const ENTROPY_X_URL = 'https://x.com/entropyIO'
export const CREATOR_PROGRAM_URL = ENTROPY_URL

export interface PassData {
  handle: string
  issued: string
}

export function createPass(handle: string, now: Date = new Date()): PassData {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return { handle, issued: `${y}-${m}-${d}` }
}

export function profileUrl(handle: string): string {
  return `https://x.com/${handle}`
}

export function shareText(siteUrl: string): string {
  return [
    "I'm part of the @entropyIO community.",
    '',
    'Building, contributing, and exploring what\'s possible with Entropy.',
    '',
    `Get your Community Pass: ${siteUrl}`,
    '',
    '#Entropy #Web3',
  ].join('\n')
}

export function xIntentUrl(siteUrl: string): string {
  return `https://x.com/intent/post?text=${encodeURIComponent(shareText(siteUrl))}`
}

/** Font size (px) that fits "@handle" in the given width, within [min, max]. */
export function handleFontSize(handle: string, available: number, max: number, min: number) {
  const len = handle.length + 1
  return Math.max(min, Math.min(max, available / (len * 0.58)))
}
