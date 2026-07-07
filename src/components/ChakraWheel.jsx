import React from 'react'

// The Ashoka Chakra-inspired 24-spoke wheel — used as the app's signature motif:
// as a loading spinner, a hero backdrop, and a scroll-progress ring.
export default function ChakraWheel({ className = '', spinning = true, spokes = 24 }) {
  const lines = Array.from({ length: spokes })
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} ${spinning ? 'animate-spinslow' : ''}`}
      fill="none"
    >
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="3" opacity="0.5" />
      <circle cx="100" cy="100" r="10" fill="currentColor" />
      {lines.map((_, i) => {
        const angle = (360 / spokes) * i
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2="100"
            y2="14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
            transform={`rotate(${angle} 100 100)`}
          />
        )
      })}
    </svg>
  )
}
