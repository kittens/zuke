import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        turqoise: 'hsl(var(--turqoise))',
      },
      fontSize: {
        'l-small': ['12px', {
          letterSpacing: '-0.36px',
          lineHeight: '20px',
        }]
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1112px',
          '2xl': '1112px',
        },
      },
      boxShadow: {
        'card': '0px 0px 0px 1px rgba(50, 53, 57, 0.60), 0px 3px 2.9px -1px rgba(0, 0, 0, 0.25)',
        'modal': '0px 100px 80px 0px rgba(0, 0, 0, 0.07), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.05), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.02)'
      },
      transitionDuration: {
        '3000': '3000ms',
      },
      transitionTimingFunction: {
        'highlight': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        highlight: {
          '0%': { backgroundColor: 'rgba(117,122,132,0.08)' },
          '100%': { backgroundColor: '#151619' },
        }
      },
      animation: {
        'highlight': 'highlight 3s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
} satisfies Config;
