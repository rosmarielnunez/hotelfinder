/**
 * @typedef {import('tailwindcss').Config} TailwindConfig
 */
/** @type {TailwindConfig} */
module.exports = {
  content: [
    "./src/**/*.{html,ts, js, scss}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '320px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}

