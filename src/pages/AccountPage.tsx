import React from "react";
import { useNavigate } from "react-router-dom";
import Triangle from "../Components/Triangle/Triangle";
import HeaderBar from "../Components/HeaderBar/HeaderBar";

import Button from "../Components/Button/Button";







const AccountPage: React.FC = () => {
    const Navigate = useNavigate();
    const HandleAddBrand=()=>{
        Navigate('/signup/brandform')

    }

    const HandleGoToDashboard=()=>{
      Navigate('/')

    }
  return (
      <>
      <div className="space-y-4">

    <Triangle>


        <HeaderBar>
       The Account Created Successfully!

        </HeaderBar>


        <p className="text-3xl font-semibold text-pinkCustom mb-6 text-center">
         would you like to Creat Your Brand?
        </p>


        <div className="flex justify-end space-x-4 mt-4 px-4 pb-4">


          <Button label='Go to dashboard'
          className="px-4 py-2 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md  transition duration-200"

          onClick={HandleGoToDashboard}

                    />

          <Button label='Create'
          className="px-6 py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md  transition duration-200"
          onClick={HandleAddBrand}


        />








</div>








    </Triangle>
    </div>
    </>






  );
};

export default AccountPage;
