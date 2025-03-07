import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashbaord'; 
import SurpriseBoxManagement from './Components/SurpriseBox';
import OrderManagement from './Components/OrderManagement';
import CustomerFeedback from './Components/CustomerFeedback';
import IncomePayment from './Components/IncomePayment';
import HelpPage from './Components/Help';
import StoreInfo from './Components/StoreManagement';
import SignupForm from './pages/SignupForm';
import SettingsPage from './pages/Setting/Setting';
import StoreCreate from './Components/StoreCreate';
import NotificationPage from './pages/NotifcationPage/NotifcationPage';
import OrderNotification from './Components/OrderNotification';

import store from './GlobalStateManagement/store'; 
import './App.css';

const socket = io('wss://api-backend.peekabox.net', {
  transports: ['websocket'],
  secure: true,
  withCredentials: true,
});

const AppContent: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    socket.on('newOrderNotification', () => {
      setShowNotification(true);
    });

    return () => {
      socket.off('newOrderNotification');
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orderManagement" element={<OrderManagement />} />
        <Route path="/surpriseBox" element={<SurpriseBoxManagement />} />
        <Route path="/storeManagement" element={<StoreInfo />} />
        <Route path="/userManagement" element={<SettingsPage />} />
        <Route path="/incomePayment" element={<IncomePayment />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/signup/*" element={<SignupForm />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/StoreCreate" element={<StoreCreate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Display OrderNotification when a new order is received */}
      {showNotification && <OrderNotification />}
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
