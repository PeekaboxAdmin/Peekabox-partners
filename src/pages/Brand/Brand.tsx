import React from "react";
import { useNavigate } from "react-router-dom";
import Triangle from "../../Components/Triangle/Triangle";
import HeaderBar from "../../Components/HeaderBar/HeaderBar";
import "./Brand.css";
import Button from "../../Components/Button/Button";
import Indicators from "../../Components/indicators/indicators";


const Brand: React.FC = () => {
    const Navigate = useNavigate();
    const HandleAddBrand=()=>{
        Navigate('/signup/brand')
        
    }
  return (
    <Triangle>
        <HeaderBar>
        <h2 className="titleR">Create a Brand</h2>
            
        </HeaderBar>

        <div className="button-t">
        <Button
              label="Back"
              
              className='back-button'
            />

           <Button
              label="Create"
              
              className='create-button'
              onClick={HandleAddBrand}
            />
            
            </div>
            <div className="progress-indicators">
            <Indicators/>
            </div>
            

            

        

    </Triangle>
   
   
      
    
      
    
  );
};

export default Brand;
