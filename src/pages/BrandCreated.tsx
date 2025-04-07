import React from "react";
import { useNavigate } from "react-router-dom";
import Triangle from "../Components/Triangle/Triangle";
import HeaderBar from "../Components/HeaderBar/HeaderBar";
import Button from "../Components/Button/Button";
import Indicators from "../Components/indicators/indicators";
import "./BrandCreated.css";

const BrandCreated: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/');
  };


  const handleAddBranches = () => {
    navigate('/signup/branches');
  };

  return (
    <div className="brand-created-container">
      <Triangle>
        <HeaderBar>Brand Created Successfully!</HeaderBar>

        <div className="brand-created-body">
          <p className="brand-created-subtitle">
            What would you like to do next?
          </p>

          <div className="brand-created-button-row">
            <Button
              label="Go to Dashboard"
              onClick={handleGoToDashboard}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200"
            />
            <Button
              label="Add Branches"
              onClick={handleAddBranches}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"
            />
          </div>
        </div>
      </Triangle>
    </div>
   );
};

export default BrandCreated;
