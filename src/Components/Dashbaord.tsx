import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faShoppingCart, faClock, faEllipsisV,faCubes} from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Sidebar from './Sidebar';
import SalesChart from './SalesChart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming axios is used for API calls
import Logo from './Images/burger.jpg'; // Default image for products
import { useSelector } from 'react-redux';
import './Dashbaord.css';

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

interface SurpriseBag {
  id: string;
  title: string;
  price: number;
  quantity: number;
  available: boolean;
  collectionTime: string;
  soldOut: boolean;
  imageUrl: string;
}

const Dashboard: React.FC = () =>
     {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [surpriseBags, setSurpriseBags] = useState<SurpriseBag[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  

   // Get Store_id from Redux
    const storeId = useSelector((state: any) => state.storeAuth.Store_id);


  const navigate = useNavigate();


  // Fetch surprise bags from API-----------------------------------------------------------------
  useEffect(() => {
    const fetchBags = async () => {
      setLoading(true);
      try {
        const apiurl = process.env.REACT_APP_API_URL
        const response = await axios.get(
          `${apiurl}/api/v1/stores/${storeId}/products?page=1&limit=30&sort=desc`,
          { withCredentials: true }
        );
        if (response.data.success) {
          const products = response.data.data.products;
          const formattedBags = products.map((product: any) => ({
            id: product._id,
            title: product.name,
            price: product.price.amount,
            quantity: product.quantity,
            collectionTime: `${product.collectionSchedule.day} ${product.collectionSchedule.timeWindow.start} - ${product.collectionSchedule.timeWindow.end}`,
            soldOut: product.quantity === 0,
            available: product.isAvailable,
            imageUrl: Logo,
          }));
          setSurpriseBags(formattedBags);
        } else {
          console.error('Error fetching data:', response.data.errorMessage);
        }
      } catch (error) {
        console.error('Error fetching surprise bags:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBags();
  }, [storeId]);
  

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  }; 
 

  return (
    <div className="dashboard">
      <Header />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      <div className="surpricebagcontainer">
        {/* Surprise Bags Section */}
  <section className="dsurprise-bags">
    <h2>Your Surprise Bags</h2>
    {loading ? (
      <p>Loading...</p>
    ) : surpriseBags.length > 0 ? (
      <div className="dsurprise-bags-container">
        {surpriseBags.slice(0, 3).map((bag) =>  (
          <div key={bag.id} className="dsurprise-bag-card">
            <div className={`dsurprise-bag-badge ${bag.available ? 'available' : 'sold-out'}`}>
              {bag.available ? 'Available' : 'Sold Out'}
            </div>
            <img src={bag.imageUrl} alt={bag.title} className="dsurprise-bag-image" />
            <h3>{bag.title}</h3>
            <p>
              <FontAwesomeIcon icon={faCubes} /> Quantity selling per day {bag.quantity}
            </p>
            <div className="price-availability-container">
              <p className="avail-info">
                <FontAwesomeIcon icon={faClock} /> {bag.collectionTime}
              </p>
              <span className="price">AED {bag.price}</span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-surprise-bags">
        <p>No surprise bags added yet :( </p>
        <button onClick={() => navigate('/surpriseBox')} className="seeall">
          Add Surprise Bags
        </button>
      </div>
    )}

<button onClick={() => navigate('/surpriseBox')} className="seeall">
      Go to Surprise Bag Section
    </button>
  </section>

        
      {/* Notifications Section */}

      {/*
<div className="notification-card">
  <h2>Notifications</h2>
  {loading ? (
    <p>Loading...</p>
  ) : notifications.length > 0 ? (
    <>
      <div className="notification-count">
        Unread Notifications: <span>{unreadNotificationsCount}</span>
      </div>
      <ul>
        {notifications.map((note) => (
          <li key={note.id} className={`notification-item ${note.read ? 'read' : 'unread'}`}>
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
      <button onClick={() => navigate('/notifications')} className="seeall">
        See all
      </button>
    </>
  ) : (
    <div className="no-notifications">
      <p> No notifications yet</p>
    </div>
  )}
</div>

*/}
</div>

      {/* Orders and Sales Chart */}
<section className="first-grid">
  {/*<div className="orderdash">
    <h2>Latest Orders</h2>
    <div className="notification-count">
  
    </div>
    {loading ? (
      <p>Loading...</p>
    ) : orders.length > 0 ? (
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
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.address}</td>
              <td>{order.datePlaced}</td>
              <td>{order.quantity}</td>
              <td>
                <span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span>
              </td>
              <td>
                <div className="action-menu-container">
                  <button className="menu-btn" onClick={() => toggleMenu(order.id)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {activeMenu === order.id && (
                    <div className="action-menu">
                      <button onClick={() => console.log(`Cancel Order ${order.id}`)}>
                        Cancel
                      </button>
                      <button onClick={() => console.log(`Refund Order ${order.id}`)}>
                        Refund
                      </button>
                      <button onClick={() => console.log(`Mark Order ${order.id} as Pending`)}>
                        Pending
                      </button>
                      <button onClick={() => console.log(`Mark Order ${order.id} as Delivered`)}>
                        Delivered
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="no-orders">
        <p>No orders available yet</p>
      </div>
    )}
    <button onClick={() => navigate('/orderManagement')} className="seeall">
      Go to Order Section
    </button>
  </div> */}


  <div className="salesChart">
    <SalesChart />
  </div>
</section>

    </div>
  );
};

export default Dashboard;
