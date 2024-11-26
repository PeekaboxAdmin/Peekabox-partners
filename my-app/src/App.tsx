import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupForm from './pages/SignupForm';

import MonthlySalesChart from './Sections/InsightPage/MonthlySalesChart/MonthlySalesChart'
import CategoryPieChart from './Sections/InsightPage/BagSold/BagSold'
import BestSellingTable from './Sections/InsightPage/BestSellingTable/BestSellingTable'

import CO2ReductionChart from'./Sections/InsightPage/CO2ReductionChart/CO2ReductionChart';
import Setting from './pages/Setting/Setting';




const App: React.FC = () => {
 
 


  return (
   
    <>
    <SignupForm/>
    
  

   
   

 

    
  
    </>
  );
};

export default App;
