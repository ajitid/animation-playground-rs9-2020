const defaultTheme = require('tailwindcss/defaultTheme');

const screens = require('./src/styles/screens.json');

module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.js', './src/**/*.jsx'],
  theme: {
    screens,
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          black: '#222222', // text
          'gray-700': '#282c47', // heading
          'gray-500': '#5b617c', // sub-title/text of lower importance
          'gray-300': '#f4f4f6', // alternative page bg
          'gray-100': '#fbfcfe', // page bg
          'blue-700': '#0064fe', // primary/acccent
          'blue-300': '#e9f3ff', // primary-faded
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
