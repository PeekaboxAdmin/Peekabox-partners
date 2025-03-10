import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
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

import store from './GlobalStateManagement/store'; 
import './App.css';

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const AppContent: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

// need to more this from here 
  /*const firebaseConfig = {
    apiKey: "AIzaSyCeNCZLpi4AVCR1FXg_FiUrGmoNWnxny2A",
    authDomain: "peekabox-dd3c8.firebaseapp.com",
    projectId: "peekabox-dd3c8",
    storageBucket: "peekabox-dd3c8.firebasestorage.app",
    messagingSenderId: "984679613645",
    appId: "1:984679613645:web:f3664d523876562ddd1584",
    measurementId: "G-W7LR5YBK6M"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


useEffect(() => {
  // Request permission for notifications
  const requestNotificationPermission = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: 'your-vapid-key', // You can get this from Firebase Console
      });
      if (token) {
        console.log('FCM Token:', token);

        // Send token to your backend to associate it with the user or store it
        // Example: sendTokenToBackend(token);
      } else {
        console.log('No registration token available');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  // Listen for incoming messages while the app is in the foreground
  onMessage(messaging, (payload) => {
    console.log('Message received: ', payload);
    // Handle the notification and display it
    //alert('New Notification: ' + payload.notification.title);
  });

  requestNotificationPermission();

  // Cleanup on unmount
  return () => {
    // Cleanup Firebase listeners, if necessary
  };
}, []);

*/

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
