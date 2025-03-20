import React, { useState } from "react";

const orders = [
  { name: "Surprise Bag", id: "#345342", quantity: 1, date: "2025-01-24", revenue: "10", commission: "2" },
  { name: "Seafood Bag", id: "#65434", quantity: 2, date: "2025-06-12", revenue: "10", commission: "2" },
  { name: "Mystery Box", id: "#765432", quantity: 1, date: "2025-02-05", revenue: "15", commission: "3" },
  { name: "Vegan Bag", id: "#897654", quantity: 3, date: "2025-03-20", revenue: "20", commission: "4" },
];

const OrdersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter orders by search query and date range
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      (!startDate || new Date(order.date) >= new Date(startDate)) &&
      (!endDate || new Date(order.date) <= new Date(endDate));
    return matchesSearch && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination handlers
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


  

  return (
    <div>
        {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
          padding:"12px",
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
          padding:"12px"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "white" }}>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Order ID</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Product Name</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Quantity</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Order Date</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Revenue Generated</th>
            <th style={{ padding: "8px", color: "#db2777", textAlign: "center" }}>Platform Commission</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "white" : "#f3f4f6",
              }}
            >
              <td style={{ padding: "8px", textAlign: "center" }}>{order.id}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{order.name}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{order.quantity}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{order.date}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{order.revenue}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{order.commission}</td>
            </tr>
          ))}
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
          disabled={currentPage === totalPages || totalPages === 0}
          style={{
            padding: "8px 12px",
            marginLeft: "8px",
            backgroundColor: currentPage === totalPages || totalPages === 0 ? "#d1d5db" : "#db2777",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
