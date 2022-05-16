const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./resources/js/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
            screens: {
                'xs': '320px',
                ...defaultTheme.screens,
            }
    },
    plugins: [],
}

