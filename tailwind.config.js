/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0F172A',
        'midnight-blue': '#1E293B',
        accent: '#3B82F6',
        'accent-light': '#60A5FA'
      },
    },
  },
  plugins: [],
}