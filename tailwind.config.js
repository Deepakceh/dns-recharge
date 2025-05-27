/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,jsx,ts,tsx}", // Include ShadCN files

  ],

  plugins: [require("tailwindcss-animate")],
}

