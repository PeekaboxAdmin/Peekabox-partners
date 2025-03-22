import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faShoppingCart, faClock, faEllipsisV,faCubes, faArrowRight, faBell} from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Sidebar from './Sidebar';
import SalesChart from './SalesChart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming axios is used for API calls
import Logo from './Images/burger.jpg'; // Default image for products
import { useSelector } from 'react-redux';
import './Dashbaord.css';
import FooterLinks from './FooterLink/FooterLinks';

import { fetchLatestOrders, SurpriseOrder} from "./OrderManagement";

interface Order {
  id: string;
  status: string;
  amount: number;
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
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  
  // Hardcoded Notifications (Temporary Until Backend is Ready)
  const notifications: Notification[] = [
    { id: 1, text: 'New order received: Donut Bag.', read: false, time: 'Just Now', icon: faBox },
    { id: 2, text: 'Order Completed: Greek Salad.', read: true, time: '10 min ago', icon: faBox },
    { id: 3, text: 'New Feedback Received: Pasta.', read: false, time: '5 min ago', icon: faBox },
    { id: 4, text: 'New Feedback Received: Pasta.', read: false, time: '5 min ago', icon: faBox },
  ];  

   // Get Store_id from Redux
    const storeId = useSelector((state: any) => state.storeAuth.Store_id);
    const navigate = useNavigate();


  // Fetch surprise bags from API
  useEffect(() => {
    const fetchBags = async () => {
      setLoading(true);
      try {
        const apiurl = process.env.REACT_APP_API_URL
        const response = await axios.get(
          `${apiurl}/api/v1/stores/${storeId}/products?page=1&limit=30&sort=desc`,
          { withCredentials: true, }
        );
        if (response.data.success) {
          const products = response.data.data.products;
          const formattedBags = products.map((product: any) => {
            const day = product.collectionSchedule.day;
            const start = product.collectionSchedule.timeWindow.start;
            const end = product.collectionSchedule.timeWindow.end;

            const collectionTime = `${day} ${start} - ${end}`;

            return {
              id: product._id,
              title: product.name,
              price: product.price.amount,
              quantity: product.quantity,
              collectionTime: collectionTime,
              soldOut: product.quantity === 0,
              available: product.isAvailable,
              imageUrl: Logo,
            };
          });
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
  

  // 2) On mount, fetch the first 5 orders from the backend
  useEffect(() => {
    const getLatest = async () => {
      setLoading(true);
      try {
        const data = await fetchLatestOrders(storeId); // returns SurpriseOrder[]
        // If your local "Order" interface differs, map it:
        const mapped = data.map((o) => ({
          id: o.id,
          status: o.status,
          amount: o.amount,
          customerName: o.customerName,
          address: o.address || "",
          datePlaced: o.datePlaced,
          quantity: o.quantity,
        }));
        setOrders(mapped);
      } catch (err) {
        console.error("Error fetching latest orders for dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    getLatest();
  }, [storeId]);
  
  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  }; 
 
  function getDayLabel(dayAbbrev: string): string {
    if (!dayAbbrev || dayAbbrev.length !== 3) {
      return dayAbbrev;
    }
    
    const dayMapping: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
    };
  
    const todayIndex = new Date().getDay();
    const scheduleDayIndex = dayMapping[dayAbbrev] ?? -1;
  
    if (scheduleDayIndex === todayIndex) {
      return "Today";
    } else if (scheduleDayIndex === (todayIndex + 1) % 7) {
      return "Tomorrow";
    } else {
      return dayAbbrev;
    }
  }

  function parseAndFormatCollectionTime(rawString: string): string {
    const pattern = /(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s\d{2}:\d{2}\s-\s\d{2}:\d{2}/g;
  
    const matches = rawString.match(pattern);
    if (!matches) {
      return rawString;
    }
  
    // Transform each match into "Today 15:31 - 17:31", etc.
    const transformed = matches.map((dayTime) => {
      const dayAbbrev = dayTime.slice(0, 3);
      const times = dayTime.slice(4);
  
      const label = getDayLabel(dayAbbrev);
      return `${label} ${times}`;
    });
  
    // Join them with commas
    return transformed.join(", ");
  }
  

  return (
    <div className="dashboard">
      <Header />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      <div className="surpricebagcontainer">
        {/* Surprise Bags Section */}

        <section className="dsurprise-bags">
          <div className="dsurprise-bags-header">
            <h2>Your Surprise Bags</h2>
          </div>
          <div className="dsurprise-bags-content">
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
                        {/* <FontAwesomeIcon icon={faClock} /> {bag.collectionTime} */}
                        <FontAwesomeIcon icon={faClock} /> {parseAndFormatCollectionTime(bag.collectionTime)}
                      </p>
                      <span className="price">AED {bag.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-surprise-bags">
                <p>No surprise bags added yet :(</p>
                <button onClick={() => navigate('/surpriseBox')} className="seeall">
                  Add Surprise Bags
                </button>
              </div>
            )}
          </div>
          <div className="dsurprise-bags-footer">
            <button onClick={() => navigate('/surpriseBox')} className="seeall">
              Go to Surprise Bag Section
            </button>
          </div>
        </section>

        
        {/* Notifications Section */}
        <section className="notifications-container">
          <h2 className="notifications-header">Notifications</h2>
          <p className="unread-count">{unreadNotificationsCount} Unread Notifications:</p>
          <div className="notifications-list">
            {notifications.map((note) => (
              <div key={note.id} className="notification-item">
                <FontAwesomeIcon icon={faBell} className="notification-icon" />
                <span className="notification-text">{note.text}</span>
                <span className="notification-time">{note.time}</span>
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </div>
            ))}
          </div>
        </section>
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
        <div className="orderdash">
          <div className="orderdash-header">
            <h2>Latest Orders</h2>
          </div>
          {/* <div className="orderdash-content">
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
          </div> */}
           <div className="orderdash-content">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-orders">
                <p>No orders available yet</p>
              </div>
            )}
          </div>
          <button onClick={() => navigate('/orderManagement')} className="seeall">
            Go to Order Section
          </button>
        </div>

        <div className="salesChart">
          <SalesChart />
        </div>
      </section>
    
      <footer className="dashboard-footer">
        <FooterLinks />
      </footer>


    </div>

  );
};

export default Dashboard;
