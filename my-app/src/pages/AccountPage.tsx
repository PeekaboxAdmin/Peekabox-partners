
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddBrand = () => {
    navigate('/signup/brand');
  };

  return (
    <div>
      <div>
        <h2>Account Created Successfully!</h2>
        <p>You can now add a brand.</p>
        <button onClick={handleAddBrand}>Add Brand</button>
      </div>
    </div>
  );
};

export default AccountPage;
