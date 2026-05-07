/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'rgb(var(--color-obsidian) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        'panel-2': 'rgb(var(--color-panel-2) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-soft': 'rgb(var(--color-primary-soft) / <alpha-value>)',
        teal: 'rgb(var(--color-teal) / <alpha-value>)',
        foam: 'rgb(var(--color-foam) / <alpha-value>)',
        mute: 'rgb(var(--color-mute) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,255,159,.24), 0 0 24px rgba(0,255,159,.18)',
        card: '0 24px 60px rgba(0, 0, 0, 0.35)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(24,48,54,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(24,48,54,.35) 1px, transparent 1px)',
        'hero-radial':
          'radial-gradient(circle at top, rgba(0,255,159,.12), transparent 35%), radial-gradient(circle at bottom right, rgba(61,217,181,.08), transparent 30%)',
      },
    },
  },
  plugins: [],
}
