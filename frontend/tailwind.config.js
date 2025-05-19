/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // tailwind.config.{js,cjs,mjs,ts,cts,mts}
  ],
  theme: {
    extend: {
      fontFamily: {
        jura: "Jura",
        openSans: "Open Sans"
      }
    },
  },
  plugins: [],
}

