export default function Vector() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 280 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <circle cx="140" cy="115" r="100" fill="url(#gradient)" />

      <rect
        x="60"
        y="90"
        width="160"
        height="100"
        rx="15"
        fill="#3B82F6"
        stroke="#2563EB"
        strokeWidth="3"
      />

      <polygon
        points="60,90 140,40 220,90"
        fill="#60A5FA"
        stroke="#2563EB"
        strokeWidth="3"
      />

      <rect
        x="90"
        y="55"
        width="35"
        height="20"
        fill="white"
        stroke="#93C5FD"
        strokeWidth="1.5"
        transform="rotate(-15 90 55)"
      />
      <rect
        x="150"
        y="55"
        width="35"
        height="20"
        fill="white"
        stroke="#93C5FD"
        strokeWidth="1.5"
        transform="rotate(15 150 55)"
      />

      <circle cx="50" cy="130" r="6" fill="#93C5FD" />
      <circle cx="230" cy="150" r="4" fill="#93C5FD" />
      <circle cx="120" cy="180" r="5" fill="#93C5FD" />
      <circle cx="190" cy="80" r="4" fill="#93C5FD" />

      <defs>
        <radialGradient
          id="gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(140 115) scale(100)"
        >
          <stop stopColor="#60A5FA" stopOpacity="0.8" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}
