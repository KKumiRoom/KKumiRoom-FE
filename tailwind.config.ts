import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "sans-serif"],
      },
      colors: {
        primary: "#61B89F",
        deepPrimary: "#4E8F77",
        secondary: "#D3EBCD",
        tertiary: "#B1CDE2",
        main: "#F8F8F8",
        sub: "#FDFDFD",
        text:"#464646",
        gray: "#AAAAAA",
      },
    },
  },
  plugins: [],
};

export default config; 