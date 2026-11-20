import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export interface QrState {
  /** Latest generated QR (may briefly lag `text` while a new one renders). */
  url: string | null
  /** True once `url` encodes exactly the requested text. */
  current: boolean
}

/** Generates a high-resolution QR code data URL for the given text. */
export function useQrDataUrl(text: string): QrState {
  const [state, setState] = useState<{ text: string; url: string } | null>(null)

  useEffect(() => {
    let cancelled = false
    QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 0,
      width: 640,
      color: { dark: '#111111', light: '#FFFFFF' },
    })
      .then((url) => {
        if (!cancelled) setState({ text, url })
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [text])

  return { url: state?.url ?? null, current: state?.text === text }
}
