import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Keep this but ensure it doesn't force black
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2',
          container: '#d1e4ff',
          on: '#ffffff',
        },
        secondary: {
          DEFAULT: '#843aa3',
          container: '#f1c1ff',
          on: '#ffedff',
        },
        tertiary: {
          DEFAULT: '#6f5900',
          container: '#fed023',
          on: '#fff2d3',
        },
        surface: {
          DEFAULT: '#f5f7fa',
          bright: '#ffffff',
          container: '#eef1f4',
          lowest: '#ffffff',
          on: '#2c2f32',
          variant: '#595c5e'
        },
        error: {
          DEFAULT: '#b31b25',
          container: '#fb5151',
          on: '#ffefee',
        }
      },
      fontFamily: {
        headline: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        'plus-jakarta-sans': ['var(--font-jakarta)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.05)',
        'premium': '0 20px 50px rgba(0,0,0,0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};

export default config;
