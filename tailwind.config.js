// /** @type {import('tailwindcss').Config} */
// export const darkMode = ["class"];
// export const content = [
//     "./pages/**/*.{js,jsx}",
//     "./components/**/*.{js,jsx}",
//     "./app/**/*.{js,jsx}",
//     "./src/**/*.{js,jsx}",
//     "*.{js,jsx}",
//     "*.{js,ts,jsx,tsx,mdx}",
// ];
// export const prefix = "";
// export const theme = {
//     container: {
//         center: true,
//         padding: "2rem",
//         screens: {
//             "2xl": "1400px",
//         },
//     },
//     extend: {
//         colors: {
//             border: "hsl(var(--border))",
//             input: "hsl(var(--input))",
//             ring: "hsl(var(--ring))",
//             background: "hsl(var(--background))",
//             foreground: "hsl(var(--foreground))",
//             primary: {
//                 DEFAULT: "#FFE7B7", // Primary color as specified
//                 foreground: "hsl(var(--primary-foreground))",
//             },
//             secondary: {
//                 DEFAULT: "hsl(var(--secondary))",
//                 foreground: "hsl(var(--secondary-foreground))",
//             },
//             destructive: {
//                 DEFAULT: "hsl(var(--destructive))",
//                 foreground: "hsl(var(--destructive-foreground))",
//             },
//             muted: {
//                 DEFAULT: "hsl(var(--muted))",
//                 foreground: "hsl(var(--muted-foreground))",
//             },
//             accent: {
//                 DEFAULT: "hsl(var(--accent))",
//                 foreground: "hsl(var(--accent-foreground))",
//             },
//             popover: {
//                 DEFAULT: "hsl(var(--popover))",
//                 foreground: "hsl(var(--popover-foreground))",
//             },
//             card: {
//                 DEFAULT: "hsl(var(--card))",
//                 foreground: "hsl(var(--card-foreground))",
//             },
//             amber: {
//                 50: "#FFF8E1",
//                 100: "#FFECB3",
//                 200: "#FFE082",
//                 300: "#FFD54F",
//                 400: "#FFCA28",
//                 500: "#FFC107",
//                 600: "#FFB300",
//                 700: "#FFA000",
//                 800: "#FF8F00",
//                 900: "#FF6F00",
//             },
//         },
//         borderRadius: {
//             lg: "var(--radius)",
//             md: "calc(var(--radius) - 2px)",
//             sm: "calc(var(--radius) - 4px)",
//         },
//         keyframes: {
//             "accordion-down": {
//                 from: { height: "0" },
//                 to: { height: "var(--radix-accordion-content-height)" },
//             },
//             "accordion-up": {
//                 from: { height: "var(--radix-accordion-content-height)" },
//                 to: { height: "0" },
//             },
//         },
//         animation: {
//             "accordion-down": "accordion-down 0.2s ease-out",
//             "accordion-up": "accordion-up 0.2s ease-out",
//         },
//     },
// };
// export const plugins = [require("tailwindcss-animate")];
  



const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./src/**/*.{js,jsx}",
        "*.{js,jsx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "#FFE7B7", // Primary color as specified
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                amber: {
                    50: "#FFF8E1",
                    100: "#FFECB3",
                    200: "#FFE082",
                    300: "#FFD54F",
                    400: "#FFCA28",
                    500: "#FFC107",
                    600: "#FFB300",
                    700: "#FFA000",
                    800: "#FF8F00",
                    900: "#FF6F00",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}

export default config
