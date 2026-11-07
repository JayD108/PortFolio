import { useLayoutEffect, useRef, useState } from 'react'
import type { Evidence as EvidenceBlock, SeriesColor, Tip } from '../content/cases'

const color = (name: SeriesColor) => `var(--color-${name})`

type TipState = { title: string; rows: [string, string][]; x: number; y: number } | null

function Tooltip({ tip }: { tip: TipState }) {
  if (!tip) return null
  const width = 240
  const left = Math.max(8, tip.x + 14 + width > window.innerWidth ? tip.x - width - 14 : tip.x + 14)
  return (
    <div
      role="presentation"
      style={{ left, top: Math.max(64, tip.y - 90), width }}
      className="pointer-events-none fixed z-40 border-2 border-black bg-gunmetal px-2.5 py-2 text-xs shadow-[3px_3px_0_#000]"
    >
      <p className="pb-1 font-semibold text-paper">{tip.title}</p>
      {tip.rows.map(([key, value]) => (
        <p key={key} className="flex justify-between gap-3 text-fog">
          <span>{key}</span>
          <span className="font-medium tabular-nums text-paper">{value}</span>
        </p>
      ))}
    </div>
  )
}

function Legend({ items }: { items: { label: string; color: SeriesColor }[] }) {
  return (
    <ul aria-label="Legend" className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-fog">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block size-2.5 rounded-[2px]" style={{ background: color(item.color) }} />
          {item.label}
        </li>
      ))}
    </ul>
  )
}

function Bars({ block }: { block: Extract<EvidenceBlock, { type: 'bars' }> }) {
  const [tip, setTip] = useState<TipState>(null)
  const show = (value: Tip, event: React.PointerEvent) => setTip({ ...value, x: event.clientX, y: event.clientY })

  return (
    <figure className="m-0 grid grid-cols-[minmax(0,1fr)] gap-3">
      <figcaption className="font-semibold text-paper">{block.title}</figcaption>
      <Legend items={block.legend} />
      <div className="grid gap-3">
        {block.rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(0,1fr)_3.2em] items-center gap-x-2.5 gap-y-0.5"
            onPointerMove={(event) => show(row.tip, event)}
            onPointerLeave={() => setTip(null)}
          >
            <span className="col-span-2 text-sm text-paper">{row.label}</span>
            <div className="relative h-3.5">
              <div
                className="absolute left-0 top-1 h-1.5 rounded-r"
                style={{ width: `${(row.value / block.max) * 100}%`, background: color(row.color) }}
              />
              {block.chanceAt !== undefined && (
                <div className="absolute -bottom-1.5 -top-1.5 w-px bg-fog" style={{ left: `${(block.chanceAt / block.max) * 100}%` }} />
              )}
            </div>
            <span className="text-right text-sm font-medium tabular-nums text-paper">{row.display}</span>
          </div>
        ))}
        <div aria-hidden="true" className="grid grid-cols-[minmax(0,1fr)_3.2em] gap-x-2.5 text-xs text-fog">
          <div className="flex justify-between gap-2">
            <span>{block.axis.start}</span>
            <span>{block.axis.middle}</span>
            <span>{block.axis.end}</span>
          </div>
        </div>
      </div>
      {block.note && <p className="text-sm leading-relaxed text-fog">{block.note}</p>}
      <Tooltip tip={tip} />
    </figure>
  )
}

function Lines({ block }: { block: Extract<EvidenceBlock, { type: 'lines' }> }) {
  const box = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(520)
  const [hover, setHover] = useState<{ index: number; x: number; y: number } | null>(null)

  useLayoutEffect(() => {
    if (!box.current) return
    const measure = () => {
      if (box.current?.clientWidth) setWidth(box.current.clientWidth)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(box.current)
    return () => observer.disconnect()
  }, [])

  const height = Math.max(230, Math.min(300, width * 0.55))
  const margin = { top: 12, right: 88, bottom: 28, left: 40 }
  const innerWidth = Math.max(60, width - margin.left - margin.right)
  const innerHeight = height - margin.top - margin.bottom
  const sx = (index: number) => margin.left + block.x.positions[index] * innerWidth
  const sy = (value: number) => margin.top + innerHeight - (value / block.y.max) * innerHeight

  const onMove = (event: React.PointerEvent) => {
    const rect = box.current!.getBoundingClientRect()
    const px = event.clientX - rect.left
    let index = 0
    block.x.positions.forEach((_, i) => {
      if (Math.abs(sx(i) - px) < Math.abs(sx(index) - px)) index = i
    })
    setHover({ index, x: event.clientX, y: event.clientY })
  }

  return (
    <figure className="m-0 grid grid-cols-[minmax(0,1fr)] gap-3">
      <figcaption className="font-semibold text-paper">{block.title}</figcaption>
      <Legend items={block.series.map((s) => ({ label: s.name, color: s.color }))} />
      <div ref={box} className="w-full" style={{ touchAction: 'pan-y' }}>
        <svg
          role="img"
          aria-label={block.ariaLabel}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className="block max-w-full"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {block.y.ticks.map((tick) => (
            <g key={tick}>
              <line x1={margin.left} x2={width - margin.right} y1={sy(tick)} y2={sy(tick)} stroke="var(--color-slate)" />
              <text x={margin.left - 8} y={sy(tick) + 4} textAnchor="end" fontSize="11" fill="var(--color-fog)">
                {tick}{block.y.unit}
              </text>
            </g>
          ))}
          {block.x.ticks.map((index) => (
            <text key={index} x={sx(index)} y={height - 8} textAnchor="middle" fontSize="11" fill="var(--color-fog)">
              {block.x.labels[index]}
            </text>
          ))}
          {hover && <line x1={sx(hover.index)} x2={sx(hover.index)} y1={margin.top} y2={margin.top + innerHeight} stroke="var(--color-fog)" />}
          {block.series.map((series) => {
            const last = series.values.length - 1
            const end = series.values[last]
            return (
              <g key={series.name}>
                <path
                  d={series.values.map((v, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ')}
                  fill="none"
                  stroke={color(series.color)}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {series.values.map((v, i) => (
                  <circle key={i} cx={sx(i)} cy={sy(v)} r="4" fill={color(series.color)} stroke="var(--color-ink)" strokeWidth="2" />
                ))}
                <text x={sx(last) + 10} y={sy(end) - 2} fontSize="11.5" fill="var(--color-fog)">{series.name}</text>
                <text x={sx(last) + 10} y={sy(end) + 12} fontSize="12" fontWeight="600" fill="var(--color-paper)">
                  {end.toFixed(block.digits)}{block.y.unit}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      {block.note && <p className="text-sm leading-relaxed text-fog">{block.note}</p>}
      <Tooltip
        tip={
          hover && {
            title: block.x.tipTitles[hover.index],
            rows: block.series.map((s) => [s.name, s.tips ? s.tips[hover.index] : `${s.values[hover.index].toFixed(block.digits)}${block.y.unit}`]),
            x: hover.x,
            y: hover.y,
          }
        }
      />
    </figure>
  )
}

function Code({ title, code }: { title: string; code: string }) {
  const [label, setLabel] = useState('Copy')
  const pre = useRef<HTMLPreElement>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setLabel('Copied')
    } catch {
      const selection = getSelection()
      if (selection && pre.current) {
        selection.selectAllChildren(pre.current)
        setLabel('Selected')
      }
    }
    setTimeout(() => setLabel('Copy'), 1600)
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-2">
      <h4 className="m-0 font-semibold text-paper">{title}</h4>
      <div className="flex items-stretch border-2 border-slate bg-ink">
        <pre ref={pre} className="m-0 min-w-0 flex-1 overflow-x-auto p-3 text-[0.8125rem] leading-relaxed text-paper">{code}</pre>
        <button type="button" onClick={copy} className="min-w-16 shrink-0 border-l-2 border-slate px-3 text-xs font-semibold text-signal hover:text-paper">
          {label}
        </button>
      </div>
    </div>
  )
}

function Block({ block }: { block: EvidenceBlock }) {
  switch (block.type) {
    case 'bars':
      return <Bars block={block} />
    case 'lines':
      return <Lines block={block} />
    case 'table':
      return (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-2">
          <h4 className="m-0 font-semibold text-paper">{block.title}</h4>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={block.title}>
            <table className="w-full border-collapse text-sm tabular-nums">
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header} scope="col" className="whitespace-nowrap border-b-2 border-slate py-1 pr-3 text-left text-xs font-semibold text-fog">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join()}>
                    {row.map((cell, i) => (
                      <td key={i} className="whitespace-nowrap border-b border-slate py-1 pr-3 text-paper">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    case 'facts':
      return (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-2">
          {block.title && <h4 className="m-0 font-semibold text-paper">{block.title}</h4>}
          <dl className="m-0 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
            {block.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-fog">{fact.label}</dt>
                <dd className="m-0 text-sm font-medium text-paper">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'list':
      return (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-2">
          <h4 className="m-0 font-semibold text-paper">{block.title}</h4>
          <dl className="m-0 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
            {block.items.map((item) => (
              <div key={item.term}>
                <dt className="text-sm font-semibold text-paper">{item.term}</dt>
                <dd className="m-0 text-sm leading-snug text-fog">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'image':
      return (
        <figure className="m-0 grid grid-cols-[minmax(0,1fr)] gap-2">
          <img
            src={`${import.meta.env.BASE_URL}${block.src}`}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
            className="block h-auto w-full border-2 border-black"
          />
          <figcaption className="text-sm text-fog">{block.caption}</figcaption>
        </figure>
      )
    case 'code':
      return <Code title={block.title} code={block.code} />
    case 'verse':
      return (
        <div className="grid gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-fog">{block.label}</p>
          <p lang="hi" className="text-lg leading-relaxed text-paper">
            {block.lines.map((line) => <span key={line} className="block">{line}</span>)}
          </p>
        </div>
      )
    case 'text':
      return (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-2">
          <h4 className="m-0 font-semibold text-paper">{block.title}</h4>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-fog">{paragraph}</p>
          ))}
        </div>
      )
  }
}

/** Renders a case's evidence blocks. Both the comic and Recruiter Mode use this. */
export function EvidenceList({ blocks, wide = false }: { blocks: EvidenceBlock[]; wide?: boolean }) {
  return (
    <div className={`grid grid-cols-[minmax(0,1fr)] gap-6 ${wide ? 'items-start lg:grid-cols-2 lg:gap-x-8' : ''}`}>
      {blocks.map((block, index) => (
        <div key={index} className={`min-w-0 ${wide && block.type === 'image' ? 'lg:col-span-2' : ''}`}>
          <Block block={block} />
        </div>
      ))}
    </div>
  )
}
