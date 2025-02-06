import React, { useState } from 'react';

import NotificationSettings from '../../Sections/Notification/Notification';
import PrivacySettings from '../../Sections/Privacy/Privcay';
import LanguageSettings from '../../Sections/Language/Language';
import PaymentDetails from '../../Sections/PaymentDetails';
import Button from '../../Components/Button/Button';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import '../../Components/Sidebar.css'
import { useNavigate } from 'react-router-dom';


const SettingsPage: React.FC = () => {

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const nav = useNavigate();

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
};
return (
  <div className="min-h-screen flex flex-col bg-[#FDFAF7] overflow-x-hidden">
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarExpanded}
        onToggle={toggleSidebar}
        onNavClick={() => {}}
        className={`
          fixed 
          w-56 
          lg:w-64
          h-screen 
          ${sidebarExpanded ? 'block' : 'hidden'} 
          lg:block 
          top-0 
          left-0 
          z-50
          transition-transform 
          transform 
          ${sidebarExpanded ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
        `}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-36">
        {/* Header */}
        <Header />

        {/* Content Section */}
        <div
          className={`
            p-4 
            sm:p-6 
            lg:p-8 
            mx-auto 
            w-full 
            max-w-7xl 
          `}
        >
          {/* Main Content Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl font-semibold mb-6 md:ml-16">Settings</h1>
  return (

        <div className="max-w-6xl mx-auto px-4 py-4">

        <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

          <div className="bg-white rounded-lg border border-gray-200 p-2 md:px-28">

            <h1 className="text-2xl font-semibold mb-6 ml-1">Settings</h1>

          {/*   <NotificationSettings />
            <hr className="border-gray-200 my-8" /> */}

             <PrivacySettings />
            <hr className="border-gray-200 my-8" /> 

          {/*  <LanguageSettings /> // Not MVP FEATURE 
            <hr className="border-gray-200 my-8" /> */}

            <PaymentDetails />

            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button
                label="Save Changes"
                className="w-full sm:w-auto px-4 py-2 bg-pinkCustom text-white border-2 border-pinkCustom rounded-lg hover:bg-pinkCustom hover:border-pinkCustom transition-colors"
              />
              <Button
                label="Cancel"
                onClick={()=> nav('/dashboard')}
                className="w-full sm:w-auto px-4 py-2 bg-white border border-pinkCustom rounded-lg text-pinkCustom hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default SettingsPage;