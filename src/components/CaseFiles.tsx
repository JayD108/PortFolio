import { useEffect, useId, useState } from 'react'
import { caseFilesCopy, cases, featuredProjects, projectOrder, type CaseFile as CaseFileData } from '../content/cases'
import { notes } from '../content/notes'
import { ChapterHeader, Reveal } from './Comic'
import { EvidenceList } from './Evidence'
import { evidenceIds, markEvidenceOpened, useEvidence } from './evidenceStore'
import { DetectiveBadgeIcon } from './Extras'

const rank = (id: string) => {
  const index = projectOrder.indexOf(id)
  return index === -1 ? projectOrder.length : index
}
const ordered = [...cases].sort((a, b) => rank(a.id) - rank(b.id))
const featured = featuredProjects.map((id) => cases.find((item) => item.id === id)).filter((item): item is CaseFileData => !!item)
const more = ordered.filter((item) => !featuredProjects.includes(item.id))

function Labelled({ label, children }: { label: string; children: string }) {
  return (
    <div className="grid gap-0.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-fog">{label}</p>
      <p className="max-w-[68ch] text-base leading-relaxed text-paper">{children}</p>
    </div>
  )
}

function OneLine({ label, children }: { label: string; children: string }) {
  return (
    <p className="text-base leading-snug text-paper">
      <span className="pr-1.5 text-xs font-bold uppercase tracking-wide text-signal">{label}</span>
      {children}
    </p>
  )
}

function ProjectCard({ data, expanded, onToggle, highlight = false }: { data: CaseFileData; expanded: boolean; onToggle: () => void; highlight?: boolean }) {
  const detailId = useId()
  const note = notes.find((n) => n.caseId === data.id)
  const hasMore = Boolean(data.problem || data.result || data.limit || data.evidence?.length || note || data.status)

  return (
    <article id={`case-${data.id}`} aria-labelledby={`${data.id}-title`} className="scroll-mt-20 panel-frame grid grid-cols-[minmax(0,1fr)] bg-gunmetal">
      <div className="grid gap-3 p-4 sm:p-5">
        <header className="grid gap-1.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 id={`${data.id}-title`} className="comic-heading m-0 text-3xl leading-none text-paper">{data.title}</h3>
            {highlight && (
              <span className="-rotate-2 border-2 border-black bg-signal px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-night">{caseFilesCopy.featuredLabel}</span>
            )}
            {data.inProgress && (
              <span className="-rotate-2 border-2 border-dashed border-signal px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-signal">In progress</span>
            )}
          </div>
          <p className="text-base leading-snug text-fog">{data.summary}</p>
        </header>

        {(data.problemLine || data.resultLine) && (
          <div className="grid gap-1.5 border-l-[3px] border-signal pl-3">
            {data.problemLine && <OneLine label="Problem">{data.problemLine}</OneLine>}
            {data.resultLine && <OneLine label={data.inProgress ? 'Plan' : 'Result'}>{data.resultLine}</OneLine>}
          </div>
        )}

        {data.log?.[0] && (
          <p className="flex flex-wrap items-baseline gap-x-2 border-2 border-dashed border-slate px-3 py-2 text-base leading-snug text-paper">
            <span className="text-xs font-bold uppercase tracking-wide text-signal">Build log · {data.log[0].date}</span>
            <span>{data.log[0].text}</span>
          </p>
        )}

        <ul aria-label={`${data.title} tags`} className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {(expanded ? data.stack : data.stack.slice(0, 4)).map((item) => (
            <li key={item} className="border border-slate bg-ink px-2 py-0.5 text-sm font-medium text-paper">{item}</li>
          ))}
          {!expanded && data.stack.length > 4 && <li className="px-1 py-0.5 text-sm text-fog">+{data.stack.length - 4}</li>}
        </ul>

        {(data.links.length > 0 || hasMore) && (
          <div className="flex flex-wrap items-center gap-2">
            {data.links.map((link) => (
              <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-sm border-2 border-paper bg-ink px-3 text-[0.9375rem] font-semibold text-paper hover:border-signal hover:text-signal">
                {link.label}
                <span aria-hidden="true" className="pl-1">↗</span>
              </a>
            ))}
            {hasMore && (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={detailId}
                onClick={() => {
                  if (!expanded) markEvidenceOpened(data.id)
                  onToggle()
                }}
                className="inline-flex min-h-11 items-center gap-1 rounded-sm border-2 border-black bg-signal px-3 text-[0.9375rem] font-bold text-night shadow-[3px_3px_0_#000] hover:bg-cream"
              >
                {expanded ? caseFilesCopy.readLess : caseFilesCopy.readMore}
                <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      <div id={detailId} hidden={!expanded} className="border-t-2 border-slate">
        {expanded && (
          <div className="grid gap-5 p-4 sm:p-5">
            {data.problem && <Labelled label={data.problemLabel ?? 'The problem'}>{data.problem}</Labelled>}
            {data.result && <Labelled label={data.inProgress ? 'How it works' : 'The result'}>{data.result}</Labelled>}
            {data.limit && <Labelled label="The limits">{data.limit}</Labelled>}
            {data.log && data.log.length > 1 && (
              <div className="grid gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-fog">Build log</p>
                <ol className="m-0 grid list-none gap-2 border-l-2 border-signal p-0 pl-4">
                  {data.log.map((entry) => (
                    <li key={entry.date + entry.text} className="grid gap-0.5">
                      <span className="text-xs font-bold uppercase tracking-wide text-signal">{entry.date}</span>
                      <span className="text-base leading-snug text-paper">{entry.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {(data.status || note) && (
              <div className="flex flex-wrap gap-2">
                {data.status && <span className="inline-flex min-h-11 items-center border-2 border-dashed border-fog px-3 text-sm font-semibold text-paper">{data.status}</span>}
                {note && (
                  <a href={`#note-${data.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-signal bg-ink px-3 text-[0.9375rem] font-semibold text-signal hover:bg-signal hover:text-night">
                    Read the case notes
                    <span className="font-normal opacity-80">· {note.readMinutes} min</span>
                  </a>
                )}
              </div>
            )}
            {data.evidence && (
              <div className="grid gap-3 border-t-2 border-dashed border-slate pt-4">
                <p className="comic-heading m-0 text-2xl leading-none text-signal">Evidence</p>
                <EvidenceList blocks={data.evidence} wide />
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

/** Featured projects up top; every other project in one case file, a tidy tile when closed and a list when open. */
export function CaseFiles() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const listId = useId()
  const evidence = useEvidence()

  // A link to #case-<id> opens the file and that card, then scrolls to it.
  useEffect(() => {
    const jump = () => {
      if (!location.hash.startsWith('#case-')) return
      const id = location.hash.slice('#case-'.length)
      if (!cases.some((item) => item.id === id)) return
      if (!featuredProjects.includes(id)) setOpen(true)
      setExpanded(id)
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(`case-${id}`)?.scrollIntoView()))
    }
    jump()
    window.addEventListener('hashchange', jump)
    return () => window.removeEventListener('hashchange', jump)
  }, [])

  const toggleFolder = () => {
    if (open) document.getElementById('cases')?.scrollIntoView()
    setOpen(!open)
  }

  return (
    <section id="cases" aria-labelledby="cases-title" className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6 px-2 py-10 sm:px-4 md:py-20">
      <ChapterHeader id="cases-title" chapter={caseFilesCopy.chapter} title={caseFilesCopy.title} narration={caseFilesCopy.narration} />

      <ul className="m-0 grid list-none gap-6 p-0">
        {featured.map((item) => (
          <li key={item.id}>
            <Reveal>
              <ProjectCard data={item} highlight expanded={expanded === item.id} onToggle={() => setExpanded(expanded === item.id ? null : item.id)} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <div className="grid pt-2">
          <div className="ml-4 w-fit border-[3px] border-b-0 border-black bg-[#d9c48f] px-4 pb-1 pt-1.5 text-xs font-bold uppercase tracking-widest text-night">
            {caseFilesCopy.folderLabel}
          </div>
          <div className="relative border-[3px] border-black bg-[#e6d3a3] text-night shadow-[5px_5px_0_#000]">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={listId}
              onClick={toggleFolder}
              className="folder-toggle flex w-full flex-wrap items-center justify-between gap-3 px-4 py-5 text-left sm:px-6"
            >
              <span className="grid gap-1">
                <span className="comic-heading text-4xl leading-none">{caseFilesCopy.moreTitle}</span>
                <span className="text-base font-medium">
                  {more.length} more · fintech, AI, backend and Android
                </span>
              </span>
              <span className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-black bg-night px-4 text-base font-bold text-cream shadow-[3px_3px_0_#000]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
                  {open ? <path d="M3 7h6l2 2h10v10H3Z" /> : <path d="M3 5h6l2 2h10v12H3Z" />}
                </svg>
                {open ? caseFilesCopy.closeLabel : caseFilesCopy.openLabel}
              </span>
            </button>

            {!open && (
              <p aria-hidden="true" className="pointer-events-none absolute -top-3 right-4 -rotate-6 border-[3px] border-[#9b0d17] bg-[#e6d3a3] px-2 py-0.5 text-sm font-black uppercase tracking-widest text-[#9b0d17]">
                {more.length} inside
              </p>
            )}

            <div id={listId} hidden={!open} className="border-t-[3px] border-dashed border-black/50 bg-ink/0 p-2 sm:p-4">
              {open && (
                <div className="grid gap-4">
                  {/* The badge counter only appears once a visitor starts opening evidence. */}
                  {(evidence.badge || evidence.opened.length > 0) && (
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-sm font-medium">
                      {evidence.badge ? (
                        <>
                          <DetectiveBadgeIcon className="size-5" />
                          Detective badge earned. You examined every evidence file.
                        </>
                      ) : (
                        <>Evidence opened: {evidence.opened.length} of {evidenceIds.length}. Open them all for the detective badge.</>
                      )}
                    </p>
                  )}
                  <ul className="m-0 grid list-none gap-4 p-0">
                    {more.map((item) => (
                      <li key={item.id}>
                        <ProjectCard
                          data={item}
                          expanded={expanded === item.id}
                          onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
