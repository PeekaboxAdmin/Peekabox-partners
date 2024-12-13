import React,{useState} from 'react';
import Switch from '../../Components/Switch';
import './Privacy.css'; 
import ExportControls from './ExportControls/ExportControls';
import ConsentAgreement from './ConsentAgreement/ConsentAgreement';

import Heading from'../../Components/Heading/Heading'


interface PrivacySetting {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const PrivacyItem: React.FC<PrivacySetting> = ({

    
  title,
  description,
  enabled,
  onToggle,
}) => (
  <div className="Privacy-item">
    <div className="Privacy-item-details">
      <h4 className="Privacy-title">{title}</h4>
      <p className="Privacy-description">{description}</p>
    </div>
    <Switch
      checked={enabled}
      onCheckedChange={onToggle}
      className="Privacy-switch"
    />
  </div>
);

const PrivacySettings: React.FC = () => {
  const [orderPrivacys, setOrderPrivacys] = React.useState(true);
  const [offerPrivacys, setOfferPrivacys] = React.useState(false);
 

  const [selectedFormat, setSelectedFormat] = useState<string>('');

  const handleFormatSelect = (format: string) => {
    setSelectedFormat(format);
    console.log('Selected format:', format); 
  };
  return (
    <>
 
    <Heading titleClassName='notification-header' title="Privacy" subtitle=''  />
    <div className="Privacy-container">
  
      <div className="Privacy-header-content">
      
       
        <div className="Privacy-content">
        <h4 className="Privacy-title">Data Export</h4>
        <p className="Privacy-description">Export order history and customer data for this branch.</p>
        <ExportControls />

        <h4 className="Privacy-title">Data Sharing preferences</h4>
        <PrivacyItem
          title="Customer Visibility"
          description={`Allow branch details, such as address and contact number,to\nbe visible to customers.`}
          enabled={orderPrivacys}
          onToggle={setOrderPrivacys}
        />

          <PrivacyItem
            title="Internal sharing"
            description="Allow data sharing withtin your orgnization to other branches."
            enabled={offerPrivacys}
            onToggle={setOfferPrivacys}
          />
          <ConsentAgreement/>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacySettings;
