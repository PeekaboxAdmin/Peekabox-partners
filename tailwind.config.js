/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Components/Filter/**/*.{js,ts,jsx,tsx}", // Scan all files in the Filter folder
    "./src/Sections/NotificationsPage/**/*.{js,ts,jsx,tsx}", // Scan all files in the NotificationsPage folder
    "./src/Components/Pagination/**/*.{js,ts,jsx,tsx}", // Scan all files in the Pagination folder
  ],
  theme: {
    extend: {
      colors: {
        pinkCustom: "#ff80b4",
        DarkGreen: "#194d33",
      },
    },
  },
  plugins: [],
};
