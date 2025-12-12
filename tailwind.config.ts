import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // creating custom theme
    theme: {
        extend: {
            screens: {
                '2xl': '1380px',
            },
            colors: {
                background: "#18181b",
                foreground: "#ffffff",
                primary: "#8854C0",
                "primary-hover": "#7c3aed",
                input: {
                    bg: "#1D1E26",
                },
                "light-white": "#DADADA",
                border: "#30303D",
                zinc: {
                    800: "#1D1E26",
                    900: "#18181b",
                    300: "#d4d4d8",
                    400: "#a1a1aa",
                    500: "#71717a",
                    700: "#3f3f46",
                },
            },
            fontFamily: {
                sans: ["var(--font-source-sans)", "sans-serif"],
            },
            fontSize: {
                xs: "12px",

                sm: "14px",
                base: "16px",
                lg: "18px",
                xl: "20px",
                "2xl": "24px",
                "3xl": "32px",
                "4xl": "48px",
            }
        },
    },
    plugins: [],
};
export default config;
