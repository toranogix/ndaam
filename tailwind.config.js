/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
    // './**/*.{js,jsx,ts,tsx}', // Scan files at the root
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'made-saonara': ['made-saonara', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

