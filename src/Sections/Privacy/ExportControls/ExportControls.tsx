import React, { useState } from 'react';

import './ExportControls.css';
import Dropdown from '../../../Components/Dropdown/Dropdown';
import Button from '../../../Components/Button/Button';



const ExportControls: React.FC = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [format, setFormat] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="export-controls">
      
      <Button label="Download Data" loading={loading} className='bink-button' />
       <div className='dropdown-container1 '>
      <Dropdown
      selectedOption={format}
      options={['CSV', 'Excel', 'JSON']}
      onSelect={setFormat}
      placeholder="Select format"
      buttonLabel="Download Data"
      dropdownType="General"
    />
    </div>
    </div>
  );
};

export default ExportControls;
