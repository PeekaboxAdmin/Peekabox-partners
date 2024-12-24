import React from 'react';

const LanguageSettings: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-15 md:mb-12">
      <h2 className="text-xl font-semibold md:w-64 shrink-0 text-black">Language</h2>
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4 md:gap-8">
          <label className="text-sm font-semibold">Language</label>
          <select className="w-full md:w-80 rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <label className="text-sm font-semibold">Time Zone</label>
          <select className="w-full md:w-80 rounded-lg border border-gray-300 px-3 py-2 text-sm">
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
