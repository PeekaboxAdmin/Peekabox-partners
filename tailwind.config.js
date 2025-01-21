/** @type {import('tailwindcss').Config} */






module.exports = {
  content: [
    "./src/Components/Filter/**/*.{js,ts,jsx,tsx}", // Scan all files in the Filter folder
    "./src/Sections/NotificationsPage/**/*.{js,ts,jsx,tsx}",
     // Scan all files in the NotificationsPage folder
    "./src/Components/Pagination/**/*.{js,ts,jsx,tsx}", // Scan all files in the Pagination folder
    "./src/Sections/SignupForm/Brand/**/*.{js,ts,jsx,tsx}",
    "./src/Components/Triangle/**/*.{js,ts,jsx,tsx}",
   "./src/Components/HeaderBar/**/*.{js,ts,jsx,tsx}",
   "./src/pages/AccountPage.tsx",
   "./src/pages/BrandCreated.tsx",
   "./src/Sections/SignupForm/Branch/BranchForm.tsx",
   "./src/Sections/SignupForm/Branch/BranchDetails.tsx",
   "./src/Sections/SignupForm/SurpriseBag/SurpriseBagForm.tsx",
   "./src/Sections/Notification/Notification.tsx",
   "./src/Sections/Privacy/Privcay.tsx",
   "./src/Sections/Language/Language.tsx",
   "./src/pages/Setting/Setting.tsx",
   "./src/pages/NotifcationPage/NotifcationPage.tsx",
   "./src/Components/Switch.tsx",
   "./src/Sections/Privacy/ExportControls.tsx",
    "./src/Sections/PaymentDetails.tsx",
    "./src/Sections/InsightPage/CO2ReductionChart/CO2ReductionChart.tsx",
    "./src/Sections/Login/Login.tsx",
    "./src/Sections/SignupForm/Account/AccountForm.tsx",
    "./src/Components/Header.tsx",
    "./src/Components/Sidebar.tsx",
    "./src/Components/Switch.tsx",
    


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
