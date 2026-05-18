export default function QueviLogo({
  variant = 'dark',
  className,
  width = 190,
  height = 66,
}: {
  variant?: 'dark' | 'light'
  className?: string
  width?: number
  height?: number
}) {
  const fill = variant === 'dark' ? '#2b4430' : '#f5f2ec'

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="QUEVI Wellness Clinic"
      role="img"
    >
      {/* Wordmark */}
      <text
        x="110"
        y="46"
        fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, 'Times New Roman', serif"
        fontSize="48"
        fontWeight="700"
        textAnchor="middle"
        fill={fill}
        letterSpacing="3"
      >
        QUEVI
      </text>

      {/* Decorative swash — mirrors the Q tail extended right */}
      <path
        d="M 10 54 C 42 66, 90 68, 120 63 C 152 58, 188 56, 210 54"
        stroke={fill}
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Subtitle */}
      <text
        x="110"
        y="66"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="11.5"
        fontWeight="400"
        textAnchor="middle"
        fill={fill}
        letterSpacing="4"
        opacity="0.75"
      >
        Wellness Clinic •
      </text>
    </svg>
  )
}
