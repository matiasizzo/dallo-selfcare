export default function QueviIcon({
  size,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      {...(size ? { width: size, height: size } : {})}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="QUEVI icon"
      role="img"
    >
      {/* Forest green background circle */}
      <circle cx="50" cy="50" r="50" fill="#355539" />

      {/* White partial arc — large arc, gap at top-right */}
      <path
        d="M 18 64 A 28 28 0 1 1 70 68"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Water drop — terracotta border, sand fill */}
      <path
        d="M 53 30 L 38 56 A 15 15 0 0 0 68 56 Z"
        fill="#c9b49a"
        stroke="#c4876a"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
