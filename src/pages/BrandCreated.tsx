import React from "react";
import { useNavigate } from "react-router-dom";
import Triangle from "../Components/Triangle/Triangle";
import HeaderBar from "../Components/HeaderBar/HeaderBar";
import Button from "../Components/Button/Button";
import Indicators from "../Components/indicators/indicators";

const BrandCreated: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/');
  };


  const handleAddBranches = () => {
    navigate('/signup/branches');
  };

  return (
       <div className="space-y-4">
    <Triangle>
      <HeaderBar>
       Brand Created Successfully!
      </HeaderBar>
      <p className="text-3xl font-semibold text-pinkCustom mb-6 text-center">
        What would you like to do next?
      </p>

      <div className="flex justify-center space-x-6 mt-6 px-4 pb-4">
        <Button
          label="Go to Dashboard"
          onClick={handleGoToDashboard}
          className="px-6 py-3 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200"
        />
        <Button
          label="Add Branches"
          onClick={handleAddBranches}
          className="px-6 py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"
        />
      </div>

    </Triangle>
    </div>
  );
};

export default BrandCreated;
