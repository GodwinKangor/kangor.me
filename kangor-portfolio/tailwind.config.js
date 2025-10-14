/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",
          400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",
          800:"#3730a3",900:"#312e81",
        },
      },
      boxShadow:{
        card:"0 8px 30px rgba(0,0,0,0.08)",
        cardHover:"0 12px 40px rgba(0,0,0,0.12)",
      },
      fontFamily:{ sans:["Inter","ui-sans-serif","system-ui","sans-serif"] },
    },
  },
  plugins: [],
};
