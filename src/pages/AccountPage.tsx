import React from "react";
import { useNavigate } from "react-router-dom";
import Triangle from "../Components/Triangle/Triangle";
import HeaderBar from "../Components/HeaderBar/HeaderBar";
import Button from "../Components/Button/Button";
import "./AccountPage.css";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddBrand = () => {
    navigate('/signup/brandform');
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="account-page-outer">
      <Triangle>
        <HeaderBar>
          The Account Created Successfully!
        </HeaderBar>

        <div className="account-page-inner">
          <p className="account-page-subtitle">
            Would you like to create your brand?
          </p>

          <div className="account-page-button-row">
            <Button
              label="Go to Dashboard"
              className="px-4 py-2 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200"
              onClick={handleGoToDashboard}
            />
            <Button
              label="Create"
              className="px-6 py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"
              onClick={handleAddBrand}
            />
          </div>
        </div>
      </Triangle>
    </div>
  );
};

export default AccountPage;
