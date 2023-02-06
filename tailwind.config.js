/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`;
const spacingArr = Array.from({ length: 100 }, (_, idx) => idx + 1);

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    spacing: {
      ...spacingArr.reduce((prev, cur) => {
        prev[`${cur}pxr`] = pxToRem(cur);
        return prev;
      }, {}),
    },
  },
  plugins: [],
};
