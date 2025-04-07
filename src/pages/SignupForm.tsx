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
import ForgotPassword from '../Sections/Login/ForgotPassword';
import ResetPassword from '../Sections/Login/ResetPassword';

import BranchDetailsForm from '../Sections/SignupForm/Branch/BranchDetailsForm';
import BranchFormStep2 from '../Sections/SignupForm/Branch/BranchFormStep2';
import BranchFormStep3 from '../Sections/SignupForm/Branch/BranchFormStep3';

import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
    const [accountData, setAccountData] = useState<any>(null);
    const [brandData, setBrandData] = useState<any>(null);
    const [branchData, setBranchData] = useState<any>(null);
    const [totalStores, setTotalStores] = useState<number | null>(null);
    const [currentBranchStep, setCurrentBranchStep] = useState(1);
    const [currentBranchIndex, setCurrentBranchIndex] = useState(1);
    const navigate = useNavigate();

    const handleAccountNext = (data: any) => {
        setAccountData(data);
    };

    const handleBrandNext = (data: any) => {
        setBrandData(data);
        setTotalStores(data.totalStores);
    };

    // const handleBranchNext = (data: any) => {
    //     setBranchData(data);
    // };

    const handleBranchNext = (data: any) => {
        setBranchData((prev: any) => ({ ...prev, ...data }));
      
        if (currentBranchStep < 3) {
          setCurrentBranchStep((prev) => prev + 1);
        } else if (totalStores && currentBranchIndex < totalStores) {
          // Finished one branch, reset step and go to next branch
          setCurrentBranchIndex((prev) => prev + 1);
          setCurrentBranchStep(1);
        } else {
          // All branches done — redirect
          navigate('/signup/login');
        }
      };
      

    const handleBranchBack = () => {
        setCurrentBranchStep((prev) => prev - 1);
    };

    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<AccountForm onNext={handleAccountNext} />} />
                <Route path="password" element={<Password/>} />
                <Route path="verify-email" element={<VerifyEmail/>} />
                <Route path="brandform" element={<BrandForm1 onNext={handleBrandNext} />} />
                <Route path="brand-created" element={<BrandCreated />} />

                {/* Branch Creation Steps */}
                <Route
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
                />


                {/* <Route 
                    path="branches" 
                    element={totalStores !== null ? <BranchForm totalStores={totalStores} onNext={handleBranchNext} /> : <Navigate to="/signup/brand" />} 
                /> */}

                <Route path="Created-Account" element={<AccountPage/>} />

                <Route path="brand-created" element={<BrandCreated />} />
                <Route path="store_surprisebag" element={<SurpriseBagCreated />} />

                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Route>
        </Routes>
    );
};

export default SignupForm;