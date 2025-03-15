import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import "./OrderManagement.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FooterLinks from './FooterLink/FooterLinks'; 
import { useSelector } from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.min.css";


interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: {
    amount: number;
    currencyCode: string;
  };
}

export interface SurpriseOrder {
  id: string;
  status: string;
  amount: number;
  customerName: string;
  address?: string;
  datePlaced: string;
  quantity: number;
  pickUpTime: string;
  receipt: string;
  orderItems: OrderItem[];
}

export async function fetchLatestOrders(storeId: string): Promise<SurpriseOrder[]> {
  const apiurl = process.env.REACT_APP_API_URL as string;
  const response = await axios.get(`${apiurl}/api/v1/stores/${storeId}/orders`, {
    withCredentials: true,
  });
  const { orders } = response.data.data;

  const formattedOrders: SurpriseOrder[] = orders.map((order: any) => ({
    id: order._id,
    status: order.status,
    amount: order.amount,
    customerName: order.customerName || "Unknown Customer",
    // Convert date to "YYYY-MM-DD" for consistency
    datePlaced: new Date(order.datePlaced).toISOString().split("T")[0],
    quantity: order.orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0),
    address: order.address || "N/A",
  }));

  // Sort them by datePlaced descending (newest first)
  formattedOrders.sort((a, b) => {
    const aTime = new Date(b.datePlaced).getTime();
    const bTime = new Date(a.datePlaced).getTime();
    return aTime - bTime;
  });

  // Return the first 5
  return formattedOrders.slice(0, 5);
}

const OrderManagement: React.FC = () => {
  const [combinedSearch, setCombinedSearch] = useState("");
  const [dateSearch, setDateSearch] = useState(""); 
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [allOrders, setAllOrders] = useState<SurpriseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateSortConfig, setDateSortConfig] = useState<{ direction: "asc" | "desc" } | null>(null);
  const [timeSortConfig, setTimeSortConfig] = useState<{ direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 10;

  // Reference to the hidden <input type="date"> so we can trigger it from the calendar icon
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Get Store_id from Redux
  const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  // Fetch orders from the API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const apiurl = process.env.REACT_APP_API_URL
      const response = await axios.get(
        `${apiurl}/api/v1/stores/${storeId}/orders`,
        { withCredentials: true }
      );

      const { orders } = response.data.data;

      const formattedOrders = orders.map((order: any) => ({
        id: order._id,
        status: order.status,
        amount: order.amount,
        customerName: order.customerName || "Unknown Customer",
        datePlaced: new Date(order.datePlaced).toISOString().split("T")[0],
        quantity: order.orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0),
        address: order.address || "N/A",
        pickUpTime: order.pickUpTime || "N/A",
        receipt: `Order #${order.receipt}`,
        orderItems: order.orderItems || [],
        productName: order.orderItems.length > 0 ? order.orderItems[0].productName : "N/A",
        priceCurrency: order.orderItems.length > 0 ? order.orderItems[0].price.currencyCode : "AED"
      }));

      setAllOrders(formattedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      alert("Unable to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleCombinedSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCombinedSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCalendarClick = () => {
    if (!dateInputRef.current) return;
    
    if (typeof dateInputRef.current.showPicker === "function") {
      dateInputRef.current.showPicker();
    } else {
      dateInputRef.current.click();
    }
  };

  const filteredOrders = allOrders.filter((order) => {
    // Text match (name or address)
    const textMatch =
      !combinedSearch ||
      order.customerName.toLowerCase().includes(combinedSearch.toLowerCase()) ||
      (order.address && order.address.toLowerCase().includes(combinedSearch.toLowerCase()));

    // Convert order.datePlaced (which is in "M/D/YYYY") into a Date and then format it in "en-US"
    const orderDateFormatted = new Date(order.datePlaced).toLocaleDateString("en-US");
    // Convert the date input (which is "YYYY-MM-DD") to a Date and then to "en-US"
    const inputDateFormatted = dateSearch ? new Date(dateSearch).toLocaleDateString("en-US") : "";

    const dateMatch = !dateSearch || orderDateFormatted === inputDateFormatted;

    return textMatch && dateMatch;
  });

  const getSortedOrders = () => {
    let sortedOrders = [...filteredOrders];
    // Sort by datePlaced first (if sorting is applied)
    if (dateSortConfig) {
        sortedOrders.sort((a, b) => {
            const aDate = new Date(a.datePlaced).getTime();
            const bDate = new Date(b.datePlaced).getTime();
            return dateSortConfig.direction === "asc" ? aDate - bDate : bDate - aDate;
        });
    }

    // Sort by pickUpTime
    if (timeSortConfig) {
        sortedOrders.sort((a, b) => {
            const aDate = new Date(a.datePlaced).getTime();
            const bDate = new Date(b.datePlaced).getTime();

            // Extract and parse pickup times
            const [aHours, aMinutes] = a.pickUpTime.split(" - ")[0].split(":").map(Number);
            const [bHours, bMinutes] = b.pickUpTime.split(" - ")[0].split(":").map(Number);

            // Convert time to total minutes for comparison
            const aTotalMinutes = aHours * 60 + aMinutes;
            const bTotalMinutes = bHours * 60 + bMinutes;

            if (dateSortConfig) {
                // If dates are already sorted, only sort times within the same date
                return aDate === bDate
                    ? timeSortConfig.direction === "asc"
                        ? aTotalMinutes - bTotalMinutes
                        : bTotalMinutes - aTotalMinutes
                    : 0;
            } else {
                // Sort by pickup time across all dates if date sorting is not applied
                return timeSortConfig.direction === "asc"
                    ? aTotalMinutes - bTotalMinutes
                    : bTotalMinutes - aTotalMinutes;
            }
        });
    }

    return sortedOrders;
  };

  const handleDateSort = () => {
    setDateSortConfig((prev) => {
      if (!prev || prev.direction === "desc") return { direction: "asc" };
      return { direction: "desc" };
    });
  };
  
  const handleTimeSort = () => {
    setTimeSortConfig((prev) => {
      if (!prev || prev.direction === "desc") return { direction: "asc" };
      return { direction: "desc" };
    });
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

 // Get sorted and paginated orders for the current view
 const sortedOrders = getSortedOrders();
 const paginatedOrders = sortedOrders.slice(
   (currentPage - 1) * ORDERS_PER_PAGE,
   currentPage * ORDERS_PER_PAGE
 );
 const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  return (
    <div className="orderm-main-container">
      <Header />
      <Sidebar
        isOpen={sidebarExpanded}
        onToggle={toggleSidebar}
        onNavClick={() => {}}
      />
      <div className="order-management">
        <div className="order-management-header">
          <h3>Order Management</h3>
        </div>
        <div className="combined-search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search by Name or Address"
            value={combinedSearch}
            onChange={handleCombinedSearchChange}
          />
          <i
            className="fas fa-calendar-alt calendar-icon"
            onClick={handleCalendarClick}
            title="Pick a date"
          ></i>
          {/* Hidden date input */}
            <input
            type="date"
            ref={dateInputRef}
            value={dateSearch}
            onChange={handleDateChange}
            // style={{ display: "none" }}
            className="hidden-date-input"
          />
        </div>
        <div className="orderCard order-table">
          {loading ? (
            <div className="loading">Loading orders...</div>
              ) : (
              <>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Customer Name</th>
                    <th>Customer Address</th>
                    <th>Status</th>
                    <th onClick={handleDateSort} style={{ cursor: "pointer" }}>
                      Date
                      <i
                        className={`fas ${
                          dateSortConfig
                            ? dateSortConfig.direction === "asc"
                              ? "fa-angle-up"
                              : "fa-angle-down"
                            : "fa-angle-down"
                        }`}
                        style={{ marginLeft: "10px" }}
                      ></i>
                    </th>

                    <th onClick={handleTimeSort} style={{ cursor: "pointer" }}>
                      Pickup time
                      <i
                        className={`fas ${
                          timeSortConfig
                            ? timeSortConfig.direction === "asc"
                              ? "fa-angle-up"
                              : "fa-angle-down"
                            : "fa-angle-down"
                        }`}
                        style={{ marginLeft: "10px" }}
                      ></i>
                    </th>
                    <th>Receipt</th>
                    <th># of Bags</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    {/* <th>Cancellation</th> */}
                  </tr>
                </thead>
                <tbody>
                {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order, index) => (

                    <tr key={order.id}>
                      <td data-label="No">{index + 1}</td>
                      <td data-label="Customer Name">{order.customerName}</td>
                      <td data-label="Customer Address">{order.address}</td>
                      <td data-label="Status" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {getStatusIcon(order.status)}
                        <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>{order.status}</span>
                      </td>
                      <td data-label="Date">{order.datePlaced}</td>
                      <td data-label="Pickup time">{order.pickUpTime}</td>
                      <td data-label="Receipt">{order.receipt}</td>
                      <td data-label="# of Bags">{order.quantity}</td>
                      <td data-label="Product Name">
                          {order.orderItems[0]?.productName || "N/A"}
                        </td>
                        <td data-label="Price">
                          {order.amount}{" "}
                          {order.orderItems[0]?.price.currencyCode || "AED"}
                        </td>
                    </tr>
                  ))
                ) : (
                  // If no rows match, show an empty body (no message)
                  null
                )}
                </tbody>
              </table>
              <div className="pagination-controls">
                {/* Left Arrow */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-arrow"
                >
                  &lt;
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`pagination-page ${currentPage === index + 1 ? "active" : ""}`}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* Right Arrow */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="pagination-arrow"
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <footer className="dashboard-footer">
        <FooterLinks />
      </footer>
    </div>
  );
};

export default OrderManagement;
