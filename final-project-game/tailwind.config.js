const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'midnight': '#1e1e1e',
      'red': colors.red,
      'slate': colors.slate,
      'zinc': colors.zinc,
    },
  },
  plugins: [],
}
