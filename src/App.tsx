import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashbaord';
import SurpriseBoxManagement from './Components/SurpriseBox';
import OrderManagement from './Components/OrderManagement';
import CustomerFeedback from './Components/CustomerFeedback';
import StoreInfo from './Components/StoreManagement';
import SignupForm from './pages/SignupForm';
import SettingsPage from './pages/Setting/Setting';
import StoreCreate from './Components/StoreCreate'
import NotificationPage from './pages/NotifcationPage/NotifcationPage';
import './App.css';
import store from './GlobalStateManagement/store'; 
import { Provider } from 'react-redux';
//import './Utils/authUtil';

const AppContent: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English (United Kingdom)');

    return (
        <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/orderManagement" element={<OrderManagement/>}/> 
                    <Route path="/surpriseBox" element={<SurpriseBoxManagement />} />
                    {/*<Route path="/customerFeedback" element={<CustomerFeedback />} />*/}
                    <Route path="/storeManagement" element={<StoreInfo />} />
                    <Route path="/userManagement" element={<SettingsPage />} />
                    <Route path="/signup/*" element={<SignupForm />} />
                    <Route path="/notifications" element={<NotificationPage />} />
                    <Route path="/StoreCreate" element={<StoreCreate/>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
    );
};

const App: React.FC = () => (
    <Provider store={store}>
    <Router>
        <AppContent />
    </Router>
    </Provider>
);

export default App;
