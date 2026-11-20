import { useEffect, useState, type FormEvent } from 'react'
import { useQrDataUrl } from './useQrDataUrl'
import { parseHandle } from '@/lib/handle'
import { createPass, ENTROPY_X_URL, profileUrl, type PassData } from '@/lib/pass'
import { getShareBase } from '@/lib/share'

const ISSUE_MIN_MS = 1700
export const SAMPLE_HANDLE = 'yourusername'

export type Phase = 'idle' | 'issuing' | 'issued'

/** State machine behind the generator: typing, issuing, issued. */
export function usePassFlow() {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [issuedPass, setIssuedPass] = useState<PassData | null>(null)
  const [minElapsed, setMinElapsed] = useState(false)
  const [siteUrl, setSiteUrl] = useState<string | null>(null)

  const parsed = parseHandle(value)
  const displayHandle = issuedPass?.handle ?? (parsed.ok ? parsed.handle : SAMPLE_HANDLE)
  const isSample = !issuedPass && !parsed.ok
  const [today] = useState(() => createPass(SAMPLE_HANDLE).issued)
  const displayPass: PassData = issuedPass ?? { handle: displayHandle, issued: today }

  const qr = useQrDataUrl(isSample ? ENTROPY_X_URL : profileUrl(displayHandle))

  // Resolve the public URL once so Share on X always carries the real site link.
  useEffect(() => {
    let alive = true
    void getShareBase().then((base) => {
      if (alive) setSiteUrl(base)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (phase !== 'issuing') return
    const t = window.setTimeout(() => setMinElapsed(true), ISSUE_MIN_MS)
    return () => window.clearTimeout(t)
  }, [phase])

  // Hold the "issuing" moment for a minimum time, then reveal once the QR is ready.
  const shown: Phase = phase === 'issuing' && minElapsed && qr.current ? 'issued' : phase

  const onChange = (next: string) => {
    setValue(next)
    if (error) setError(null)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (phase !== 'idle') return
    const result = parseHandle(value)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setError(null)
    setValue(`@${result.handle}`)
    setMinElapsed(false)
    setIssuedPass(createPass(result.handle))
    setPhase('issuing')
  }

  const reset = () => {
    setPhase('idle')
    setIssuedPass(null)
    setValue('')
    setError(null)
    setMinElapsed(false)
  }

  return { value, onChange, error, shown, submit, reset, displayPass, isSample, qr: qr.url, siteUrl, issuedPass }
}
