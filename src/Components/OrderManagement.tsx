import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderManagement.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: {
    amount: number;
    currencyCode: string;
  };
}

interface SurpriseOrder {
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

const OrderManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [surpriseOrders, setSurpriseOrders] = useState<SurpriseOrder[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from the API
  const fetchOrders = async (page: number) => {
    setLoading(true);
    try {
      const apiurl = process.env.REACT_APP_API_URL
      const response = await axios.get(
        `${apiurl}/api/v1/stores/67868526f31080d2abea2171/orders?page=${page}`,
        {
          withCredentials: true,
        }
      );

      const { orders, pagination } = response.data.data;

      const formattedOrders = orders.map((order: any) => ({
        id: order._id,
        status: order.status,
        amount: order.totalPrice,
        customerName: order.userId, // Replace with user details if available
        datePlaced: new Date(order.createdAt).toLocaleDateString(),
        quantity: order.orderItems.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        ),
        pickUpTime: "N/A", // Update if pick-up time is available
        receipt: `Order #${order._id}`,
        orderItems: order.orderItems,
      }));

      setSurpriseOrders(formattedOrders);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      alert("Unable to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
    setCurrentPage(1); // Reset to the first page
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const filteredOrders = surpriseOrders.filter((order) => {
    const orderDate = new Date(order.datePlaced);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (
      (!start || orderDate >= start) &&
      (!end || orderDate <= end) &&
      (order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        order.address?.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  return (
    <div className="orderm-main-container">
      <Header />
      <Sidebar
        isOpen={sidebarExpanded}
        onToggle={toggleSidebar}
        onNavClick={() => {}}
      />
      <div className="order-management">
        <h3>Order Management</h3>

        <div className="card order-table">
          {loading ? (
            <div className="loading">Loading orders...</div>
          ) : filteredOrders.length > 0 ? (
            <>
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search by name or address"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={handleDateChange}
                />
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={handleDateChange}
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Pick-Up Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td data-label="Customer Name">{order.customerName}</td>
                      <td data-label="Order Date">{order.datePlaced}</td>
                      <td data-label="Product Name">
                        {order.orderItems[0]?.productName || "N/A"}
                      </td>
                      <td data-label="Quantity">{order.quantity}</td>
                      <td data-label="Price">
                        {order.amount}{" "}
                        {order.orderItems[0]?.price.currencyCode || "AED"}
                      </td>
                      <td data-label="Pick-Up Time">{order.pickUpTime}</td>
                      <td data-label="Status">
                        <span className={`badge2 ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination-controls">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="no-orders">
              <p>No orders available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
