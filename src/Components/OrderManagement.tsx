'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderManagement.css';
import Header from './Header';
import Sidebar from './Sidebar';
import FooterLinks from './FooterLink/FooterLinks';
import { useSelector } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import mongoose from 'mongoose';
import { AxiosError } from 'axios'; // Import AxiosError type

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
  id: string; // Displayable Order ID like "#345342"
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
  datePlaced: string; // YYYY-MM-DD format
}

const mockOrderManagementData: SurpriseOrder[] = [
  {
    id: '#345342',
    userId: 'dummyUser1',
    storeId: 'dummyStore1',
    productId: 'dummyProd1',
    productName: 'Surprise Bag',
    quantity: 1,
    salesAmount: 15.0,
    consumerPrice: 20.0,
    currencyCode: 'AED',
    status: 'completed',
    totalPrice: 15.0,
    datePlaced: '2025-01-24',
  },
  {
    id: '#65434',
    userId: 'dummyUser2',
    storeId: 'dummyStore1',
    productId: 'dummyProd2',
    productName: 'Seafood Bag',
    quantity: 2,
    salesAmount: 30.0,
    consumerPrice: 40.0,
    currencyCode: 'AED',
    status: 'completed',
    totalPrice: 30.0,
    datePlaced: '2025-06-12',
  },
  {
    id: '#34343',
    userId: 'dummyUser3',
    storeId: 'dummyStore1',
    productId: 'dummyProd3',
    productName: 'Bakery Bag',
    quantity: 1,
    salesAmount: 10.0,
    consumerPrice: 15.0,
    currencyCode: 'AED',
    status: 'preparing',
    totalPrice: 10.0,
    datePlaced: '2025-01-05',
  },
  {
    id: '#343423',
    userId: 'dummyUser4',
    storeId: 'dummyStore1',
    productId: 'dummyProd4',
    productName: 'Power Bag',
    quantity: 2,
    salesAmount: 25.0,
    consumerPrice: 30.0,
    currencyCode: 'AED',
    status: 'preparing',
    totalPrice: 25.0,
    datePlaced: '2025-03-07',
  },
  {
    id: '#34678',
    userId: 'dummyUser5',
    storeId: 'dummyStore1',
    productId: 'dummyProd5',
    productName: 'Combo Bag',
    quantity: 1,
    salesAmount: 22.0,
    consumerPrice: 28.0,
    currencyCode: 'AED',
    status: 'cancelled',
    totalPrice: 22.0,
    datePlaced: '2025-12-17',
  },
  {
    id: '#111002',
    userId: 'dummyUser6',
    storeId: 'dummyStore1',
    productId: 'dummyProd6',
    productName: 'Bakery Bag',
    quantity: 3,
    salesAmount: 30.0,
    consumerPrice: 45.0,
    currencyCode: 'AED',
    status: 'completed',
    totalPrice: 30.0,
    datePlaced: '2025-12-17',
  },
  {
    id: '#345342-2', // Unique ID for key prop
    userId: 'dummyUser7',
    storeId: 'dummyStore1',
    productId: 'dummyProd7',
    productName: 'Surprise Bag',
    quantity: 1,
    salesAmount: 15.0,
    consumerPrice: 20.0,
    currencyCode: 'AED',
    status: 'completed',
    totalPrice: 15.0,
    datePlaced: '2025-01-24',
  },
  {
    id: '#65434-2', // Unique ID for key prop
    userId: 'dummyUser8',
    storeId: 'dummyStore1',
    productId: 'dummyProd8',
    productName: 'Seafood Bag',
    quantity: 2,
    salesAmount: 30.0,
    consumerPrice: 40.0,
    currencyCode: 'AED',
    status: 'completed',
    totalPrice: 30.0,
    datePlaced: '2025-06-12',
  },
  {
    id: '#34343-2', // Unique ID for key prop
    userId: 'dummyUser9',
    storeId: 'dummyStore1',
    productId: 'dummyProd9',
    productName: 'Bakery Bag',
    quantity: 1,
    salesAmount: 10.0,
    consumerPrice: 15.0,
    currencyCode: 'AED',
    status: 'preparing',
    totalPrice: 10.0,
    datePlaced: '2025-01-05',
  },
];

const OrderManagement: React.FC = () => {
  const [combinedSearch, setCombinedSearch] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [allOrders, setAllOrders] = useState<SurpriseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 5;
  const [editMode, setEditMode] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const storeId = useSelector((state: any) => state.storeAuth.Store_id);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchOrders = async (limit = ORDERS_PER_PAGE, sort = 'desc') => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = startIndex + ORDERS_PER_PAGE;
    const paginatedOrders = mockOrderManagementData.slice(startIndex, endIndex);

    setAllOrders(paginatedOrders);
    setTotalPages(Math.ceil(mockOrderManagementData.length / ORDERS_PER_PAGE));
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedOrders([]);
  };

  const handleBulkAction = async (action: string) => {
    // This function will still attempt API calls as per "change nothing else"
    if (action === 'complete') {
      const isConfirmed = window.confirm(
        'Are you sure you want to mark these orders as complete?'
      );

      if (!isConfirmed) return;

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
        alert(
          'Mock action: Orders marked as complete. (Live version would reload or update)'
        );
        // fetchOrders(); // Re-fetch mock data to reset view if needed
      } catch (error) {
        console.error('Unable to mark orders as complete', error);
        alert('Unable to mark orders as complete.');
      }
    } else if (action === 'cancel') {
      const isConfirmed = window.confirm(
        'Are you sure you want to mark these orders as cancelled, the order is going to be refunded'
      );

      if (!isConfirmed) return;

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
        alert(
          'Mock action: Orders marked as cancelled. (Live version would reload or update)'
        );
        // fetchOrders(); // Re-fetch mock data
      } catch (error) {
        console.error('Unable to mark orders as cancelled', error);
        alert('Unable to mark orders as cancelled');
      }
    }
  };

  const handleOrderSelection = (orderId: string) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  const handleSearch = async () => {
    // This function will still attempt API calls as per "change nothing else"
    // It will likely not work as expected with mock data unless API is live or it's modified.
    setLoading(true);
    try {
      const apiurl = process.env.REACT_APP_API_URL;
      let query = '';
      if (searchOrderId) {
        if (
          !mongoose.Types.ObjectId.isValid(searchOrderId) &&
          !searchOrderId.startsWith('#')
        ) {
          // Adjusted for mock IDs
          alert(
            'Invalid Order ID format for live search. Mock IDs like #12345 are for display.'
          );
          setLoading(false);
          return;
        }
        query = `orderId=${searchOrderId}`;
      }

      if (startDate && endDate) {
        query += `${query ? '&' : ''}startDate=${startDate}&endDate=${endDate}`;
      }

      // If you want to filter mock data instead:
      // const filtered = mockOrderManagementData.filter(order =>
      //   (searchOrderId ? order.id.includes(searchOrderId) : true) &&
      //   // Add date filtering logic here if needed for mock data
      // );
      // setAllOrders(filtered.slice(0, ORDERS_PER_PAGE));
      // setTotalPages(Math.ceil(filtered.length / ORDERS_PER_PAGE));
      // setCurrentPage(1);
      // setLoading(false);
      // return;

      const response = await axios.get(
        `${apiurl}/api/v1/stores/orders/search?${query}`,
        {
          withCredentials: true,
        }
      );

      const orders = response.data?.data?.data?.orders;

      if (orders && orders.length > 0) {
        const formattedOrders = orders.map((order: any) => ({
          id: order._id,
          productId: order.productId,
          productName: order.productName,
          quantity: order.quantity,
          salesAmount: order.salesAmount,
          currencyCode: order.currencyCode || 'AED',
          status: order.status,
          totalPrice: order.totalPrice,
          datePlaced: new Date(order.createdAt).toISOString().split('T')[0],
          // Ensure all fields from SurpriseOrder are mapped
          userId: order.userId || 'N/A',
          storeId: order.storeId || 'N/A',
          consumerPrice: order.consumerPrice || 0,
        }));
        setAllOrders(formattedOrders);
        setTotalPages(Math.ceil(formattedOrders.length / ORDERS_PER_PAGE)); // Adjust if API provides total
        setCurrentPage(1); // Reset to first page after search
      } else {
        alert('No orders found with the given criteria from API.');
        setAllOrders([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error: unknown) {
      console.error('Failed to fetch orders:', error);
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 404) {
            alert('No orders found with the given criteria from API.');
          } else {
            alert('Unable to fetch orders from API. Please try again later.');
          }
        } else {
          alert(
            'Unable to fetch orders from API. Please check your internet connection or try again later.'
          );
        }
      } else {
        alert(
          'An unknown error occurred while searching API. Please try again later.'
        );
      }
      // Fallback to showing all mock data or empty if API search is the focus
      // fetchOrders(); // or set to empty: setAllOrders([]); setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'received':
        return (
          <div className='status-icon received'>
            <i className='fas fa-money-bill-wave'></i>
          </div>
        );
      case 'completed':
        return (
          <div className='status-icon completed'>
            <i className='fas fa-check-circle'></i>
          </div>
        );
      case 'cancelled': // Matched to mock data status "cancelled"
        return (
          <div className='status-icon cancelled'>
            {' '}
            {/* Changed class for consistency if CSS exists */}
            <i className='fas fa-times-circle'></i>{' '}
            {/* Changed icon to times-circle for cancelled */}
          </div>
        );
      case 'preparing':
        return (
          <div className='status-icon preparing'>
            <i className='fas fa-utensils'></i>
          </div>
        );
      case 'accepted':
        return (
          <div className='status-icon accepted'>
            <i className='fas fa-thumbs-up'></i>
          </div>
        );
      case 'ready for pickup':
        return (
          <div className='status-icon ready'>
            <i className='fas fa-shopping-bag'></i>
          </div>
        );
      default:
        return (
          <div className='status-icon default'>
            <i className='fas fa-question-circle'></i>
          </div>
        );
    }
  };

  const handleRefreshButton = () => {
    setCurrentPage(1); // Reset to page 1
    fetchOrders(); // Fetch mock data for the first page
  };

  return (
    <div className='orderm-main-container'>
      <Header />
      <Sidebar
        isOpen={sidebarExpanded}
        onToggle={toggleSidebar}
        onNavClick={() => {}}
      />
      <div className='order-management'>
        <div className='order-management-header'>
          <h3>Order Management</h3>
        </div>
        <div className='combined-search-bar'>
          <input
            type='text'
            placeholder='Search by Order ID (API)'
            value={searchOrderId}
            onChange={(e) => {
              setSearchOrderId(e.target.value);
              // setStartDate(''); // Keep for API search logic
              // setEndDate('');
            }}
          />

          <input
            type='date'
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              // setSearchOrderId(''); // Keep for API search logic
            }}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type='date'
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              // setSearchOrderId(''); // Keep for API search logic
            }}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button className='seeall' onClick={handleSearch}>
            Search (API)
          </button>
          <button className='seeall' onClick={toggleEditMode}>
            {editMode ? 'Done' : 'Edit'}
          </button>
          {/* This refresh button reloads the mock data for page 1 */}
          <button className='seeall' onClick={handleRefreshButton}>
            Refresh Data
          </button>
        </div>
        {editMode && selectedOrders.length > 0 && (
          <div className='bulk-actions'>
            <button onClick={() => handleBulkAction('complete')}>
              Mark as Complete (API)
            </button>
            <button onClick={() => handleBulkAction('cancel')}>
              Cancel (API)
            </button>
          </div>
        )}

        <div className='orderCard order-table'>
          {loading ? (
            <div className='loading'>Loading orders...</div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    {editMode && <th>Select</th>}
                    <th>Order ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Sales Price</th>
                    <th>Order Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.length > 0 ? (
                    allOrders.map(
                      (
                        order // Removed index as key, using order.id
                      ) => (
                        <tr key={order.id}>
                          {editMode && (
                            <td>
                              <input
                                type='checkbox'
                                checked={selectedOrders.includes(order.id)}
                                onChange={() => handleOrderSelection(order.id)}
                              />
                            </td>
                          )}
                          <td data-label='order ID'>{order.id}</td>
                          <td data-label='Product Name'>
                            {order.productName || 'N/A'}
                          </td>
                          <td data-label='# of Bags'>{order.quantity}</td>
                          <td data-label='Price'>
                            {order.salesAmount.toFixed(2)}{' '}
                            {order.currencyCode || 'AED'}
                          </td>
                          <td data-label='Order Date'>
                            {order.datePlaced || 'N/A'}
                          </td>
                          <td
                            data-label='Status'
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                            {getStatusIcon(order.status)}
                            <span
                              style={{ color: '#2E2E2E', fontWeight: 'bold' }}>
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={editMode ? 7 : 6}
                        style={{ textAlign: 'center' }}>
                        No orders to display.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {mockOrderManagementData.length > 0 && (
                <div className='pagination-controls'>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1 || loading}
                    className='pagination-arrow'>
                    &lt;
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      disabled={loading}
                      className={`pagination-page ${
                        currentPage === index + 1 ? 'active' : ''
                      }`}>
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || loading}
                    className='pagination-arrow'>
                    &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <footer className='dashboard-footer'>
        <FooterLinks />
      </footer>
    </div>
  );
};

export default OrderManagement;
