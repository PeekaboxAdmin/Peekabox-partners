import React from 'react';

const LanguageSettings: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-12">
    {/* Heading */}
    <h2 className="text-lg md:text-xl font-semibold md:w-48 lg:w-64 shrink-0 text-black md:ml-16">
      Language
    </h2>
  
    {/* Fields */}
    <div className="flex-1 space-y-4 md:space-y-6">
      {/* Language Field */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 md:gap-8">
        <label className="text-sm font-semibold w-24 sm:w-auto">Language</label>
        <select className="w-full sm:w-48 md:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option>English (US)</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>
  
      {/* Time Zone Field */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 md:gap-8">
        <label className="text-sm font-semibold w-24 sm:w-auto">Time Zone</label>
        <select className="w-full sm:w-48 md:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option>Pacific Time (PT)</option>
          <option>Eastern Time (ET)</option>
          <option>Central European Time (CET)</option>
          <option>Japan Standard Time (JST)</option>
        </select>
      </div>
    </div>
  </div>
  );
};

export default LanguageSettings;
