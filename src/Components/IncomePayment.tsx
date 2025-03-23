"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, DollarSign, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileSidebar from "./SideBarMobile";
import PaymentTable from "../Sections/InsightPage/PaymentTable";
import "./IncomePayment.css";
import axios from "axios";

const IncomePayment: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [salesData, setSalesData] = useState<any>({}); // Ensure it's not null
  const storeId = useSelector((state: any) => state.storeAuth?.Store_id);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const apiurl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiurl}/api/v1/stores/paymentTotalSalesDeatils/${storeId}`, 
          { withCredentials: true }
        );
  
        if (response.data.success && response.data.data.success) {
          setSalesData(response.data.data.data);
        } else {
          throw new Error("Failed to fetch sales data");
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
  
    if (storeId) {
      fetchSalesData();
    }
  }, [storeId]);

  const statsCards = [
    {
      icon: <BarChart3 />,
      title: "Total Sales",
      value: salesData?.totalGrossSales + " AED" || "N/A",
      iconBg: "bg-pink-50",
    },
    {
      icon: <DollarSign />,
      title: "Total Platform Commission",
      value: salesData?.totalCommission + " AED" || "N/A",
      iconBg: "bg-green-50",
    },
    {
      icon: <ShoppingBag />,
      title: "Total Bag Sold",
      value: salesData?.totalQuantitySold || "N/A",
      iconBg: "bg-green-50",
    },
  ];

  return (
    <div className="income-payment-container">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
      <Sidebar isOpen={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} onNavClick={() => {}} />

      <div className="income-content">
        <div className="stats-cards">
          {statsCards.map((card, index) => (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${card.iconBg}`}>{card.icon}</div>
              <div className="stat-info">
                <h3>{card.title}</h3>
                <p className="stat-value">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="main-grid">
          <PaymentTable />
        </div>

        <div className="bottom-section"></div>
      </div>
    </div>
  );
};

export default IncomePayment;



// --------FILE THAT USES SAMPLE DATA--------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from "react-redux";

// interface Order {
//   orderId: string;
//   productName: string;
//   quantity: number;
//   createdAt: string;
//   GrossRevenue: number;
//   NetRevenue: number;
// }

// const OrdersTable: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [totalOrders, setTotalOrders] = useState(0); 
//   const itemsPerPage = 10; 

//   const [searchQuery, setSearchQuery] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const [periodFilter, setPeriodFilter] = useState("all");

//   const storeId = useSelector((state: any) => state.storeAuth?.Store_id);
//   const apiurl = process.env.REACT_APP_API_URL;


//   const fetchPayments = async (page: number) => {

//     // Sample data for local testing:
//     const sampleOrders: Order[] = [
//       { orderId: "ORD001", productName: "Chicken Sandwich", quantity: 2, createdAt: "03-01-2025", GrossRevenue: 25, NetRevenue: 20 },
//       { orderId: "ORD002", productName: "Veggie Wrap", quantity: 1, createdAt: "03-02-2026", GrossRevenue: 15, NetRevenue: 12 },
//       { orderId: "ORD003", productName: "Cheeseburger", quantity: 3, createdAt: "03-03-2026", GrossRevenue: 45, NetRevenue: 38 }
//     ];
//     setOrders(sampleOrders);
//     setTotalOrders(sampleOrders.length);
//   };

//   // Fetch orders when component mounts or page/filters change
//   useEffect(() => {
//     fetchPayments(currentPage);
//   }, [currentPage, periodFilter, searchQuery, startDate, endDate]);

//   // Calculate total pages based on totalOrders
//   const totalPages = Math.ceil(totalOrders / itemsPerPage);

//   // Pagination handlers
//   const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const goToPrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   return (
//     <div>
//       {/* Filters */}
//       <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }}>
//         <input
//           type="text"
//           placeholder="Search by Order ID"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//           }}
//         />
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           style={{
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//           }}
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           style={{
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//           }}
//         />
//         {/* New period filter dropdown */}
//         <select
//           value={periodFilter}
//           onChange={(e) => setPeriodFilter(e.target.value)}
//           style={{
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//           }}
//         >
//           <option value="all">All</option>
//           <option value="week">Week</option>
//           <option value="month">Month</option>
//           <option value="year">Year</option>
//         </select>
//       </div>

//       <h2
//         style={{
//           fontSize: "1.5rem",
//           fontWeight: "bold",
//           color: "white",
//           padding: "12px",
//           backgroundColor: "#14532d",
//           borderTopLeftRadius: "20px",
//           borderTopRightRadius: "20px",
//           marginBottom: "0",
//         }}
//       >
//         Payment Records
//       </h2>

//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           padding: "12px",
//         }}
//       >
//         <thead>
//           <tr style={{ backgroundColor: "white" }}>
//             <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Order ID</th>
//             <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Product Name</th>
//             <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Quantity</th>
//             <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Order Date</th>
//             <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Gross Renevue</th>
//             <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Net Revenue</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders && orders.length > 0 ? (
//             orders.map((order, index) => (
//               <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f3f4f6" }}>
//                 <td style={{ padding: "8px", textAlign: "center" }}>{order.orderId}</td>
//                 <td style={{ padding: "8px", textAlign: "center" }}>{order.productName}</td>
//                 <td style={{ padding: "8px", textAlign: "center" }}>{order.quantity}</td>
//                 <td style={{ padding: "8px", textAlign: "center" }}>{order.createdAt}</td>
//                 <td style={{ padding: "8px", textAlign: "center" }}>{order.GrossRevenue}</td>
//                 <td style={{ padding: "8px", textAlign: "center" }}>{order.NetRevenue}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={6} style={{ textAlign: "center", padding: "12px", fontSize: "1rem", color: "#666" }}>
//                 No payments found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
//         <button
//           onClick={goToPrevPage}
//           disabled={currentPage === 1}
//           style={{
//             padding: "8px 12px",
//             marginRight: "8px",
//             backgroundColor: currentPage === 1 ? "#d1d5db" : "#db2777",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: currentPage === 1 ? "not-allowed" : "pointer",
//           }}
//         >
//           Previous
//         </button>
//         <span style={{ padding: "8px 12px", fontSize: "1rem", fontWeight: "bold" }}>
//           Page {currentPage} of {totalPages || 1}
//         </span>
//         <button
//           onClick={goToNextPage}
//           disabled={currentPage >= totalPages}
//           style={{
//             padding: "8px 12px",
//             marginLeft: "8px",
//             backgroundColor: currentPage >= totalPages ? "#d1d5db" : "#db2777",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrdersTable;