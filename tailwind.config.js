const defaultTheme = require('tailwindcss/defaultTheme');
// const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'app-dark': '#090808',
        'app-dark-500': '#130F26',
        'app-dark-400': '#2F2D37',
        'app-gray-400': '#545454',
        muted: '#898989',
        'app-gray-100': '#ADADAD',
        'app-gray': '#898989',
        'app-pink': '#B61046',
        'app-stroke': '#EAEAEA',
        'app-purple': '#E9DEFA',
        'app-pink-2': '#d60749',
      },
      screens: {
        'phone-mini': '200px',
        'phone-xs': '320px',
        'phone-sm': '375px',
        'phone-md': '400px',
        'phone-lg': '480px',
        ...defaultTheme.screens,
        'desktop-med': '1350px',
        'desktop-wide': '1440px',
        max: '1920px',
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        serif: ['Montserrat', ...defaultTheme.fontFamily.serif],
      },
    },
  },
};
