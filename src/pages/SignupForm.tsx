import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AccountForm from '../Sections/SignupForm/Account/AccountForm';
import BrandForm1 from '../Sections/SignupForm/Brand/BrandForm';

import BranchForm from '../Sections/SignupForm/Branch/BranchForm';

import SurpriseBagForm from '../Sections/SignupForm/SurpriseBag/SurpriseBagForm';
import AccountPage from './AccountPage';
import BrandCreated from './BrandCreated';
import VerifyEmail from '../Sections/SignupForm/Account/VerifyEmail';
import Password from '../Sections/SignupForm/Account/Password';
import SurpriseBagCreated from '../pages/SurpriseBagCreated';
import Login from '../Sections/Login/Login';
import BrandLogin from '../Sections/Login/BrandLogin';
import ForgotPassword from '../Sections/Login/ForgotPassword';
import ResetPassword from '../Sections/Login/ResetPassword';

import BrandDetailsForm from '../Sections/SignupForm/Brand/BrandDetailsForm';
import BrandFormStep2 from '../Sections/SignupForm/Brand/BrandFormStep2';
import BrandFormStep3 from '../Sections/SignupForm/Brand/BrandFormStep3';
import BrandFormStep4 from '../Sections/SignupForm/Brand/BrandFormStep4';

import { useNavigate } from 'react-router-dom';
import ViewBranches from './ViewBranches';

interface BrandData {
    brandName?: string;
    brandAddress?: string;
    phoneNumber?: string;
    brandCode?: string;
    totalStores?: number;
    managerEmail?: string;
    password?: string;
    brandLogo?: File | null;
}
  
const SignupForm: React.FC = () => {
    const [accountData, setAccountData] = useState<any>(null);
    const [brandData, setBrandData] = useState<BrandData>({});
    const [currentBrandStep, setCurrentBrandStep] = useState(1);
    const [branchData, setBranchData] = useState<any>(null);
    const [totalStores, setTotalStores] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleAccountNext = (data: any) => {
        setAccountData(data);
    };

    // const handleBrandNext = (data: any) => {
    //     setBrandData(data);
    //     setTotalStores(data.totalStores);
    // };

    // const handleBrandNext = (data: any) => {
    //     setBrandData((prev) => ({ ...prev, ...data }));
        
    //     if (data.totalStores) {
    //         setTotalStores(data.totalStores); // Still supports setting totalStores if passed
    //     }
    
    //     setCurrentBrandStep((prev) => prev + 1);
    // };

    const handleBrandNext = (data: Partial<BrandData>) => {
        setBrandData((prev) => {
          const updated = { ...prev, ...data };
      
          if (currentBrandStep === 4) {
            console.log('Final Brand Data:', updated);
            navigate('/signup/brand-created');
          } else {
            setCurrentBrandStep((prevStep) => prevStep + 1);
          }
      
          return updated;
        });
    };
    
    const handleBrandBack = () => {
    setCurrentBrandStep((prev) => Math.max(prev - 1, 1));
    };

    const handleBranchNext = (data: any) => {
        setBranchData(data);
    };

    // const handleBranchNext = (data: any) => {
    //     // setBranchData(data);
    //     // setBranchData((prev: any) => ({ ...prev, ...data }));
      
    //     // if (currentBranchStep < 3) {
    //     //   setCurrentBranchStep((prev) => prev + 1);
    //     // } else if (totalStores && currentBranchIndex < totalStores) {
    //     //   // Finished one branch, reset step and go to next branch
    //     //   setCurrentBranchIndex((prev) => prev + 1);
    //     //   setCurrentBranchStep(1);
    //     // } else {
    //     //   // All branches done — redirect
    //     //   navigate('/signup/login');
    //     // }
    //   };
      

    // const handleBranchBack = () => {
    //     setCurrentBranchStep((prev) => prev - 1);
    // };

    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<AccountForm onNext={handleAccountNext} />} />
                <Route path="password" element={<Password/>} />
                <Route path="verify-email" element={<VerifyEmail/>} />

                {/* <Route path="brandform2" element={<BrandForm1 onNext={handleBrandNext} />} /> */}

                <Route path="brandform" element={
                    currentBrandStep === 1 ? (
                        <BrandDetailsForm onNext={handleBrandNext} />
                    ) : currentBrandStep === 2 ? (
                        <BrandFormStep2
                        onNext={handleBrandNext}
                        onBack={handleBrandBack}
                        />
                    ) : currentBrandStep === 3 ? (
                        <BrandFormStep3
                        onNext={handleBrandNext}
                        onBack={handleBrandBack}
                        />
                    ) : (
                        <BrandFormStep4
                        onNext={handleBrandNext}
                        onBack={handleBrandBack}
                        />
                    )
                    } 
                />

                <Route path="brand-created" element={<BrandCreated />} />

                {/* Branch Creation Steps */}
                {/* <Route
                path="branches"
                element={
                    currentBranchStep === 1 ? (
                    <BranchDetailsForm
                        onNext={handleBranchNext}
                        branchNumber={currentBranchIndex}
                        totalStores={totalStores!}
                    />
                    ) : currentBranchStep === 2 ? (
                    <BranchFormStep2
                        onNext={handleBranchNext}
                        onBack={handleBranchBack}
                        branchNumber={currentBranchIndex}
                        totalStores={totalStores!}
                    />
                    ) : (
                    <BranchFormStep3
                        onNext={handleBranchNext}
                        onBack={handleBranchBack}
                        branchNumber={currentBranchIndex}
                        totalStores={totalStores!}
                    />
                    )
                }
                /> */}

                <Route path="branches" element={<BranchForm onNext={handleBranchNext} />} />
                <Route path="view-branches" element={<ViewBranches />} />

                <Route path="Created-Account" element={<AccountPage/>} />

                <Route path="brand-created" element={<BrandCreated />} />
                <Route path="store_surprisebag" element={<SurpriseBagCreated />} />

                <Route path="login" element={<Login />} />
                <Route path="brand-login" element={<BrandLogin />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Route>
        </Routes>
    );
};

export default SignupForm;