// BrandCreated.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
export{}

const BrandCreated: React.FC = () => {
  const navigate = useNavigate();

 

  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard (ensure this route exists)
  };

  const handleAddBranches = () => {
    navigate('/branches'); // Navigate to the Branch Form (ensure this route exists)
  };

  return (
    <div>
      <h2>Brand Created Successfully!</h2>
      <p>What would you like to do next?</p>
     
      <button onClick={handleGoToDashboard}>Go to Dashboard</button>
      <button onClick={handleAddBranches}>Add Branches to Brand</button>
    </div>
  );
};

export default BrandCreated;
