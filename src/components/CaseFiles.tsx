import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { caseFilesCopy, cases, type CaseCategory, type CaseFile as CaseFileData } from '../content/cases'
import { ChapterHeader, Reveal, Sfx } from './Comic'
import { EvidenceList } from './Evidence'

function Labelled({ label, children }: { label: string; children: string }) {
  return (
    <div className="grid gap-0.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-fog">{label}</p>
      <p className="leading-relaxed text-paper">{children}</p>
    </div>
  )
}

function CaseFile({ data, index }: { data: CaseFileData; index: number }) {
  const [open, setOpen] = useState(false)
  const evidenceId = useId()
  const tilt = open ? '' : index % 2 ? 'md:rotate-[0.3deg]' : 'md:-rotate-[0.3deg]'

  return (
    <Reveal className={open ? 'lg:col-span-2' : 'lg:[&:nth-child(odd):last-child]:col-span-2'}>
      <article id={`case-${data.id}`} aria-labelledby={`${data.id}-title`} className={`scroll-mt-20 story-panel panel-frame flex h-full flex-col bg-gunmetal ${tilt}`}>
        <header className="halftone-shift relative grid gap-1 border-b-[5px] border-black bg-slate/60 px-4 py-3">
          <p className="relative text-xs font-bold uppercase tracking-wide text-fog">Case file · {data.domain}</p>
          <h3 id={`${data.id}-title`} className="comic-heading relative text-4xl leading-none text-paper">{data.title}</h3>
        </header>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)] content-start gap-3 p-4">
          <Labelled label={data.problemLabel ?? 'The problem'}>{data.problem}</Labelled>
          {data.result && <Labelled label="The result">{data.result}</Labelled>}
          {data.limit && <Labelled label="The limits">{data.limit}</Labelled>}

          <ul aria-label={`${data.title} stack`} className="flex flex-wrap gap-1.5 pt-1">
            {data.stack.map((item) => (
              <li key={item} className="border border-slate bg-ink px-2 py-0.5 text-sm font-medium text-paper">{item}</li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {data.links.map((link) => (
              <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-sm border-2 border-paper bg-ink px-3 text-sm font-semibold text-paper hover:border-signal hover:text-signal">
                {link.label}
              </a>
            ))}
            {data.status && <span className="inline-flex min-h-11 items-center border-2 border-dashed border-fog px-3 text-sm font-semibold text-paper">{data.status}</span>}
            {data.evidence && (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={evidenceId}
                onClick={() => setOpen(!open)}
                className="sfx-host relative inline-flex min-h-11 items-center rounded-sm border-2 border-black bg-signal px-3 text-sm font-bold text-ink shadow-[3px_3px_0_#000] hover:bg-paper"
              >
                {open ? 'Hide evidence' : 'View evidence'}
                <Sfx className="-right-3 -top-5 text-lg">KRAK!</Sfx>
              </button>
            )}
          </div>

          <div id={evidenceId} hidden={!open} className="border-t-2 border-slate pt-4">
            {open && data.evidence && <EvidenceList blocks={data.evidence} wide />}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function CaseFiles() {
  const [active, setActive] = useState<CaseCategory>('ai')
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const { categories } = caseFilesCopy

  // A link to #case-<id> (the cover teasers) opens that case's tab first, then scrolls to it.
  useEffect(() => {
    const open = () => {
      const id = location.hash.replace('#case-', '')
      const found = location.hash.startsWith('#case-') && cases.find((item) => item.id === id)
      if (!found) return
      setActive(found.category)
      requestAnimationFrame(() => document.getElementById(`case-${id}`)?.scrollIntoView())
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const step = event.key === 'ArrowRight' ? 1 : -1
    const next = (index + step + categories.length) % categories.length
    setActive(categories[next].id)
    tabs.current[next]?.focus()
  }

  return (
    <section id="cases" aria-labelledby="cases-title" className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-3 py-12 sm:px-4 md:py-16">
      <ChapterHeader id="cases-title" chapter={caseFilesCopy.chapter} title={caseFilesCopy.title} narration={caseFilesCopy.narration} />

      <div role="tablist" aria-label="Type of work" className="grid gap-3 sm:grid-cols-2">
        {categories.map((category, index) => {
          const selected = active === category.id
          const count = cases.filter((item) => item.category === category.id).length
          return (
            <button
              key={category.id}
              ref={(element) => { tabs.current[index] = element }}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              aria-selected={selected}
              aria-controls="case-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(category.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`grid gap-0.5 border-2 px-4 py-3 text-left ${selected ? 'border-black bg-signal text-ink shadow-[4px_4px_0_#000]' : 'border-slate bg-gunmetal text-paper hover:border-signal'}`}
            >
              <span className="comic-heading text-3xl leading-none">{category.label}</span>
              <span className={`text-sm ${selected ? 'text-ink' : 'text-fog'}`}>{category.description} · {count} files</span>
            </button>
          )
        })}
      </div>

      <div id="case-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="grid grid-cols-[minmax(0,1fr)] gap-5 md:gap-6 lg:grid-flow-dense lg:grid-cols-2">
        {cases
          .filter((item) => item.category === active)
          .map((item, index) => <CaseFile key={item.id} data={item} index={index} />)}
      </div>
    </section>
  )
}
