
import React from 'react';
import { useNavigate } from 'react-router-dom';
export{}

const SurpriseBagCreated: React.FC = () => {
  const navigate = useNavigate();

  const handleAddMoreSurpriseBags = () => {
    navigate('/signup/SurpriseBag');
  };

  const handleGoToDashboard = () => {
    navigate('/signup/dashboard');
  };

  

  return (
    <div>
      <h2>Your STore and Surprise Bag are Created Successfully!</h2>
      
      
      <button onClick={handleGoToDashboard}>Go to Dashboard</button>
      
    </div>
  );
};

export default SurpriseBagCreated;
