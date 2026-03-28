import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005da7',
          container: '#68abff',
          on: '#eef3ff',
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
          container: '#e5e8ec',
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
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'premium': '0 12px 40px rgba(44, 47, 50, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('@tailwindcss/container-queries')
  ],
};

export default config;
