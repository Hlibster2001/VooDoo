/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "light-sand": "rgba(252, 247, 230, 1)",
        "cart": "rgba(30, 30, 30, 1)",
        "cart-text": "rgba(252, 247, 230, 1)",
      },
      fontFamily: {
        "display": "Space Grotesk, sans-serif",
      },
      spacing: {
        "266": "266px",
        "76": "76px",
        "76/2": "38px",
        "300": "300px",
        "402": "450px",
        "160": "160px",
        "60": "60px",
        "98": "98px",
        "445": "445px",
        "576": "576px"
      },
    },
  },
  plugins: [],
};
