import { useState, type FormEvent } from 'react'
import { signal } from '../content/closing'
import { links } from '../content/site'

type Status = 'idle' | 'sending' | 'sent' | 'failed'

const field =
  'min-h-12 w-full rounded-sm border-2 border-slate bg-ink px-3 py-2 text-base text-paper placeholder:text-fog/70 focus:border-signal focus:outline-none'

/** A plain contact form for visitors without a mail app. Works with no server of my own. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const { form } = signal

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const data = Object.fromEntries(new FormData(formElement))
    // A hidden field that people never fill in; bots usually do.
    if (data._honey) return
    setStatus('sending')
    try {
      const res = await fetch(`${form.endpoint}${links.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: form.subject, _template: 'table', _captcha: 'false' }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || String(body.success) === 'false') throw new Error(body.message ?? res.statusText)
      setStatus('sent')
      formElement.reset()
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <p role="status" className="border-2 border-black bg-signal px-4 py-4 text-base font-semibold text-night shadow-[3px_3px_0_#000]">
        {form.sent}
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-3 border-[3px] border-black bg-gunmetal/95 p-4 shadow-[5px_5px_0_#000] sm:p-5">
      <div className="grid gap-0.5">
        <h3 className="comic-heading m-0 text-3xl leading-none text-paper">{form.title}</h3>
        <p className="m-0 text-sm text-fog">{form.note}</p>
      </div>
      <label className="grid gap-1 text-sm font-semibold text-paper">
        Your name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-paper">
        Your email
        <input name="email" type="email" required autoComplete="email" inputMode="email" className={field} />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-paper">
        Message
        <textarea name="message" required rows={4} className={`${field} resize-y`} />
      </label>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-black bg-signal px-4 text-base font-bold text-night shadow-[3px_3px_0_#000] hover:bg-cream disabled:opacity-70"
      >
        {status === 'sending' ? form.sending : form.send}
      </button>
      {status === 'failed' && (
        <p role="alert" className="m-0 text-base text-paper">
          {form.failed}{' '}
          <a href={`mailto:${links.email}`} className="font-semibold text-signal underline">{links.email}</a>
        </p>
      )}
    </form>
  )
}
