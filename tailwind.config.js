/** @type {import('tailwindcss').Config} */
colors = require('tailwindcss/colors')
module.exports = {
  //important: '#app',
  important: true,
  mode: 'jit',
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

      colors: colors
    },
  },
  safelist: [
    'bg-red-500',
    "text-2xl", "text-xl", "text-lg", "text-base", "text-sm", "text-xs",
    , "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full"
    , "right-0", "right-1", "right-2", "right-3", "right-4", "right-5", "right-6", "right-7", "right-8", "right-9", "right-10"
    , "h-0", "h-1", "h-2", "h-3", "h-4", "h-5", "h-6", "h-7", "h-8", "h-9", "h-10", "h-11", "h-12", "h-13", "h-14", "h-15", "h-16", "h-17", "h-18", "h-19", "h-20", "h-full"
    , "min-w-250", "min-w-max", "min-w-fit", "min-w-250", "min-w-[500px]", "min-w-[200px]", "min-w-[250px]","min-w-[285px]"
    , "pr-0", "pr-1", "pr-2", "pr-3", "pr-4", "pr-5", "pr-6", "pr-7", "pr-8", "pr-9", "pr-10", "pr-11", "pr-12", "pr-13", "pr-14", "pr-15", "pr-16", "pr-17", "pr-18", "pr-19", "pr-20"
    , "pl-0", "pl-1", "pl-2", "pl-3", "pl-4", "pl-5", "pl-6", "pl-7", "pl-8", "pl-9", "pl-10", "pl-11", "pl-12", "pl-13", "pl-14", "pl-15", "pl-16", "pl-17", "pl-18", "pl-19", "pl-20"

    // , {
    //   pattern: /(bg|h)-/,
    //   //variants: ['lg', 'hover', 'focus', 'lg:hover', "md", "dark",],
    // }
    , "hover:bg-orange-200"
    , "bg-[#E7EBF0]"
    , "dark:bg-slate-900"
    , "hover:w-100"
    , "dark:border-gray-900/50"
    , "shadow-[0_0_10px_rgba(0,0,0,0.10)]"
    , "dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
  ],
  plugins: [],
}
