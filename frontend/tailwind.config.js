/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    darkMode: 'class',
    theme: {
        extend: {
            // Dark theme color palette
            colors: {
                background: {
                    DEFAULT: '#0a0a0a',
                    secondary: '#161616',
                    tertiary: '#1f1f1f'
                },
                foreground: {
                    DEFAULT: '#888888',
                    secondary: '#a1a1a1',
                    muted: '#737373',
                    light: '#fafafa'
                },
                border: {
                    DEFAULT: '#262626',
                    hover: '#3f3f3f'
                },
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e'
                }
            },
            // Additional border radius
            borderRadius: {
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem'
            },
            // Custom box shadows
            boxShadow: {
                'soft': '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
                'medium': '0 2px 4px 0 rgba(255, 255, 255, 0.1)'
            },
            // Background image with noise
            backgroundImage: {
                'grainy-gradient': `
                    linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to)),
                    url(https://grainy-gradients.vercel.app/noise.svg)
                `,
            },
            // Custom animation for loader
            animation: {
                'spin-slow': 'spin 1.5s linear infinite',
            }
        },
    },
    plugins: [
        // Optional: Custom scrollbar plugin
        plugin(function({ addUtilities }) {
            addUtilities({
                '.scrollbar-thin': {
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#1f1f1f',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#3f3f3f',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#525252',
                    },
                }
            })
        })
    ]
}