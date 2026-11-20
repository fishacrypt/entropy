export type HandleResult = { ok: true; handle: string } | { ok: false; error: string }

const HANDLE_PATTERN = /^[A-Za-z0-9_]{1,15}$/

/**
 * Accepts "@name", "name", " @ name ", or a pasted x.com / twitter.com profile URL.
 * Only checks the format. It never claims the account exists or is verified.
 */
export function parseHandle(input: string): HandleResult {
  let value = input.trim().replace(/\s+/g, '')
  const url = /^(?:https?:\/\/)?(?:www\.|mobile\.)?(?:x|twitter)\.com\/([^/?#]+)/i.exec(value)
  if (url) value = url[1]
  value = value.replace(/^@+/, '')

  if (!value) return { ok: false, error: 'Enter your X handle to continue.' }
  if (value.length > 15) return { ok: false, error: 'X handles are 15 characters or fewer.' }
  if (!HANDLE_PATTERN.test(value)) {
    return { ok: false, error: 'Use only letters, numbers and underscores.' }
  }
  return { ok: true, handle: value }
}
