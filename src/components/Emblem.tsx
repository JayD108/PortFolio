type EmblemProps = {
  className?: string
  title?: string
}

const letters =
  'M8 86V14H30L45 46 60 14H82V86H64V46L50 74H40L26 46V86ZM88 14H122C142 14 154 29 154 50 154 71 142 86 122 86H88ZM106 30V70H120C130 70 136 62 136 50 136 38 130 30 120 30Z'

/** The MD monogram: bold slanted comic letters with an ink outline and a red drop shadow. */
export function Emblem({ className, title }: EmblemProps) {
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }

  return (
    <svg viewBox="0 0 176 100" className={className} {...a11y}>
      <g transform="translate(14 0) skewX(-8)">
        <path d={letters} fillRule="evenodd" fill="#c1121f" stroke="#c1121f" strokeWidth="5" strokeLinejoin="miter" transform="translate(6 6)" />
        <path d={letters} fillRule="evenodd" fill="#f5c518" stroke="#000" strokeWidth="5" strokeLinejoin="miter" paintOrder="stroke" />
      </g>
    </svg>
  )
}
