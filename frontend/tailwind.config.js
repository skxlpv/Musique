/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
            },
            colors: {
                background: {
                    DEFAULT: 'black',
                    secondary: '#222222',
                    tertiary: '#333333',
                },
                foreground: {
                    DEFAULT: '#fafafa',
                    secondary: '#a1a1a1',
                    muted: '#737373'
                },
                border: {
                    DEFAULT: '#333333',
                    hover: '#555555'
                },
                primary: {
                    50: '#e6f5ff',
                    100: '#cceaff',
                    200: '#99d5ff',
                    300: '#66c0ff',
                    400: '#33aaff',
                    500: '#0095ff',
                    600: '#0077cc',
                    700: '#005999',
                    800: '#003c66',
                    900: '#001e33'
                },
                accent: {
                    purple: '#6d28d9',
                    blue: '#1d4ed8',
                    teal: '#0d9488',
                    amber: '#d97706',
                    pink: '#db2777'
                },
                success: {
                    DEFAULT: '#10b981',
                    dark: '#065f46'
                },
                warning: {
                    DEFAULT: '#f59e0b',
                    light: 'rgba(245, 158, 11, 0.2)',
                    dark: '#92400e'
                },
                error: {
                    DEFAULT: '#ef4444',
                    dark: '#991b1b'
                },
                info: {
                    DEFAULT: '#3b82f6',
                    dark: '#1e40af'
                }
            },
            backgroundImage: {
                'grainy-gradient': `
                    linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to)),
                    url(https://grainy-gradients.vercel.app/noise.svg)
                `,
            },
        },
    },
    plugins: [
        // Optional: Custom scrollbar plugin
        plugin(function ({addUtilities}) {
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