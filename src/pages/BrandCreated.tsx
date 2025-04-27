import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Triangle from "../Components/Triangle/Triangle";
import HeaderBar from "../Components/HeaderBar/HeaderBar";
import Button from "../Components/Button/Button";
import Indicators from "../Components/indicators/indicators";
import "./BrandCreated.css";
import { clearBrandAuth } from "../GlobalStateManagement/brandAuthSlice";

const BrandCreated: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddBranches = () => {
    navigate('/signup/branches');
  };

  const handleViewBranches = () => {
    navigate('/signup/view-branches');
  };

  const handleLogout = () => {
    // Clear the auth state
    dispatch(clearBrandAuth());
    
    // Remove from storage
    localStorage.removeItem("brandAuth");
    sessionStorage.removeItem("brandAuth");
    
    // Redirect to brand login
    navigate('/signup/brand-login');
  };

  return (
    <div className="brand-created-container">
      <Triangle>
        <HeaderBar>Add Branches for your Business</HeaderBar>

        <div className="brand-created-body">
          <p className="brand-created-subtitle">
            Do you want to add additional branches?
          </p>

          <div className="brand-created-button-row">
            <Button
              label="Add Branch"
              onClick={handleAddBranches}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"
            />
            <Button
              label="View All Branches"
              onClick={handleViewBranches}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200"
            />
          </div>
          <div className="mt-8 text-center">
            <Button
              label="Logout"
              onClick={handleLogout}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"
            />
          </div>
        </div>
      </Triangle>
    </div>
   );
};

export default BrandCreated;
