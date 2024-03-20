/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        primaryBlack: "#181820",
        secondaryBlack: "#1D1D24",
        pdgBlack:{
          900: "#1F1F27",
          500:"#36363E"
        },
        pdgWhite:{
          50:"#f8f8f8" //font-color
        },
        pdgBlue:{
          500:"#00A8FC" //link
        }
      },
      backgroundImage:{
        'login-bg':"url('../assets/images/login_bg.svg')"
      }
    },
  },
  plugins: [],
};
