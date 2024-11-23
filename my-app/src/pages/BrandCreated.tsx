
import React from 'react';
import { useNavigate } from 'react-router-dom';
export{}

const BrandCreated: React.FC = () => {
  const navigate = useNavigate();

 

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleAddBranches = () => {
    navigate('/branches');
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
