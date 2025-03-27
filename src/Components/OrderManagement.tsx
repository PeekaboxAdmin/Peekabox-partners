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


const OrderManagement: React.FC = () => {
  const [combinedSearch, setCombinedSearch] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [allOrders, setAllOrders] = useState<SurpriseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 5;
  const [editMode, setEditMode] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  const fetchOrders = async (limit = ORDERS_PER_PAGE, sort = "desc") => {
    setLoading(true);
    try {
      const apiurl = process.env.REACT_APP_API_URL;
      const response = await axios.get(
        `${apiurl}/api/v1/stores/${storeId}/orders?page=${currentPage}&limit=${limit}&sort=${sort}`,
        { withCredentials: true }
      );
  
      const { orders, pagination } = response.data.data;
  
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
  
      setAllOrders(formattedOrders);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      alert("Unable to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleCombinedSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCombinedSearch(e.target.value);
    setCurrentPage(1);
  };


  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedOrders([]);
  };

  const handleBulkAction = async (action: string) => {
    if (action === "complete") {
      const isConfirmed = window.confirm("Are you sure you want to mark these orders as complete?");
      
      if (!isConfirmed) return; // If the user cancels, exit the function
  
      try {
        const apiurl = process.env.REACT_APP_API_URL;
  
        await Promise.all(
          selectedOrders.map(async (orderId) => {
            await axios.post(
              `${apiurl}/api/v1/stores/${storeId}/orders/${orderId}/complete`, 
              {}, 
              { withCredentials: true }
            );
          })
        );
  
        window.location.reload(); // Reload page after completion
  
      } catch (error) {
        console.error("Unable to mark orders as complete", error);
        alert("Unable to mark orders as complete.");
      }
    } else if(action === "cancel") {
      const isConfirmed = window.confirm("Are you sure you want to mark these orders as cancelled, the order is going to be refunded");
      
      if (!isConfirmed) return; // If the user cancels, exit the function
  
      try {
        const apiurl = process.env.REACT_APP_API_URL;
  
        await Promise.all(
          selectedOrders.map(async (orderId) => {
            await axios.post(
              `${apiurl}/api/v1/stores/${storeId}/orders/${orderId}/cancel`, 
              {}, 
              { withCredentials: true }
            );
          })
        );
  
        window.location.reload(); // Reload page after completion
  
      } catch (error) {
        console.error("Unable to mark orders as cancelled", error);
        alert("Unable to mark orders as cancelled");
      }
    }
  };
  

const handleOrderSelection = (orderId: string) => {
  setSelectedOrders((prevSelected) =>
    prevSelected.includes(orderId)
      ? prevSelected.filter((id) => id !== orderId) // Remove from selection
      : [...prevSelected, orderId] // Add to selection
  );
};



  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "received":
        return <div className="status-icon received"><i className="fas fa-money-bill-wave"></i></div>;
      case "completed":
        return <div className="status-icon completed"><i className="fas fa-check-circle"></i></div>;
      case "cancelled":
        return <div className="status-icon completed"><i className="fas fa-utensils"></i></div>;
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
          <input
            type="text"
            placeholder="Search by Order ID"
            value={combinedSearch}
            onChange={handleCombinedSearchChange}
          />

<input
          type="date"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="date"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

<button className="seeall" onClick={toggleEditMode}>{editMode ? "Done" : "Edit"}</button>
<button className="seeall">Refresh </button>
        </div>
        {editMode && selectedOrders.length > 0 && (
          <div className="bulk-actions">
            <button onClick={() => handleBulkAction("complete")}>Mark as Complete</button>
            <button onClick={() => handleBulkAction("cancel")}>Cancel</button>
          </div>
        )}

        <div className="orderCard order-table">
          {loading ? (
            <div className="loading">Loading orders...</div>
              ) : (
              <>
              <table>
                <thead>
                  <tr>
                  {editMode && <th>Select</th>}
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
                {allOrders.length > 0 ? (
                    allOrders.map((order, index) => (

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
