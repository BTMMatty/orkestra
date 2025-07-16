// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'orkestra-black': '#000000',
        'orkestra-white': '#FFFFFF',
      },
      fontFamily: {
        'mono': ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'pulse-agent': 'pulseAgent 2s infinite',
        'neural': 'neural 3s infinite',
      },
      keyframes: {
        pulseAgent: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        neural: {
          '0%, 100%': { opacity: '0.1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.5)' },
        },
      },
    },
  },
  plugins: [],
}