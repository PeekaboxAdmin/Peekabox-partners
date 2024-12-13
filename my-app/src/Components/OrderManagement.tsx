import React, { useState, useEffect, useRef } from 'react';
import './Table.css';
import Header from './Header';
import Sidebar from './Sidebar';

interface SurpriseOrder {
    id: number;
    status: string;
    amount: string;
    customerName: string;
    address: string;
    datePlaced: string;
    quantity: number;
    pickUpTime: string;
    receipt: string;
}

interface OrderManagementProps {
    surpriseOrders: SurpriseOrder[];
    markAsCompleted: (id: number) => void;
    markAsPending: (id: number) => void;
    cancelAndRefund: (id: number) => void;
}

const OrderManagement: React.FC<OrderManagementProps> = ({
    surpriseOrders,
    markAsCompleted,
    markAsPending,
    cancelAndRefund,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOrderId, setDropdownOrderId] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const ordersPerPage = 3;
    const filteredOrders = surpriseOrders
        .filter(order => 
            order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
            order.address.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter(order => {
            const orderDate = new Date(order.datePlaced);
            const isAfterStartDate = startDate ? orderDate >= new Date(startDate) : true;
            const isBeforeEndDate = endDate ? orderDate <= new Date(endDate) : true;
            return isAfterStartDate && isBeforeEndDate;
        });

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const currentOrders = filteredOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const toggleDropdown = (orderId: number) => {
        setDropdownOrderId(dropdownOrderId === orderId ? null : orderId);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOrderId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'startDate') setStartDate(value);
        if (name === 'endDate') setEndDate(value);
        setCurrentPage(1);
    };

    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
    };

    return (
        <div className='orderm-main-container'>
            <Header/>
            <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />
        <div className="order-management">
            <h3>Order Management</h3>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name or address"
                    value={searchText}
                    onChange={handleSearchChange}
                    style={{ padding: '8px', width: '200px' }}
                />
                <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleDateChange}
                    style={{ padding: '8px' }}
                />
                <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleDateChange}
                    style={{ padding: '8px' }}
                />
            </div>

            <div className="card order-table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Order Date</th>
                            <th>Quantity</th>
                            <th>Pick-Up Time</th>
                            <th>Receipt</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                             <tr key={order.id}>
                             <td>
                                 <input
                                     type="checkbox"
                                     id={`checkbox-${order.id}`}
                                     value={order.id}
                                     style={{ cursor: 'pointer' }}
                                 />
                             </td>
                                <td>{order.customerName}</td>
                                <td>{order.address}</td>
                                <td>{order.datePlaced}</td>
                                <td>{order.quantity}</td>
                                <td>{order.pickUpTime}</td>
                                <td>{order.receipt}</td>
                                <td>
                                <span className={`badge2 ${order.status.toLowerCase()}`}>{order.status}</span>
                                </td>
                                <td>
                                    <div className="actions" style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => toggleDropdown(order.id)}
                                            className="action-btn"
                                            style={{ background: 'transparent', color: 'black', border: 'none', cursor: 'pointer', fontSize: '20px' }}
                                        >
                                            •••
                                        </button>
                                        {dropdownOrderId === order.id && (
                                            <div className="dropdown-menu" style={{ position: 'absolute', backgroundColor: 'black', border: '1px solid #ccc', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', zIndex: 1000, width: '150px', padding: '8px' }} ref={dropdownRef}>
                                                <button onClick={() => { markAsCompleted(order.id); setDropdownOrderId(null); }} style={{ width: '100%', padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>Complete</button>
                                                <button onClick={() => { markAsPending(order.id); setDropdownOrderId(null); }} style={{ width: '100%', padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>Pending</button>
                                                <button onClick={() => { cancelAndRefund(order.id); setDropdownOrderId(null); }} style={{ width: '100%', padding: '8px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel and Refund</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '8px' }}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                backgroundColor: currentPage === index + 1 ? '#333' : '#f4f4f4',
                                color: currentPage === index + 1 ? '#fff' : '#333',
                                cursor: 'pointer',
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default OrderManagement;
