import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        /* custom */
        sapphire: {
          50: 'rgb(var(--color-sapphire-50) / <alpha-value>)',
          100: 'rgb(var(--color-sapphire-100) / <alpha-value>)',
          200: 'rgb(var(--color-sapphire-200) / <alpha-value>)',
          300: 'rgb(var(--color-sapphire-300) / <alpha-value>)',
          400: 'rgb(var(--color-sapphire-400) / <alpha-value>)',
          500: 'rgb(var(--color-sapphire-500) / <alpha-value>)',
          600: 'rgb(var(--color-sapphire-600) / <alpha-value>)',
          700: 'rgb(var(--color-sapphire-700) / <alpha-value>)',
          800: 'rgb(var(--color-sapphire-800) / <alpha-value>)',
          900: 'rgb(var(--color-sapphire-900) / <alpha-value>)',
          950: 'rgb(var(--color-sapphire-950) / <alpha-value>)',
        },

        /* @shadcn/ui */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
