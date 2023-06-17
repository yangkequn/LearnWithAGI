/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  safelist: [
    'bg-red-500',
    'text-3xl',
    'lg:text-4xl'
    , { pattern: /^ring-|bg-|hover:|min-/ }
    , "hover:bg-orange-200"
    , "bg-[#E7EBF0]"
    , "dark:bg-slate-900"
    , "hover:w-100"
  ],
  plugins: [],
}
