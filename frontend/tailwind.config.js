/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
          backgroundImage: {
            'grainy-gradient': `
              linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to)),
              url(https://grainy-gradients.vercel.app/noise.svg)
            `,
          },    
        },
      },
}
