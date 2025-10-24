/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", 
      "./pages/**/*.{js,ts,jsx,tsx}", 
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#093453",       // رنگ اصلی پرقدرت
            dark: "#061f32",          // حالت hover یا dark
            light: "#0d4a6e",         // حالت روشن‌تر
          },
          secondary: {
            DEFAULT: "#19664a",       // سبز تیره
            light: "#21835f",         // سبز روشن
          },
          accent: "#5ca6c5",         // آبی روشن برای CTA یا highlight
          background: "#e9f2ee",     // پس‌زمینه اصلی سایت
          text: {
            dark: "#041e2c",          // متن روی پس‌زمینه روشن
            light: "#ffffff",         // متن روی رنگ تیره
          }
        }
      }
    },
    plugins: [],
  }
  