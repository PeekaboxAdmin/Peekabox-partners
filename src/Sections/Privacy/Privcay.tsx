import React from 'react';

import ConsentAgreement from './ConsentAgreement/ConsentAgreement';
import ExportControls from './ExportControls/ExportControls';

const PrivacySettings: React.FC = () => {




  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-12">
      <h2 className="text-xl  font-semibold md:w-64 shrink-0 text-black ">Privacy</h2>
      <div className="flex-1 space-y-6">
       {/* <ExportControls/> */}


        <ConsentAgreement />
      </div>
    </div>
  );
};

export default PrivacySettings;
