/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E9CFBE',
        secondary: '#FFFFFF',
        darkBlue: '#1E3A8A', 
      },
    },
  },
  plugins: [],
}

