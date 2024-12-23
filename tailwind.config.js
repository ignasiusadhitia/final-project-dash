/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#DB4444',
        'type-text': '#030406',
        'type-text-light': '#89868D',
        'type-text-disable': '#B4B2B7',
        'surface-neutral': '#FFFFFF',
        'surface-background': '#F4F5F9',
        'surface-background-2': '#E7E7F4',
        'surface-border': '#DBDCDE',
      },
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1170px',
          xl: '1170px',
          '2xl': '1170px',
        },
      },
      margin: {},
      padding: {},
      borderRadius: {},
      fontSize: {},
      height: {},
      width: {},
    },
  },
  plugins: [],
};
