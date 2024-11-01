// AccountPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleAddBrand = () => {
    navigate('/brand'); // Navigate to the Brand Form
  };

  return (
    <div>
      <div>
        <h2>Account Created Successfully!</h2>
        <p>You can now add a brand.</p>
        <button onClick={handleAddBrand}>Add Brand</button> {/* Button to navigate to Brand Form */}
      </div>
    </div>
  );
};

export default AccountPage;
