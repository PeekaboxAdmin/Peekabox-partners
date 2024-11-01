// BrandCreated.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
export{}

const SurpriseBagCreated: React.FC = () => {
  const navigate = useNavigate();

  const handleAddMoreSurpriseBags = () => {
    navigate('/SurpriseBag'); // Navigate back to the Brand Form to add another brand
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard (ensure this route exists)
  };

  

  return (
    <div>
      <h2>Your STore and Surprise Bag are Created Successfully!</h2>
      
      
      <button onClick={handleGoToDashboard}>Go to Dashboard</button>
      
    </div>
  );
};

export default SurpriseBagCreated;
