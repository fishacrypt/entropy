import { toPng } from 'html-to-image'

export const CARD_WIDTH = 1200
export const CARD_HEIGHT = 628

const isSafari = () => /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)

/** Renders the fixed-size card node to a 2x PNG (2400 x 1256). */
export async function renderCardPng(node: HTMLElement): Promise<string> {
  await document.fonts.ready
  const options = {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    pixelRatio: 2,
    cacheBust: true,
    style: { transform: 'none', margin: '0' },
  }
  // Safari can return a blank first render while images and fonts are decoded.
  if (isSafari()) await toPng(node, options)
  return toPng(node, options)
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}
