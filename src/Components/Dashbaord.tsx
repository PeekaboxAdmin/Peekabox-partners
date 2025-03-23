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

//import { fetchLatestOrders, SurpriseOrder} from "./OrderManagement";

interface Order {
  id: string;
  userId: string;
  storeId: string;
  productId: string;
  productName: string;
  quantity: number;
  salesAmount: number;
  consumerPrice: number;
  currencyCode: string;
  status: string;
  totalPrice: number;
  datePlaced: string; 
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
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [editMode, setEditMode] = useState(false);
  
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
          { withCredentials: true, }
        );
        if (response.data.success) {
          const products = response.data.data.products;
          const formattedBags = products.map((product: any) => {
            // Check if collectionSchedule exists and has data
            const collectionTimes =
              product.collectionSchedule?.length > 0
                ? product.collectionSchedule
                    .map((schedule: any) =>
                      schedule.timeWindow
                        ? `${schedule.day} ${schedule.timeWindow.start || "N/A"} - ${
                            schedule.timeWindow.end || "N/A"
                          }`
                        : `${schedule.day} No Time Specified`
                    )
                    .join(", ") // Join multiple schedules with a comma
                : "No Schedule"; // Fallback if empty or undefined
  
            return {
              id: product._id,
              title: product.name,
              price: product.price?.amount || 0, // Ensure price exists
              quantity: product.quantity || 0,
              description: product.description || "No description available",
              catagory: product.category || "Uncategorized",
              collectionTime: collectionTimes, // Updated collection schedule logic
              soldOut: product.quantity === 0,
              available: product.isAvailable ?? true, // Default to true if undefined
              imageUrl: product.image || "default_image_url_here", // Fallback for missing image
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
  

  
  useEffect(() => {
    const getLatest = async () => {
      setLoading(true);
      try {
        const apiurl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiurl}/api/v1/stores/${storeId}/ordersToday`,
          { withCredentials: true }
        );
    
        const orders = response.data.data;
    
        const formattedOrders = orders.map((order: any) => ({
          id: order._id,
          productId: order.productId,
          productName: order.productName,
          quantity: order.quantity,
          salesAmount: order.salesAmount,
          consumerPrice: order.consumerPrice,
          currencyCode: order.currencyCode || "AED", // Default currency if missing
          status: order.status,
          totalPrice: order.totalPrice,
          datePlaced: new Date(order.createdAt).toISOString().split("T")[0],
        }));

        setOrders(formattedOrders);

      } catch (err) {
        console.error("Error fetching latest orders for dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    getLatest();
  }, [storeId]); 



  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedOrders([]);
  };
 

  const handleOrderSelection = (orderId : string) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  const handleBulkAction = (action : string) => {
    console.log(`Performing ${action} on`, selectedOrders);
    setSelectedOrders([]);
  };


  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "received":
        return <div className="status-icon received"><i className="fas fa-money-bill-wave"></i></div>;
      case "completed":
        return <div className="status-icon completed"><i className="fas fa-check-circle"></i></div>;
      case "preparing":
        return <div className="status-icon preparing"><i className="fas fa-utensils"></i></div>;
      case "accepted":
        return <div className="status-icon accepted"><i className="fas fa-thumbs-up"></i></div>;
      case "ready for pickup":
        return <div className="status-icon ready"><i className="fas fa-shopping-bag"></i></div>;
      default:
        return <div className="status-icon default"><i className="fas fa-question-circle"></i></div>;
    }
};


//
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
                        <FontAwesomeIcon icon={faClock} /> {bag.collectionTime.split(',').map((time, index) => (
                  <p key={index} className="avail-info">
                    {time.trim()}
                  </p>
                ))}
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

      
      </div>

      {/* Orders and Sales Chart */}
      <section className="first-grid">
        <div className="orderdash">
          <div className="orderdash-header">
  
            <h2>Reservations for today</h2>
            <button className="editbtndash" onClick={toggleEditMode}>{editMode ? "Done" : "Edit"}</button>
            <button className="editbtndash">Refresh </button>
            {editMode && selectedOrders.length > 0 && (
          <div className="bulk-actionsdash">
            <button  onClick={() => handleBulkAction("complete")}>Mark as Complete</button>
            <button  onClick={() => handleBulkAction("cancel")}>Cancel</button>
          </div>
        )}
      

          </div>

           <div className="orderdash-content">
            {loading ? (
              <p>Loading...</p>
            ) : orders.length > 0 ? (
              <table>
                <thead>
                  <tr>
                  <th>Order No.</th>
                  <th>Order ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Sales Price</th>
                  <th>Consumer Price</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order,index) => (
                    <tr key={order.id}>
                    {editMode && (
                    <td>
                      <input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => handleOrderSelection(order.id)} />
                    </td>
                  )}
                    <td data-label="No">{index + 1}</td>
                    <td data-label="order ID">{order.id}</td>
                    <td data-label="Product Name">
                        {order.productName || "N/A"}
                      </td>
                      <td data-label="# of Bags">{order.quantity}</td>
                      <td data-label="Price">
                        {order.salesAmount}{" "}
                        {order.currencyCode || "AED"}
                      </td>
                      <td data-label="Price">
                        {order.consumerPrice}{" "}
                        {order.currencyCode || "AED"}
                      </td>
                      <td data-label="Order dAte">
                        {order.datePlaced || "N/A"}
                      </td>
                    <td data-label="Status" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {getStatusIcon(order.status)}
                      <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>{order.status}</span>
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
