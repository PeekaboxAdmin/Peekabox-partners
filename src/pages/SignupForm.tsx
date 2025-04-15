import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AccountForm from '../Sections/SignupForm/Account/AccountForm';
import BrandForm1 from '../Sections/SignupForm/Brand/BrandForm';
import { useSelector } from 'react-redux';
import BranchDetails from '../Sections/SignupForm/Branch/BranchDetails';
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
import axios from 'axios';
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

    const brandId = useSelector((state: any) => state.brandAuth.Brand_id);

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

    const handleBrandNext = async (data: Partial<BrandData>) => {
        const updated = { ...brandData, ...data }; // Assuming `brandData` is available from state
        setBrandData(updated);
      
        if (currentBrandStep === 4) {
          console.log('Final Brand Data:', updated);
      
          try {
            const apiurl = process.env.REACT_APP_API_URL;
            const response = await axios.post(
              `${apiurl}/api/v1/internal/brand/Update/${brandId}`,
              {
                name: updated.brandName,
                address: updated.brandAddress,
                ManagerEmail: updated.managerEmail,
                phoneNumber: updated.phoneNumber,
                totalStores: updated.totalStores,
                image: 'Default/PATH', 
              },
              {
                withCredentials: true
              }
            );

            if (response.status === 200) {
                navigate('/signup/brand-created');
            }
      
            // Handle response if needed
            console.log('Server response:', response.data);
      
          } catch (error) {
            console.error('Error updating brand:', error);
          }
      
          
        } else {
          setCurrentBrandStep((prevStep) => prevStep + 1);
        }
      };
      
    
    const handleBrandBack = () => {
    setCurrentBrandStep((prev) => Math.max(prev - 1, 1));
    };

    const handleBranchNext = (data: any) => {
        setBranchData(data);
    };



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

                <Route path="branches" element={<BranchDetails/>} />
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