import { useId } from 'react'

/**
 * Captain Jay: an original comic portrait of the pilot persona. The mirrored visor reflects
 * the night city, so the character works without drawing a real face.
 */
export function CaptainJay({ className = '', title }: { className?: string; title?: string }) {
  // Unique ids, because the portrait can appear more than once on the page.
  const uid = 'cj' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }
  return (
    <svg viewBox="0 0 200 220" className={className} {...a11y}>
      <defs>
        <linearGradient id={`${uid}-visor`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a3442" />
          <stop offset="0.55" stopColor="#11161d" />
          <stop offset="1" stopColor="#1f2833" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <path d="M50 86C53 56 147 56 150 86 152 106 134 114 100 114 66 114 48 106 50 86Z" />
        </clipPath>
      </defs>

      {/* Flight jacket with a fur collar */}
      <path d="M14 220C18 176 56 154 100 154S182 176 186 220Z" fill="#6b4a2b" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
      <path d="M58 160C70 182 130 182 142 160 132 152 68 152 58 160Z" fill="#efe3c6" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <path d="M100 176V220" stroke="#000" strokeWidth="4" />
      <circle cx="132" cy="196" r="9" fill="#f5c518" stroke="#000" strokeWidth="3" />

      {/* Yellow scarf trailing in the wind */}
      <path d="M70 150C88 162 112 162 130 150L136 160C114 174 86 174 64 160Z" fill="#f5c518" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <path d="M128 158C150 160 168 150 186 136 180 156 166 170 140 172Z" fill="#f5c518" stroke="#000" strokeWidth="4" strokeLinejoin="round" />

      {/* Chin and smile below the visor */}
      <path d="M68 108C70 136 84 150 100 150S130 136 132 108Z" fill="#c98d5f" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <path d="M86 130C94 138 106 138 114 130" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />

      {/* Helmet shell with a red stripe and ear cups */}
      <path d="M38 98C38 52 66 28 100 28S162 52 162 98L150 104C150 66 128 46 100 46S50 66 50 104Z" fill="#e6e8eb" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
      <path d="M92 29H108V48H92Z" fill="#c1121f" stroke="#000" strokeWidth="3" />
      <rect x="28" y="88" width="22" height="34" rx="9" fill="#e6e8eb" stroke="#000" strokeWidth="5" />
      <rect x="150" y="88" width="22" height="34" rx="9" fill="#e6e8eb" stroke="#000" strokeWidth="5" />

      {/* Headset microphone */}
      <path d="M42 120C46 140 60 146 74 140" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <circle cx="77" cy="139" r="5" fill="#2b323c" stroke="#000" strokeWidth="3" />

      {/* Mirrored visor reflecting the city: rooftops and a few lit windows */}
      <path d="M50 86C53 56 147 56 150 86 152 106 134 114 100 114 66 114 48 106 50 86Z" fill={`url(#${uid}-visor)`} stroke="#000" strokeWidth="5" />
      <g clipPath={`url(#${uid}-clip)`}>
        <path d="M44 114V98H58V92H70V100H80V88H92V96H104V90H118V100H130V94H142V102H156V114Z" fill="#05070a" />
        <path d="M62 102h3v4h-3ZM84 96h3v4h-3ZM110 98h3v4h-3ZM134 104h3v4h-3Z" fill="#f5c518" />
        <path d="M64 70C84 62 110 62 132 68" fill="none" stroke="#f5c518" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        <path d="M72 80C88 75 104 75 118 78" fill="none" stroke="#c6ccd4" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* "J" callsign badge on the helmet */}
      <circle cx="140" cy="58" r="12" fill="#f5c518" stroke="#000" strokeWidth="3" />
      <path d="M143 51V61C143 66 136 67 134 62" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}
