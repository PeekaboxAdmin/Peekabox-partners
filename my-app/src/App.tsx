<<<<<<< HEAD
// src/App.tsx
import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashbaord';
import SurpriseBoxManagement from './Components/SurpriseBox';
import OrderManagement from './Components/OrderManagement';
import './App.css';
import CustomerFeedback from './Components/CustomerFeedback';
import StoreInfo from './Components/StoreManagement';
import IncomeAndPayment from './Components/IncomePayment';
import { FaSymbol } from '@fortawesome/fontawesome-svg-core';
import { faHamburger, faQuestion, faSubway } from '@fortawesome/free-solid-svg-icons';

// Define the type for notifications
interface Notification { 
    id: number;
    text: string;
    read: boolean;
    time: string;
    icon: any;
}
=======
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupForm from './pages/SignupForm';

const App: React.FC = () => {
 


  return (
   
    <>
    <SignupForm/>
    

    
    </>
  );
};
>>>>>>> b66c300b70e0bc51dbe42c58cdb3a2fc106557c1

// Define the type for orders
interface Order {
    id: number;
    status: string;
    amount: string;
    customerName: string;
    address: string;
    datePlaced: string;
    quantity: number;
    // Optional properties for SurpriseOrder compatibility
    pickUpTime?: string;
    receipt?: string;
}

// SurpriseOrder extends Order with required fields
interface SurpriseOrder extends Order {
    pickUpTime: string;
    receipt: string;
}

Chart.register(...registerables);

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const [orders, setOrders] = useState<Order[]>([
        { 
            id: 1, 
            status: 'Completed', 
            amount: '15 AED', 
            customerName: 'Alice Johnson', 
            address: '123 Elm St, Dubai', 
            datePlaced: '2023-10-20 14:30', 
            quantity: 2 
        },
        { 
            id: 2, 
            status: 'Completed', 
            amount: '10 AED', 
            customerName: 'John Smith', 
            address: '45 Maple Ave, Dubai', 
            datePlaced: '2023-10-21 09:15', 
            quantity: 1 
        },
        { 
            id: 3, 
            status: 'Canceled', 
            amount: '20 AED', 
            customerName: 'Maria Garcia', 
            address: '789 Oak Rd, Dubai', 
            datePlaced: '2023-10-22 16:45', 
            quantity: 3 
        },
        { 
            id: 4, 
            status: 'Pending', 
            amount: '20 AED', 
            customerName: 'Tom Brown', 
            address: '456 Pine St, Dubai', 
            datePlaced: '2023-10-22 17:15', 
            quantity: 1 
        },
    ]);

    // Hardcoded notifications
    const notifications: Notification[] = [
        { id: 1, text: 'New order received: Pizza', read: false, time: 'Just now', icon: faSubway },
        { id: 2, text: 'Order completed: Burger', read: false, time: '5 minutes ago', icon: faHamburger },
        { id: 3, text: 'New feedback received for Sushi', read: false, time: '10 minutes ago', icon: faQuestion },
    ];

    const unreadNotificationsCount = notifications.filter(n => !n.read).length;
    const completedOrdersCount = orders.filter(order => order.status === 'Completed').length;

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Action handlers for order status updates
    const markAsCompleted = (id: number) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: 'Completed' } : order
        ));
    };

    const markAsPending = (id: number) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: 'Pending' } : order
        ));
    };

    const cancelAndRefund = (id: number) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: 'Canceled' } : order
        ));
    };

    // Convert Order[] to SurpriseOrder[] by adding default values for missing properties
    const ordersWithDefaults: SurpriseOrder[] = orders.map(order => ({
        ...order,
        pickUpTime: order.pickUpTime || 'Not set',   // Default pickUpTime if missing
        receipt: order.receipt || 'No receipt'       // Default receipt if missing
    }));

    return (
        <div className="App">
            <Sidebar
                isOpen={isSidebarOpen} 
                onToggle={handleToggleSidebar}
                onNavClick={(section) => setActiveSection(section)} // Set active section
            />
            <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
                {activeSection === 'dashboard' && (
                    <Dashboard
                        orders={orders}
                        notifications={notifications}
                        completedOrdersCount={completedOrdersCount}
                        unreadNotificationsCount={unreadNotificationsCount}
                        handleToggleSidebar={handleToggleSidebar}
                        markAsCompleted={markAsCompleted}
                    />
                )}
                {activeSection === 'surpriseBox' && <SurpriseBoxManagement />}

                {/* Render OrderManagement component with orders including default values */}
                {activeSection === 'orderManagement' && (
                    <OrderManagement
                        surpriseOrders={ordersWithDefaults}
                        markAsCompleted={markAsCompleted}
                        markAsPending={markAsPending}
                        cancelAndRefund={cancelAndRefund}
                    />
                )}

                {activeSection === 'customerFeedback' && (
                    <CustomerFeedback /> 
                )}

                {activeSection === 'storeManagement' && (
                    <StoreInfo /> 
                )}

                {activeSection === 'incomePayment' && (
                    <IncomeAndPayment /> 
                )}
            </div>
        </div>
    );
};

export default App;
