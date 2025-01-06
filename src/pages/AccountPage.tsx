import React from "react";
import { useNavigate } from "react-router-dom";
import Triangle from "../Components/Triangle/Triangle";
import HeaderBar from "../Components/HeaderBar/HeaderBar";
import Button from "../Components/Button/Button";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddBrand = () => {
    navigate('/signup/brandform');
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 mt-10">
      <Triangle>
        <HeaderBar>
          The Account Created Successfully!
        </HeaderBar>

        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-pinkCustom mb-6 text-center">
          Would you like to create your brand?
        </p>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-6 mt-6 px-4 pb-6">
          <Button
            label="Go to Dashboard"
            className="px-4 py-2 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200 w-full sm:w-auto"
            onClick={handleGoToDashboard}
          />

          <Button
            label="Create"
            className="px-6 py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200 w-full sm:w-auto"
            onClick={handleAddBrand}
          />
        </div>
      </Triangle>
    </div>
  );
};

export default AccountPage;
