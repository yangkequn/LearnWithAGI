/** @type {import('tailwindcss').Config} */
module.exports = {
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
    },
  },
  safelist: [
    'bg-red-500',
    "text-2xl", "text-xl", "text-lg", "text-base", "text-sm", "text-xs",
    , "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full"
    , "right-0", "right-1", "right-2", "right-3", "right-4", "right-5", "right-6", "right-7", "right-8", "right-9", "right-10"
    , "h-0", "h-1", "h-2", "h-3", "h-4", "h-5", "h-6", "h-7", "h-8", "h-9", "h-10"
    , "min-w-250", "min-w-max", "min-w-fit", "min-w-250", "min-w-[500px]", "min-w-[200px]", "min-w-[250px]"
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
