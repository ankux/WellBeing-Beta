/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["'Archivo', 'sans-serif'"] ,
        inter: ["'Inter', 'sans-serif'"]
      }
    },
  },
  plugins: [],
}

