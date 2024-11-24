import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faShoppingCart, faClock } from '@fortawesome/free-solid-svg-icons';
import './Dashbaord.css';
import Header from '../Components/Header';
import Logo from './Images/burger.jpg'


interface Order {
    id: number;
    status: string;
    amount: string;
    customerName: string;
    address: string;
    datePlaced: string;
    quantity: number;
}

interface Notification {
    id: number;
    text: string;
    read: boolean;
    time: string;
    icon: typeof faBox;
}

interface DashboardProps {
    orders: Order[];
    notifications: Notification[];
    completedOrdersCount: number;
    unreadNotificationsCount: number;
    handleToggleSidebar: () => void;
    markAsCompleted: (id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    orders,
    notifications,
    completedOrdersCount,
    unreadNotificationsCount,
    handleToggleSidebar,
    markAsCompleted
}) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
        handleToggleSidebar();
    };

    const overviewData = {
        labels: ['Total Sales', 'Food Items Saved', 'Earnings', 'Reviews'],
        datasets: [
            {
                label: 'Statistics',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
            },
        ],
    };

    // Mock data for the "Surprise Bags" section
    const surpriseBags = [
        { title: "Banana Puddings", quantity: "3", price: "12.00", time: "Today 13:00 - 15:00", imgSrc: Logo },
        { title: "Cookies", quantity: "6", price: "8.50", time: "Tomorrow 12:00 - 13:30", imgSrc: Logo },
        { title: "Combo Pack", quantity: "4", price: "15.00", time: "Tomorrow 17:30 - 18:30", imgSrc: Logo },
    ];

    return (
        <div className="dashboard">
        <Header/>
            <h1>Dasboard</h1>
            
            <div className='first-grid'>
            {/* New Surprise Bags Section */}
            <section className="surprise-bags">
                <h2>Your Surprise Bags</h2>
                <div className="surprise-bags-container">
                    {surpriseBags.map((bag, index) => (
                        <div key={index} className="surprise-bag-card">
                            <img src={bag.imgSrc} alt={bag.title} className="surprise-bag-image" />
                            <h3>{bag.title}</h3>
                            <p>
                                <FontAwesomeIcon icon={faBox} /> {bag.quantity} items
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faShoppingCart} /> Price: ${bag.price}
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faClock} /> Available: {bag.time}
                            </p>
                        </div>
                    ))}
                </div>
                <button className="seeall">All Surprise Boxes</button>
            </section>
            
             {/* New Surprise Bags Section */}
            <div className="card notification-card">
                    <h2>Notifications</h2>
                    <div className="notification-count">
                        Unread Notifications: <span>{unreadNotificationsCount}</span>
                    </div>
                    <ul>
                        {notifications.map(note => (
                            <li
                                key={note.id}
                                className={`notification-item ${note.read ? 'read' : 'unread'}`}
                            >
                                <FontAwesomeIcon icon={note.icon} className="notification-icon" />
                                {note.text} <span className="notification-time">{note.time}</span>
                                {note.read ? (
                                    <span className="badge">Read</span>
                                ) : (
                                    <span className="badge unread">New</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button className="seeall">See all</button>
                </div>
                </div>


            <section className="first-grid">
                <div className="orderdash">
                    <h2>Latest Orders</h2>
                    <div className="notification-count">
                        Completed Orders: <span>{completedOrdersCount}</span>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Order Date</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.customerName}</td>
                                    <td>{order.address}</td>
                                    <td>{order.datePlaced}</td>
                                    <td>{order.quantity}</td>
                                    <td><span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                                    <td>
                                        {order.status !== 'Completed' && (
                                            <button 
                                                onClick={() => markAsCompleted(order.id)} 
                                                className="complete-btn"
                                            >
                                                Mark as Completed
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="seeall">See All</button>
                </div>

                

               {/* <div className="OverViewcard">
                    <h2>Sales</h2>
                    <Bar data={overviewData} />
                    <button className="seeall">Go to insights</button>
                </div> */}
            </section> 
        </div>
    );
};

export default Dashboard;
