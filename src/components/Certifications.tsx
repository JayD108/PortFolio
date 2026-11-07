import { useRef, useState } from 'react'
import { certifications, certificationsCopy, type Certification } from '../content/certifications'
import { person } from '../content/site'
import { ChapterHeader, Reveal } from './Comic'

function Medal() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-7 shrink-0 text-signal" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5.5" />
      <path d="m9 14-1.5 7.5L12 19l4.5 2.5L15 14" />
    </svg>
  )
}

function CredentialLink({ item }: { item: Certification }) {
  if (!item.credentialUrl) return null
  return (
    <a
      href={item.credentialUrl}
      className="inline-flex min-h-11 w-fit items-center rounded-sm border-2 border-paper bg-ink px-3 text-[0.9375rem] font-semibold text-paper hover:border-signal hover:text-signal"
    >
      {certificationsCopy.linkLabel}
      <span className="sr-only">: {item.name}</span>
      <span aria-hidden="true" className="pl-1">↗</span>
    </a>
  )
}

/** Certifications: name, issuer, date and a credential link. Cards with an image open the certificate full size. */
export function Certifications() {
  const list = certifications.filter((item) => item.name.trim() && item.issuer.trim())
  const dialog = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState<Certification | null>(null)
  if (!list.length) return null

  const open = (item: Certification) => {
    setShown(item)
    dialog.current?.showModal()
  }
  const close = () => dialog.current?.close()

  return (
    <section id="certifications" aria-labelledby="certs-title" className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6 px-2 py-10 sm:px-4 md:py-20">
      <ChapterHeader id="certs-title" chapter={certificationsCopy.chapter} title={certificationsCopy.title} />
      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
        {list.map((item) => (
          <li key={item.name}>
            <Reveal>
              <article className="story-panel panel-frame flex h-full flex-col gap-3 bg-gunmetal p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Medal />
                  <div className="grid gap-1">
                    <h3 className="m-0 text-lg font-bold leading-snug text-paper">{item.name}</h3>
                    <p className="m-0 text-base text-fog">
                      {item.issuer}
                      {item.date && <> · <time>{item.date}</time></>}
                    </p>
                  </div>
                </div>
                {item.image && (
                  // The certificate preview: tap to open it full size.
                  <button
                    type="button"
                    onClick={() => open(item)}
                    aria-haspopup="dialog"
                    className="group grid gap-2 text-left"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${item.image}`}
                      alt=""
                      loading="lazy"
                      width={item.imageSize?.[0]}
                      height={item.imageSize?.[1]}
                      className="block h-auto w-full border-2 border-black bg-white transition group-hover:brightness-110"
                    />
                    <span className="inline-flex min-h-11 items-center text-base font-bold text-signal group-hover:underline">
                      {certificationsCopy.openLabel}
                    </span>
                  </button>
                )}
                <div className="mt-auto">
                  <CredentialLink item={item} />
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={shown ? `${shown.name} certificate` : 'Certificate'}
        onClick={(event) => {
          if (event.target === dialog.current) close()
        }}
        onClose={() => setShown(null)}
        className="sheet m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/85"
      >
        {shown && (
          <div className="sheet-panel mx-auto grid w-full max-w-4xl content-start bg-gunmetal text-paper sm:my-8 sm:border-[3px] sm:border-black sm:shadow-[8px_8px_0_#000]">
            <header className="sticky top-0 z-10 flex items-center gap-3 border-b-[3px] border-black bg-signal px-2 py-1.5 text-night sm:px-4">
              <button
                type="button"
                onClick={close}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border-2 border-black bg-cream px-3 text-base font-bold hover:bg-night hover:text-cream"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 5 8 12l7 7" />
                </svg>
                {certificationsCopy.closeLabel}
              </button>
              <p className="min-w-0 truncate text-xs font-bold uppercase tracking-widest">{shown.name}</p>
            </header>
            <div className="grid gap-4 p-3 sm:p-6">
              <img
                src={`${import.meta.env.BASE_URL}${shown.image}`}
                alt={`${shown.name} certificate from ${shown.issuer}, awarded to ${person.name}.`}
                className="block h-auto w-full border-2 border-black bg-white"
              />
              <p className="m-0 text-base text-fog">
                {shown.issuer}
                {shown.date && <> · {shown.date}</>}
              </p>
              <CredentialLink item={shown} />
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
