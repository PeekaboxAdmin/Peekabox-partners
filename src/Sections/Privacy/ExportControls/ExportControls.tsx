import React, { useState } from 'react';
import Switch from '../../../Components/Switch';
import Button from '../../../Components/Button/Button';





const ExportControls: React.FC = ({}) => {
  const [privacy, setPrivacy] = React.useState({
    visibility: false,
    sharing: false,
  });


  return (
    <>

    {/* Data Export Title and Description */}
    <div>
          <h4 className="text-sm font-semibold">Data Export</h4>
          <p className="text-xs text-gray-600">
            Export order history and customer data for this branch.
          </p>
        </div>

        {/* Download Data Button and Dropdown */}
       <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
         <Button
           label="Download Data"
           className="w-full sm:w-auto px-4 py-2 bg-pinkCustom text-white border-2 border-pinkCustom rounded hover:bg-pinkCustom-600"
         />
         <select
           className="w-full sm:w-auto md:w-80 rounded-lg border border-gray-300 px-3 py-2 text-sm"
         >
           <option value="pdf">PDF</option>
           <option value="csv">CSV</option>
           <option value="json">JSON</option>
         </select>
       </div>


        {/* Customer Visibility Section */}

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
          <div className="flex-1">
            <h4 className="text-sm font-semibold">Data sharing Preferences</h4>
            <h4 className="text-sm font-semibold">Customer Visibility</h4>
            <p className="text-xs text-gray-600">
              Allow branch details, such as address and contact number,<br/> to be visible to customers.
            </p>

          </div>
            <div className="pr-80 pt-10">
                                  <Switch
                                    checked={privacy.visibility}
                                    onCheckedChange={(checked) =>
                                      setPrivacy((prev) => ({ ...prev, visibility: checked }))
                                    }
                                  />
                                </div>

        </div>

        {/* Internal Sharing Section */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
          <div className="flex-1">
            <h4 className="text-sm font-semibold">Internal Sharing</h4>
            <p className="text-xs text-gray-600">
              Allow data sharing within your organization to other branches.
            </p>
          </div>
          <div className="pr-80 pt-10">
            <Switch
              checked={privacy.sharing}
              onCheckedChange={(checked) =>
                setPrivacy((prev) => ({ ...prev, sharing: checked }))
              }
            />
          </div>
        </div>


    </>

  );
};

export default ExportControls;
