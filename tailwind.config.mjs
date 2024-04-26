/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      container: {
        padding: "1.5rem",
        center: true,
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        title: ["Montserrat", "sans-serif"],
        mono: ["Source Code Pro", "monospace"],
      },
    },
  },

  plugins: [],
};
