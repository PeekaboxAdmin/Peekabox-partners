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


const SignupForm: React.FC = () => {
    const [accountData, setAccountData] = useState<any>(null);
    const [brandData, setBrandData] = useState<any>(null);
    const [branchData, setBranchData] = useState<any>(null);
    const [totalStores, setTotalStores] = useState<number | null>(null);
   

    const handleAccountNext = (data: any) => {
        setAccountData(data);
    };

    const handleBrandNext = (data: any) => {
        setBrandData(data);
        setTotalStores(data.totalStores);
    };

    const handleBranchNext = (data: any) => {
        setBranchData(data);
    };

    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<AccountForm onNext={handleAccountNext} />} />
                <Route path="brandform" element={<BrandForm1 onNext={handleBrandNext} />} />
              
                <Route 
                    path="branches" 
                    element={totalStores !== null ? <BranchForm totalStores={totalStores} onNext={handleBranchNext} /> : <Navigate to="/signup/brand" />} 
                />
                <Route path="Created-Account" element={<AccountPage/>} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="password" element={<Password/>} />
                <Route path="brand-created" element={<BrandCreated />} />
                <Route path="store_surprisebag" element={<SurpriseBagCreated />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    );
};

export default SignupForm;