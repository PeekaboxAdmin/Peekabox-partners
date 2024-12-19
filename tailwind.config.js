/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/Components/Filter/**/*.{js,ts,jsx,tsx}", // Scan all files in the Filter folder
    "./src/Sections/NotificationsPage/**/*.{js,ts,jsx,tsx}", // Scan all files in the NotificationsPage folder
    "./src/Components/Pagination/**/*.{js,ts,jsx,tsx}", // Scan all files in the Pagination folder
    "./src/Sections/SignupForm/Brand/**/*.{js,ts,jsx,tsx}",
    "./src/Components/Triangle/**/*.{js,ts,jsx,tsx}",
   "./src/Components/HeaderBar/**/*.{js,ts,jsx,tsx}",
   "./src/pages/BrandCreated.tsx",
   "./src/Sections/SignupForm/Branch/BranchForm.tsx",
   "./src/Sections/SignupForm/Branch/BranchDetails.tsx",
   "./src/Sections/SignupForm/SurpriseBag/SurpriseBagForm.tsx",
   "./src/pages/AccountPage.tsx"


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
