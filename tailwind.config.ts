import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'taxi-yellow': '#FACC15',
        'cool-gray': '#9CA3AF',
        'absolute-white': '#FFFFFF',
      },
      backdropBlur: {
        '40': '40px',
      },
    },
  },
  plugins: [],
}
export default config
