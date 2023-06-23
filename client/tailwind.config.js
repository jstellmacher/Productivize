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
    extend: {
      backgroundImage: {
        'milky': "url('../public/milky_way.jpg')",
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [],
};
