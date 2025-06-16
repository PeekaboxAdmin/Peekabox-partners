// I have commented out backend integrated code. Running hardcoded right now. Many changes need to be made for backend integration

// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBox, faShoppingCart, faClock, faEllipsisV,faCubes, faArrowRight, faBell} from '@fortawesome/free-solid-svg-icons';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import SalesChart from './SalesChart';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Assuming axios is used for API calls
// import Logo from './Images/burger.jpg'; // Default image for products
// import { useSelector } from 'react-redux';
// import './Dashbaord.css';
// import FooterLinks from './FooterLink/FooterLinks';
// import { getTodayDay, getTomorrowDay, isToday, isTomorrow, getDayDate, findNextAvailableDay } from '../Components/DayFunctions';

// //import { fetchLatestOrders, SurpriseOrder} from "./OrderManagement";

// interface Order {
//   id: string;
//   userId: string;
//   storeId: string;
//   productId: string;
//   productName: string;
//   quantity: number;
//   salesAmount: number;
//   consumerPrice: number;
//   currencyCode: string;
//   status: string;
//   totalPrice: number;
//   datePlaced: string;
// }

// interface CollectionSchedule {
//   date: string;
//   time: string;
//   quantityAvailable: string;
// }

// interface SurpriseBag {
//   id: string;
//   title: string;
//   price: number;
//   discount?: boolean;
//   discountPrice?: number;
//   quantity: number;
//   available: boolean;
//   collectionTime: CollectionSchedule[];
//   soldOut: boolean;
//   imageUrl: string;
// }

// const Dashboard: React.FC = () =>{
//   const [sidebarExpanded, setSidebarExpanded] = useState(false);
//   const [surpriseBags, setSurpriseBags] = useState<SurpriseBag[]>([]);
//   // const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [dailySales, setDailySales] = useState<{ [key: string]: string }>({});
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
//     const [editMode, setEditMode] = useState(false);

//    // Get Store_id from Redux
//     const storeId = useSelector((state: any) => state.storeAuth.Store_id);
//     const navigate = useNavigate();

//   // Fetch surprise bags from API
//   useEffect(() => {
//     const fetchBags = async () => {
//       setLoading(true);
//       try {
//         const apiurl = process.env.REACT_APP_API_URL;
//         const response = await axios.get(
//           `${apiurl}/api/v1/stores/${storeId}/products?page=1&limit=30&sort=desc`,
//           { withCredentials: true }
//         );
//         console.log("API Response:", response.data);
//         if (response.data.success) {
//           const products = response.data.data.products;
//           const formattedBags = products.map((product: any) => {
//             // Check if collectionSchedule exists and has data
//             const collectionTimes: CollectionSchedule[]  =
//               product.collectionSchedule?.length > 0
//                 ? product.collectionSchedule.map((schedule: any) => {
//                   const quantity = schedule.quantityAvailable;
//                     const date = schedule.day || "No Date Specified";
//                     const time = schedule.timeWindow
//                       ? `${schedule.timeWindow.start || "N/A"} - ${schedule.timeWindow.end || "N/A"}`
//                       : "No Time Specified";

//                     return { date, time ,quantity  }; // Return separate date and time
//                   })
//                 : [{ date: "No Date Specified", time: "No Time Specified" }]; // Fallback

//             return {
//               id: product._id,
//               title: product.name,
//               price: product.price?.amount || 0, // Ensure price exists
//               discount: product.price?.discount || false,
//               discountPrice: product.price?.discountPrice || 0,
//               quantity: product.quantity || 0,
//               description: product.description || "No description available",
//               category: product.category || "Uncategorized",
//               collectionTime: collectionTimes, // Now collectionTime is an array of objects with date and time
//               soldOut: product.quantity === 0,
//               available: product.isAvailable ?? true, // Default to true if undefined
//               imageUrl: product.image || "default_image_url_here", // Fallback for missing image
//             };
//           });

//           setSurpriseBags(formattedBags);
//         } else {
//           console.error('Error fetching data:', response.data.errorMessage);
//         }
//       } catch (error) {
//         console.error('Error fetching surprise bags:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBags();
//   }, [storeId]);

//   // Fetch surprise bags from API-----------------------------------------------------------------
//     const fetchDailySold = async (productId: string): Promise<string> => {
//   const apiurl = process.env.REACT_APP_API_URL;
//   let quantity = "0"; // Default value as a string

//   const requestData = {
//     productId: productId,
//     storeId: storeId
//   };

//   try {
//     const response = await axios.post(
//       `${apiurl}/api/v1/stores/getDateSalesQuantityByProductId`,
//       requestData,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         }
//       }
//     );

//     if (response.data.success) {
//       quantity = response.data.data.totalQuantitySold.toString(); // Ensure it's a string
//     } else {
//       console.error("Error fetching data:", response.data.errorMessage);
//     }
//   } catch (error) {
//     console.error("Error fetching surprise bags:", error);
//   }

//   return quantity; // Ensure function returns the value
// };

// useEffect(() => {
//   const fetchSalesData = async () => {
//     const salesData: { [key: string]: string } = {};

//     await Promise.all(
//       surpriseBags.map(async (bag) => {
//         const soldQuantity = await fetchDailySold(bag.id);
//         salesData[bag.id] = soldQuantity;
//       })
//     );

//     setDailySales(salesData);
//   };

//   if (surpriseBags.length > 0) {
//     fetchSalesData();
//   }
// }, [surpriseBags]);

//   useEffect(() => {
//     const getLatest = async () => {
//       setLoading(true);
//       try {
//         const apiurl = process.env.REACT_APP_API_URL;
//         const response = await axios.get(
//           `${apiurl}/api/v1/stores/${storeId}/ordersToday`,
//           { withCredentials: true }
//         );

//         const orders = response.data.data;

//         const formattedOrders = orders.map((order: any) => ({
//           id: order._id,
//           productId: order.productId,
//           productName: order.productName,
//           quantity: order.quantity,
//           salesAmount: order.salesAmount,
//           consumerPrice: order.consumerPrice,
//           currencyCode: order.currencyCode || "AED", // Default currency if missing
//           status: order.status,
//           totalPrice: order.totalPrice,
//           datePlaced: new Date(order.createdAt).toISOString().split("T")[0],
//         }));

//         setOrders(formattedOrders);

//       } catch (err) {
//         console.error("Error fetching latest orders for dashboard:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getLatest();
//   }, [storeId]);

//   const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

//   const toggleEditMode = () => {
//     setEditMode(!editMode);
//     setSelectedOrders([]);
//   };

//   const handleOrderSelection = (orderId : string) => {
//     setSelectedOrders((prevSelected) =>
//       prevSelected.includes(orderId)
//         ? prevSelected.filter((id) => id !== orderId)
//         : [...prevSelected, orderId]
//     );
//   };

//   const handleBulkAction = async (action: string) => {
//     if (action === "complete") {
//       // Check if any selected orders are already "Cancelled"
//       const invalidOrders = selectedOrders.filter((orderId) => {
//         const order = orders.find((o) => o.id === orderId);
//         return order?.status.toLowerCase() === "cancelled";
//       });

//       if (invalidOrders.length > 0) {
//         alert("Some orders are already cancelled and cannot be marked as completed.");
//         return; // Exit the function
//       }

//       const isConfirmed = window.confirm("Are you sure you want to mark these orders as complete?");
//       if (!isConfirmed) return;

//       try {
//         const apiurl = process.env.REACT_APP_API_URL;

//         await Promise.all(
//           selectedOrders.map(async (orderId) => {
//             await axios.post(
//               `${apiurl}/api/v1/stores/${storeId}/orders/${orderId}/complete`,
//               {},
//               { withCredentials: true }
//             );
//           })
//         );

//         window.location.reload(); // Reload page after completion

//       } catch (error) {
//         console.error("Unable to mark orders as complete", error);
//         alert("Unable to mark orders as complete.");
//       }
//     } else if(action === "cancel") {
//        // Check if any selected orders are already "Completed"
//       const invalidOrders = selectedOrders.filter((orderId) => {
//         const order = orders.find((o) => o.id === orderId);
//         return order?.status.toLowerCase() === "completed";
//       });

//       if (invalidOrders.length > 0) {
//         alert("Some orders are already completed and cannot be cancelled.");
//         return; // Exit the function
//       }

//       const isConfirmed = window.confirm(
//         "Are you sure you want to mark these orders as cancelled? The order will be refunded."
//       );
//       if (!isConfirmed) return;

//       try {
//         const apiurl = process.env.REACT_APP_API_URL;

//         await Promise.all(
//           selectedOrders.map(async (orderId) => {
//             await axios.post(
//               `${apiurl}/api/v1/stores/${storeId}/orders/${orderId}/cancel`,
//               {},
//               { withCredentials: true }
//             );
//           })
//         );

//         window.location.reload(); // Reload page after completion

//       } catch (error) {
//         console.error("Unable to mark orders as cancelled", error);
//         alert("Unable to mark orders as cancelled");
//       }
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "received":
//         return <div className="status-icon received"><i className="fas fa-money-bill-wave"></i></div>;
//       case "completed":
//         return <div className="status-icon completed"><i className="fas fa-check-circle"></i></div>;
//       case "preparing":
//         return <div className="status-icon preparing"><i className="fas fa-utensils"></i></div>;
//       case "accepted":
//         return <div className="status-icon accepted"><i className="fas fa-thumbs-up"></i></div>;
//       case "ready for pickup":
//         return <div className="status-icon ready"><i className="fas fa-shopping-bag"></i></div>;
//       default:
//         return <div className="status-icon default"><i className="fas fa-question-circle"></i></div>;
//     }
// };

//   function getDayLabel(dayAbbrev: string): string {
//     if (!dayAbbrev || dayAbbrev.length !== 3) {
//       return dayAbbrev;
//     }

//     const dayMapping: Record<string, number> = {
//       Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
//     };

//     const todayIndex = new Date().getDay();
//     const scheduleDayIndex = dayMapping[dayAbbrev] ?? -1;

//     if (scheduleDayIndex === todayIndex) {
//       return "Today";
//     } else if (scheduleDayIndex === (todayIndex + 1) % 7) {
//       return "Tomorrow";
//     } else {
//       return dayAbbrev;
//     }
//   }

//   function parseAndFormatCollectionTime(rawString: string): string {
//     const pattern = /(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s\d{2}:\d{2}\s-\s\d{2}:\d{2}/g;

//     const matches = rawString.match(pattern);
//     if (!matches) {
//       return rawString;
//     }

//     // Transform each match into "Today 15:31 - 17:31", etc.
//     const transformed = matches.map((dayTime) => {
//       const dayAbbrev = dayTime.slice(0, 3);
//       const times = dayTime.slice(4);

//       const label = getDayLabel(dayAbbrev);
//       return `${label} ${times}`;
//     });

//     // Join them with commas
//     return transformed.join(", ");
//   }

//   return (
//     <div className="dashboard">
//       <Header />
//       <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

//       <div className="surpricebagcontainer">
//         {/* Surprise Bags Section */}

//         <section className="dsurprise-bags">
//           <div className="dsurprise-bags-header">
//             <h2>Your Surprise Bags</h2>
//           </div>
//           <div className="dsurprise-bags-content">
//             {loading ? (
//               <p>Loading...</p>
//             ) : surpriseBags.length > 0 ? (
//               <div className="dsurprise-bags-container">
//                 {surpriseBags.map((bag) =>  (
//                   <div key={bag.id} className="dsurprise-bag-card">
//                     <div className={`dsurprise-bag-badge ${bag.available ? 'available' : 'sold-out'}`}>
//                       {bag.available ? 'Available' : 'Sold Out'}
//                     </div>
//                     <img src={bag.imageUrl} alt={bag.title} className="dsurprise-bag-image" />
//                     <h3>{bag.title}</h3>
//                     <p>
//                       {getTodaySalesInfo(bag, dailySales)}
//                     </p>
//                     <div className="price-availability-container">
//                       <p className="avail-info">
//                         {getTodayOrTomorrowSchedule(bag.collectionTime)}

//                         {/* <FontAwesomeIcon icon={faClock} /> {bag.collectionTime}
//                         <FontAwesomeIcon icon={faClock} /> {parseAndFormatCollectionTime(bag.collectionTime)} */}
//                       </p>
//                       <span className="price">
//                         {bag.discount ? (
//                           <>
//                             <span className="discounted-price">AED {bag.discountPrice}</span>
//                             <span className="original-price">AED {bag.price}</span>
//                           </>
//                         ) : (
//                           <span className="regular-price">AED {bag.price}</span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="no-surprise-bags">
//                 <p>No surprise bags added yet :(</p>
//                 <button onClick={() => navigate('/surpriseBox')} className="seeall">
//                   Add Surprise Bags
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="dsurprise-bags-footer">
//             <button onClick={() => navigate('/surpriseBox')} className="seeall">
//               Go to Surprise Bag Section
//             </button>
//           </div>
//         </section>

//       </div>

//       {/* Orders and Sales Chart */}
//       <section className="first-grid">
//         <div className="orderdash">
//           <div className="orderdash-header">

//             <h2>Reservations for today</h2>
//             <button className="editbtndash" onClick={toggleEditMode}>{editMode ? "Done" : "Edit"}</button>
//             <button className="editbtndash">Refresh </button>
//             {editMode && selectedOrders.length > 0 && (
//           <div className="bulk-actionsdash">
//             <button  onClick={() => handleBulkAction("complete")}>Mark as Complete</button>
//             <button  onClick={() => handleBulkAction("cancel")}>Cancel</button>
//           </div>
//         )}

//           </div>

//            <div className="orderdash-content">
//             {loading ? (
//               <p>Loading...</p>
//             ) : orders.length > 0 ? (
//               <table>
//                 <thead>
//                 <tr>
//                   {editMode && <th>Select</th>}
//                   <th>Order No.</th>
//                   <th>Order ID</th>
//                   <th>Product Name</th>
//                   <th>Quantity</th>
//                   <th>Sales Price</th>
//                   <th>Consumer Price</th>
//                   <th>Order Date</th>
//                   <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order,index) => (
//                     <tr key={order.id}>
//                     {editMode && (
//                     <td>
//                       <input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => handleOrderSelection(order.id)} />
//                     </td>
//                   )}
//                     <td data-label="No">{index + 1}</td>
//                     <td data-label="order ID">{order.id}</td>
//                     <td data-label="Product Name">
//                         {order.productName || "N/A"}
//                       </td>
//                       <td data-label="# of Bags">{order.quantity}</td>
//                       <td data-label="Price">
//                         {order.salesAmount}{" "}
//                         {order.currencyCode || "AED"}
//                       </td>
//                       <td data-label="Price">
//                         {order.consumerPrice}{" "}
//                         {order.currencyCode || "AED"}
//                       </td>
//                       <td data-label="Order date">
//                         {order.datePlaced || "N/A"}
//                       </td>
//                     <td data-label="Status" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                       {getStatusIcon(order.status)}
//                       <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>{order.status}</span>
//                     </td>
//                   </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="no-orders">
//                 <p>No orders available yet</p>
//               </div>
//             )}
//           </div>
//           <button onClick={() => navigate('/orderManagement')} className="seeall">
//             Go to Order Section
//           </button>
//         </div>

//         <div className="salesChart">
//           <SalesChart />
//         </div>
//       </section>

//       <footer className="dashboard-footer">
//         <FooterLinks />
//       </footer>

//     </div>

//   );
// };

// const getTodayOrTomorrowSchedule = (schedules: CollectionSchedule[]) => {
//   // Find if there is a schedule for today
//   const todaySchedule = schedules.find(schedule => isToday(schedule.date));

//   if (todaySchedule) {
//     return (
//       <div>
//         <FontAwesomeIcon icon={faClock} />
//         <p><strong>Today</strong> {todaySchedule.time}</p>
//       </div>
//     );
//   }

//   // If there's no schedule for today, check for tomorrow
//   const tomorrowSchedule = schedules.find(schedule => isTomorrow(schedule.date));

//   if (tomorrowSchedule) {
//     return (
//       <div>
//         <FontAwesomeIcon icon={faClock} />
//         <p><strong>Tomorrow</strong> {tomorrowSchedule.time}</p>
//       </div>
//     );
//   }

//   // If no schedule for today or tomorrow, find the next available day
//   const nextDay = findNextAvailableDay(schedules.map(schedule => schedule.date));

//   if (nextDay) {
//     return (
//       <div>
//         <FontAwesomeIcon icon={faClock} />
//         <p><strong>{nextDay}</strong> (Next week available) </p>
//       </div>
//     );
//   }

//   // Otherwise, return nothing
//   return null;
// };

// const getTodaySalesInfo = (bag: SurpriseBag, dailySales: { [key: string]: string }) => {
//   const today = getTodayDay(); // Get today's weekday (e.g., "Mon")
//   const todaySchedule = bag.collectionTime.find(schedule => schedule.date === today);

//   if (todaySchedule) {
//     const soldToday = dailySales[bag.id] ?? "0"; // Get sold count or default to "0"
//     return (
//       <p>
//         <FontAwesomeIcon icon={faCubes} />
//         Sold today {soldToday} out of {todaySchedule.quantityAvailable}
//       </p>
//     );
//   }

//   return <p>No sales scheduled for today.</p>;
// };

// export default Dashboard;

"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faCalendarAlt, faBoxOpen } from "@fortawesome/free-solid-svg-icons"
import Header from "./Header"
import Sidebar from "./Sidebar"
import SalesChart from "./SalesChart"
import { useNavigate } from "react-router-dom"
import axios from "axios" // Assuming axios is used for API calls
import { useSelector } from "react-redux"
import "./Dashbaord.css"
import FooterLinks from "./FooterLink/FooterLinks"

// TEMPORARY HARDCODE FOR TESTING
// Import images for surprise bags
import BananaImage from "./Images/food.jpg"
import CookiesImage from "./Images/burger.jpg"
import DeluxeImage from "./Images/images.jpg"
import Image2 from "./Images/image2.jpg"
import Picture1 from "./Images/picture1.jpg"

interface Order {
  id: string
  orderName: string
  orderId: string
  quantity: number
  orderDate: string
  status: string
}

interface CollectionSchedule {
  date: string
  time: string
  quantityAvailable: string
}

interface SurpriseBag {
  id: string
  title: string
  price: number
  discount?: boolean
  discountPrice?: number
  Dicountprice?: number
  quantity: number
  available: boolean
  collectionTime: CollectionSchedule[]
  soldOut: boolean
  imageUrl: string
  isPopular?: boolean
  soldCount?: number
  totalCount?: number
  catagory?: string
}

const Dashboard: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [surpriseBags, setSurpriseBags] = useState<SurpriseBag[]>([])
  const [dailySales, setDailySales] = useState<{ [key: string]: string }>({})
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [editMode, setEditMode] = useState(false)
  const [activeDot, setActiveDot] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get Store_id from Redux
  const storeId = useSelector((state: any) => state.storeAuth.Store_id)
  const navigate = useNavigate()

  // Set dummy data for orders matching the screenshot
  useEffect(() => {
    const dummyOrders: Order[] = [
      {
        id: "1",
        orderName: "Surprise Bag",
        orderId: "#345342",
        quantity: 1,
        orderDate: "24-Jan-2025",
        status: "Collected",
      },
      {
        id: "2",
        orderName: "Seafood Bag",
        orderId: "#65434",
        quantity: 2,
        orderDate: "12-Jun-2025",
        status: "Collected",
      },
      {
        id: "3",
        orderName: "Bakery Bag",
        orderId: "#34343",
        quantity: 1,
        orderDate: "5-Jan-2025",
        status: "Pending",
      },
      {
        id: "4",
        orderName: "Power Bag",
        orderId: "#343423",
        quantity: 2,
        orderDate: "7-Mar-2025",
        status: "Pending",
      },
      {
        id: "5",
        orderName: "Combo Bag",
        orderId: "#34678",
        quantity: 1,
        orderDate: "17-Dec-2025",
        status: "Canceled",
      },
      {
        id: "6",
        orderName: "Bakery Bag",
        orderId: "#111002",
        quantity: 3,
        orderDate: "17-Dec-2025",
        status: "Collected",
      },
      {
        id: "7",
        orderName: "Surprise Bag",
        orderId: "#345342",
        quantity: 1,
        orderDate: "24-Jan-2025",
        status: "Collected",
      },
      {
        id: "8",
        orderName: "Seafood Bag",
        orderId: "#65434",
        quantity: 2,
        orderDate: "12-Jun-2025",
        status: "Collected",
      },
      {
        id: "9",
        orderName: "Bakery Bag",
        orderId: "#34343",
        quantity: 1,
        orderDate: "5-Jan-2025",
        status: "Pending",
      },
    ]
    setOrders(dummyOrders)
  }, [])

  // Fetch surprise bags from API
  useEffect(() => {
    const fetchBags = async () => {
      setLoading(true)
      try {
        const apiurl = process.env.REACT_APP_API_URL
        const response = await axios.get(`${apiurl}/api/v1/stores/${storeId}/products?page=1&limit=30&sort=desc`, {
          withCredentials: true,
        })
        console.log("API Response:", response.data)
        if (response.data.success) {
          const products = response.data.data.products
          const formattedBags = products.map((product: any) => {
            // Check if collectionSchedule exists and has data
            const collectionTimes: CollectionSchedule[] =
              product.collectionSchedule?.length > 0
                ? product.collectionSchedule.map((schedule: any) => {
                    const quantity = schedule.quantityAvailable
                    const date = schedule.day || "No Date Specified"
                    const time = schedule.timeWindow
                      ? `${schedule.timeWindow.start || "N/A"} - ${schedule.timeWindow.end || "N/A"}`
                      : "No Time Specified"

                    return { date, time, quantity } // Return separate date and time
                  })
                : [
                    {
                      date: "No Date Specified",
                      time: "No Time Specified",
                      quantityAvailable: "0",
                    },
                  ] // Fallback

            return {
              id: product._id,
              title: product.name,
              price: product.price?.amount || 0, // Ensure price exists
              discount: product.price?.discount || false,
              discountPrice: product.price?.discountPrice || 0,
              Dicountprice: product.price?.discountPrice || 0,
              quantity: product.quantity || 0,
              description: product.description || "No description available",
              catagory: product.category || "Uncategorized",
              collectionTime: collectionTimes, // Now collectionTime is an array of objects with date and time
              soldOut: product.quantity === 0,
              available: product.isAvailable ?? true, // Default to true if undefined
              imageUrl: product.image || "default_image_url_here", // Fallback for missing image
              soldCount: 3,
              totalCount: 5,
            }
          })

          if (formattedBags.length > 0) {
            setSurpriseBags(formattedBags)
          } else {
            // If no bags from API, use mock data
            setMockBags()
          }
        } else {
          // If API call fails, use mock data
          setMockBags()
        }
      } catch (error) {
        console.error("Error fetching surprise bags:", error)
        // If error occurs, use mock data
        setMockBags()
      } finally {
        setLoading(false)
      }
    }

    fetchBags()
  }, [storeId])

  // Function to set mock data
  const setMockBags = () => {
    // Mock data for Figma design - expanded to more than 3 items
    const mockBags: SurpriseBag[] = [
      {
        id: "1",
        title: "Banana Puddings",
        price: 40,
        discount: true,
        discountPrice: 15,
        Dicountprice: 15,
        quantity: 5,
        available: true,
        collectionTime: [{ date: "Mon", time: "12:00 - 15:30", quantityAvailable: "5" }],
        soldOut: false,
        imageUrl: BananaImage,
        isPopular: true,
        soldCount: 3,
        totalCount: 5,
        catagory: "Surprise Bag",
      },
      {
        id: "2",
        title: "Choco Cookies",
        price: 40,
        discount: true,
        discountPrice: 15,
        Dicountprice: 15,
        quantity: 10,
        available: true,
        collectionTime: [
          {
            date: "Tomorrow",
            time: "17:00 - 18:00",
            quantityAvailable: "10",
          },
        ],
        soldOut: false,
        imageUrl: CookiesImage,
        isPopular: true,
        soldCount: 6,
        totalCount: 10,
        catagory: "Bread Bag",
      },
      {
        id: "3",
        title: "Deluxe",
        price: 60,
        discount: true,
        discountPrice: 30,
        Dicountprice: 30,
        quantity: 5,
        available: false,
        collectionTime: [
          {
            date: "Tomorrow",
            time: "10:00 - 12:00",
            quantityAvailable: "5",
          },
        ],
        soldOut: true,
        imageUrl: DeluxeImage,
        soldCount: 5,
        totalCount: 5,
        catagory: "Surprise Bag",
      },
      {
        id: "4",
        title: "Frappuccino",
        price: 30,
        discount: true,
        discountPrice: 20,
        Dicountprice: 20,
        quantity: 5,
        available: true,
        collectionTime: [
          {
            date: "Tomorrow",
            time: "15:00 - 20:00",
            quantityAvailable: "5",
          },
        ],
        soldOut: false,
        imageUrl: Image2,
        soldCount: 3,
        totalCount: 5,
        catagory: "Dessert Bag",
      },
      {
        id: "5",
        title: "Combo",
        price: 35,
        discount: true,
        discountPrice: 25,
        Dicountprice: 25,
        quantity: 5,
        available: true,
        collectionTime: [
          {
            date: "Tomorrow",
            time: "10:00 - 11:00",
            quantityAvailable: "5",
          },
        ],
        soldOut: false,
        imageUrl: Picture1,
        isPopular: true,
        soldCount: 3,
        totalCount: 5,
        catagory: "Lunch Bag",
      },
    ]

    setSurpriseBags(mockBags)
  }

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded)

  const toggleEditMode = () => {
    setEditMode(!editMode)
    setSelectedOrders([])
  }

  const handleOrderSelection = (orderId: string) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId) ? prevSelected.filter((id) => id !== orderId) : [...prevSelected, orderId],
    )
  }

  const handleBulkAction = async (action: string) => {
    if (action === "complete") {
      const isConfirmed = window.confirm("Are you sure you want to mark these orders as complete?")
      if (!isConfirmed) return
      // Handle completion logic here
    } else if (action === "cancel") {
      const isConfirmed = window.confirm(
        "Are you sure you want to mark these orders as cancelled? The order will be refunded.",
      )
      if (!isConfirmed) return
      // Handle cancellation logic here
    }
  }

  const handleRefresh = () => {
    // Refresh logic here
    window.location.reload()
  }

  // Calculate how many cards are visible at once
  const getVisibleCards = () => {
    if (!containerRef.current) return 3
    const containerWidth = containerRef.current.clientWidth
    const cardWidth = 280 // Card width + gap
    return Math.floor(containerWidth / cardWidth) || 3
  }

  // Calculate total number of pages
  const getTotalPages = () => {
    const visibleCards = getVisibleCards()
    return Math.ceil(surpriseBags.length / visibleCards)
  }

  // Slider navigation functions
  const scrollLeft = () => {
    if (containerRef.current) {
      const visibleCards = getVisibleCards()
      const cardWidth = 280 // Card width + gap
      const scrollAmount = visibleCards * cardWidth

      containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })

      // Update active dot
      const newActiveDot = Math.max(0, activeDot - 1)
      setActiveDot(newActiveDot)
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      const visibleCards = getVisibleCards()
      const cardWidth = 280 // Card width + gap
      const scrollAmount = visibleCards * cardWidth

      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })

      // Update active dot
      const totalPages = getTotalPages()
      const newActiveDot = Math.min(totalPages - 1, activeDot + 1)
      setActiveDot(newActiveDot)
    }
  }

  // Function to handle pagination dot clicks
  const handleDotClick = (index: number) => {
    setActiveDot(index)
    if (containerRef.current) {
      const visibleCards = getVisibleCards()
      const cardWidth = 280 // Card width + gap
      const scrollPosition = index * visibleCards * cardWidth

      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }

  // Listen to scroll events to update active dot
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft
        const visibleCards = getVisibleCards()
        const cardWidth = 280
        const currentPage = Math.round(scrollLeft / (visibleCards * cardWidth))
        setActiveDot(currentPage)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "collected":
        return "status-collected"
      case "pending":
        return "status-pending"
      case "canceled":
        return "status-canceled"
      default:
        return "status-default"
    }
  }

  return (
    <div className="dashboard">
      <Header />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      <div className="surpricebagcontainer">
        {/* Surprise Bags Section - Updated to match Figma design */}
        <section className="dsurprise-bags">
          <div className="dsurprise-bags-header">
            <h2>Your Surprise Bags</h2>
          </div>
          <div className="dsurprise-bags-content">
            {loading ? (
              <p>Loading...</p>
            ) : surpriseBags.length > 0 ? (
              <div className="slider-container">
                <button className="slider-arrow slider-arrow-left" onClick={scrollLeft}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div className="dsurprise-bags-container" ref={containerRef}>
                  {surpriseBags.map((bag) => (
                    <div key={bag.id} className="surprise-bag-card">
                      <div
                        className={`badge ${
                          bag.soldOut ? "badge-sold-out" : bag.isPopular ? "badge-popular" : "badge-available"
                        }`}
                      >
                        {bag.soldOut ? "Sold out" : bag.isPopular ? "Popular" : "Available"}
                      </div>

                      <div className="card-image-container">
                        <img src={bag.imageUrl || "/placeholder.svg"} alt={bag.title} className="surprise-bag-image" />
                      </div>

                      <div className="card-content">
                        <h3>{bag.title}</h3>

                        <div className="card-details-row">
                          <div className="card-info">
                            <div className="card-info-item">
                              <FontAwesomeIcon icon={faBoxOpen} />
                              {bag.soldCount} out of {bag.totalCount} sold
                            </div>
                            <div className="card-info-item">
                              <FontAwesomeIcon icon={faCalendarAlt} />
                              {bag.id === "1" ? "Monday" : "Tomorrow"} {bag.collectionTime[0].time}
                            </div>
                          </div>

                          <div className="card-price">
                            {bag.discount && <div className="original-price">AED {bag.price}</div>}
                            <div className="discounted-price">AED {bag.Dicountprice || bag.price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="slider-arrow slider-arrow-right" onClick={scrollRight}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            ) : (
              <div className="no-surprise-bags">
                <p>No surprise bags added yet :(</p>
                <button onClick={() => navigate("/surpriseBox")} className="dashboard-btn dashboard-btn-primary">
                  Add Surprise Bags
                </button>
              </div>
            )}
          </div>

          {/* Pagination dots */}
          <div className="pagination-dots">
            {Array.from({ length: getTotalPages() }, (_, index) => (
              <div
                key={index}
                className={`pagination-dot ${activeDot === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>

          <div className="dsurprise-bags-footer">
            <button onClick={() => navigate("/surpriseBox")} className="dashboard-btn .dashboard-btn-primary sb-btn">
              Go to Surprise Bag Section
            </button>
          </div>
        </section>
      </div>

      {/* Orders and Sales Chart */}
      <section className="first-grid">
        <div className="orderdash">
          <div className="orderdash-header">
            <h2>Latest Orders</h2>
            <div className="orderdash-actions">
              <button className="dashboard-btn dashboard-btn-secondary" onClick={toggleEditMode}>
                {editMode ? "Done" : "Edit"}
              </button>
              <button className="dashboard-btn dashboard-btn-secondary" onClick={handleRefresh}>
                Refresh
              </button>
              {editMode && selectedOrders.length > 0 && (
                <div className="bulk-actionsdash">
                  <button className="dashboard-btn dashboard-btn-success" onClick={() => handleBulkAction("complete")}>
                    Complete
                  </button>
                  <button className="dashboard-btn dashboard-btn-danger" onClick={() => handleBulkAction("cancel")}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="orderdash-content">
            {loading ? (
              <p>Loading...</p>
            ) : orders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    {editMode && <th>Select</th>}
                    <th>Order Name</th>
                    <th>Order ID</th>
                    <th>Quantity</th>
                    <th>Order Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      {editMode && (
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleOrderSelection(order.id)}
                          />
                        </td>
                      )}
                      <td data-label="Order Name">{order.orderName}</td>
                      <td data-label="Order ID">{order.orderId}</td>
                      <td data-label="Quantity">{order.quantity}</td>
                      <td data-label="Order Date">{order.orderDate}</td>
                      <td data-label="Status">
                        <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
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
          <div className="orderdash-footer">
            <button onClick={() => navigate("/orderManagement")} className="dashboard-btn dashboard-btn-primary">
              Go to Order Section
            </button>
          </div>
        </div>

        {/* <div className="salesChart">
          <SalesChart />
        </div> */}
      </section>

      <footer className="dashboard-footer">
        <FooterLinks />
      </footer>
    </div>
  )
}

export default Dashboard
