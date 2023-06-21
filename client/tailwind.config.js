/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      "./src/components/**/*.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
      './public/index.html',
      './src/**/*.{html,js}',
      './components/**/*.{html,js}',
      './pages/**/*.{html,js}',
      './node_modules/@my-company/tailwind-components/**/*.js',
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
