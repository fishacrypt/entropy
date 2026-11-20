/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        coal: '#111111',
        paper: '#F8F8F6',
        ash: '#777777',
        gold: '#E4B84D',
        cream: '#F4EAD3',
      },
      fontFamily: {
        display: ['Outfit', 'ui-sans-serif', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
