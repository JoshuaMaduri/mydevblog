import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
          nord: {
              primary: "#88C0D0",
              secondary: "#81A1C1",
              accent: "#5E81AC",
              neutral: "#2E3440",
              "base-100": "#ECEFF4",
              "base-content": "#3B4252", // Font color
          },
          dracula: {
              primary: "#BD93F9",
              secondary: "#FF79C6",
              accent: "#50FA7B",
              neutral: "#282A36",
              "base-100": "#44475A",
              "base-content": "#F8F8F2", // Font color
          },
      },
  ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dracula", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: "*", // The element that receives theme color CSS variables
  },
};
