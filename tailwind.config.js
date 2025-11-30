/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: '#0A0E14',
                    secondary: '#11151C',
                    tertiary: '#1A1F2E',
                    elevated: '#252A38',
                },
                text: {
                    primary: '#E6EDF3',
                    secondary: '#8B949E',
                    muted: '#6E7681',
                },
                accent: {
                    blue: {
                        DEFAULT: '#3B82F6',
                        hover: '#60A5FA',
                    },
                    green: {
                        DEFAULT: '#34D399',
                        hover: '#6EE7B7',
                    },
                    amber: {
                        DEFAULT: '#FBBF24',
                    },
                    red: {
                        DEFAULT: '#EF4444',
                        soft: '#F87171',
                    }
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
