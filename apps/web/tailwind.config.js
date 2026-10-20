/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: {
          bg: '#0E0E0E',
          hover: '#141414',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        purple: {
          brand: '#4F1AD6',
          light: '#8059E3',
          glow: 'rgba(79, 26, 214, 0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
