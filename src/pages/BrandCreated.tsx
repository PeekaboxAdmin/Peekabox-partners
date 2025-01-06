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
     <div className="space-y-6 px-2 sm:px-6 lg:px-8 mt-6 sm:mt-10">
       <Triangle>
         <HeaderBar>
           Brand Created Successfully!
         </HeaderBar>
         <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-pinkCustom mb-4 sm:mb-6 text-center px-2 sm:px-4">
           What would you like to do next?
         </p>

         <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-6 px-3 sm:px-4 pb-4">
           <Button
             label="Go to Dashboard"
             onClick={handleGoToDashboard}
             className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200"
           />
           <Button
             label="Add Branches"
             onClick={handleAddBranches}
             className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"
           />
         </div>
       </Triangle>
     </div>
   );
};

export default BrandCreated;
