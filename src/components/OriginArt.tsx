import type { OriginArt as ArtName } from '../content/origin'

const ink = '#050608'
const steel = '#2b323c'
const signal = '#f5c518'
const fog = '#c6ccd4'

/** Small original illustrations for the Origin Story panels. Decorative only. */
export function OriginArt({ name }: { name: ArtName }) {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="relative block h-full w-full">
      {name === 'kid' && (
        <>
          <path d="M0 150H320V180H0Z" fill={ink} />
          <path d="M92 26H228V126H92Z" fill={steel} stroke={ink} strokeWidth="6" />
          <path d="M104 38H216V114H104Z" fill={ink} />
          <path d="M114 50h46v6h-46ZM114 64h74v6h-74ZM114 78h30v6h-30ZM114 92h58v6h-58Z" fill={signal} />
          <path d="M176 92h10v6h-10Z" fill={fog} />
          <path d="M142 126h36l8 24h-52Z" fill={ink} />
          <path d="M100 150h120v8H100Z" fill={steel} />
          <path d="M232 40l26-14M232 76h30M232 112l26 14M88 40 62 26M88 76H58M88 112l-26 14" stroke={signal} strokeWidth="3" />
        </>
      )}

      {name === 'gamer' && (
        <>
          <path d="M0 150H320V180H0Z" fill={ink} />
          <path
            d="M104 58H216C242 58 258 88 266 124 270 146 248 156 234 138L216 116H104L86 138C72 156 50 146 54 124 62 88 78 58 104 58Z"
            fill={steel}
            stroke={ink}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M94 76h12v12h12v12h-12v12H94v-12H82V88h12Z" fill={fog} />
          <circle cx="226" cy="80" r="7" fill={signal} />
          <circle cx="210" cy="96" r="7" fill={signal} />
          <circle cx="242" cy="96" r="7" fill="#c1121f" />
          <circle cx="226" cy="112" r="7" fill={fog} />
          <path d="M146 84h28v8h-28Z" fill={ink} />
          <path d="M136 26l12 18M160 18v22M184 26l-12 18" stroke={signal} strokeWidth="4" />
        </>
      )}

      {name === 'engineer' && (
        <>
          <path d="M0 150H320V180H0Z" fill={ink} />
          <g transform="translate(26 16)">
            <path d="M50 28H214V134H50Z" fill={ink} stroke={ink} strokeWidth="6" />
            <path d="M50 28H214V46H50Z" fill="#59636f" />
            <circle cx="64" cy="37" r="4" fill="#c1121f" />
            <circle cx="78" cy="37" r="4" fill={signal} />
            <circle cx="92" cy="37" r="4" fill={fog} />
            <path d="M66 58l14 10-14 10" fill="none" stroke={signal} strokeWidth="4" />
            <path d="M90 74h62v5H90ZM66 90h102v5H66ZM66 104h70v5H66ZM66 118h88v5H66Z" fill={fog} />
            <path d="M234 52 276 66V96C276 116 257 129 234 136 211 129 192 116 192 96V66Z" fill={signal} stroke={ink} strokeWidth="6" />
            <path d="M214 92l14 16 28-34" fill="none" stroke={ink} strokeWidth="8" />
          </g>
        </>
      )}
    </svg>
  )
}
