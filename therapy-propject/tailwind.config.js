import { plugin } from "postcss";
// @type {import("tailwindcss").Config};

export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], 
    theme: {
        extend: {
            colors: {
                // This isn't working
                'light-green': {'500': '#D9E4DD'}, 
            },
        },
    },
    plugins: [],
}