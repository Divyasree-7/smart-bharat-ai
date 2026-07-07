import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        raat: {
          DEFAULT: '#0E1626',
          50: '#1A2740',
          100: '#16324F',
        },
        kagaz: '#F3F5F8',
        marigold: {
          DEFAULT: '#E08D3C',
          light: '#F2A85C',
          dark: '#C06F26',
        },
        banyan: {
          DEFAULT: '#1F6F54',
          light: '#2E8F6E',
          dark: '#154F3B',
        },
        slateink: '#6B7280',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'chakra-glow': 'radial-gradient(circle at 50% 50%, rgba(224,141,60,0.15), transparent 60%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(14, 22, 38, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        spinslow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        spinslow: 'spinslow 18s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s ease forwards',
      },
    },
  },
  plugins: [typography],
}
