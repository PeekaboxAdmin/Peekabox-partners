import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import mongoose from "mongoose";
import { AxiosError } from 'axios'; // Import AxiosError type


interface Order {
  orderId: string;
  productName: string;
  quantity: number;
  createdAt: string;
  GrossRevenue: number;
  NetRevenue: number;
}

const OrdersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0); // NEW: Total orders count
  const itemsPerPage = 10; // Increased per page limit
 const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const storeId = useSelector((state: any) => state.storeAuth?.Store_id);
  const apiurl = process.env.REACT_APP_API_URL;

  // Fetch orders for the current page
  const fetchPayments = async (page: number) => {
    try {
      const response = await axios.get(
        `${apiurl}/api/v1/stores/payments/${storeId}/${page}/${itemsPerPage}`,
        { withCredentials: true }
      );

      console.log("API Response:", response.data.data); // Debugging log

      if (response.data.success && response.data.data) {
        setOrders(response.data.data.data.payments);  // Correctly access payments
        setTotalOrders(response.data.data.data.totalOrders); // Set totalOrders
      } else {
        console.error("Unexpected data format:", response.data);
        setOrders([]);
      }
      
    } catch (err) {
      console.error('Failed to fetch payments', err);
    }
  };


  const handleSearch = async () => {
    setLoading(true);
    try {
      const apiurl = process.env.REACT_APP_API_URL;
  
      // Create the search query based on what's available
      let query = '';
  
      // Add orderId if provided
      if (searchOrderId) {
        if (!mongoose.Types.ObjectId.isValid(searchOrderId)) {
          alert("Invalid Order ID format");
          setLoading(false);
          return;
        }
        query = `orderId=${searchOrderId}`;
      }
  
      // Add startDate and endDate if provided
      if (startDate && endDate) {
        query += `${query ? '&' : ''}startDate=${startDate}&endDate=${endDate}`;
      }
  
      // Call the API with query parameters
      const response = await axios.get(`${apiurl}/api/v1/stores/payment/search?${query}`, {
        withCredentials: true
      });
  
      console.log(response);
  
      const payment = response.data?.data?.data?.payment; // Safe optional chaining
  
      if (payment && payment.length > 0) {
        setOrders(response.data.data.data.payment);
      } else {
        alert("No orders found with the given criteria.");
      }
  
    } catch (error: unknown) {
      console.error("Failed to fetch orders:", error);
  
      // Check if the error is an AxiosError
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 404) {
            alert("No orders found with the given criteria.");
          } else {
            alert("Unable to fetch orders. Please try again later.");
          }
        } else {
          alert("Unable to fetch orders. Please check your internet connection or try again later.");
        }
      } else {
        alert("An unknown error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when component mounts or page changes
  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  // Calculate total pages based on totalOrders
  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchOrderId}
          onChange={(e) => {
            setSearchOrderId(e.target.value);
            setStartDate("");
            setEndDate("");
          }}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setSearchOrderId("");
          }}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setSearchOrderId("");
          }}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

<button className="seeall" onClick={handleSearch}>Search</button>
      </div>

      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
          padding: "12px",
          backgroundColor: "#14532d",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          marginBottom: "0",
        }}
      >
        Payment Records
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "12px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "white" }}>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Order ID</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Product Name</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Quantity</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Order Date</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Gross Renevue</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Net Revenue</th>
          </tr>
        </thead>
        <tbody>
  {orders && orders.length > 0 ? (
    orders.map((order, index) => (
      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f3f4f6" }}>
        <td style={{ padding: "8px", textAlign: "center" }}>{order.orderId}</td>
        <td style={{ padding: "8px", textAlign: "center" }}>{order.productName}</td>
        <td style={{ padding: "8px", textAlign: "center" }}>{order.quantity}</td>
        <td style={{ padding: "8px", textAlign: "center" }}>{order.createdAt}</td>
        <td style={{ padding: "8px", textAlign: "center" }}>{order.GrossRevenue}</td>
        <td style={{ padding: "8px", textAlign: "center" }}>{order.NetRevenue}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} style={{ textAlign: "center", padding: "12px", fontSize: "1rem", color: "#666" }}>
        No payments found.
      </td>
    </tr>
  )}
</tbody>

      </table>

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          style={{
            padding: "8px 12px",
            marginRight: "8px",
            backgroundColor: currentPage === 1 ? "#d1d5db" : "#db2777",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ padding: "8px 12px", fontSize: "1rem", fontWeight: "bold" }}>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          style={{
            padding: "8px 12px",
            marginLeft: "8px",
            backgroundColor: currentPage >= totalPages ? "#d1d5db" : "#db2777",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
