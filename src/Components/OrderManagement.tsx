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
            <Header />
            <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />
            <div className="order-management">
                <h3>Order Management</h3>

                {/* Filters */}
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search by name or address"
                        value={searchText}
                        onChange={handleSearchChange}
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

                {/* Table */}
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
                                    <td data-label="Select">
                                        <input type="checkbox" id={`checkbox-${order.id}`} />
                                    </td>
                                    <td data-label="Customer Name">{order.customerName}</td>
                                    <td data-label="Address">{order.address}</td>
                                    <td data-label="Order Date">{order.datePlaced}</td>
                                    <td data-label="Quantity">{order.quantity}</td>
                                    <td data-label="Pick-Up Time">{order.pickUpTime}</td>
                                    <td data-label="Receipt">{order.receipt}</td>
                                    <td data-label="Status">
                                        <span className={`badge2 ${order.status.toLowerCase()}`}>{order.status}</span>
                                    </td>
                                    <td data-label="Actions">
                                        <button onClick={() => toggleDropdown(order.id)} className="action-btn">
                                            •••
                                        </button>
                                        {dropdownOrderId === order.id && (
                                            <div className="dropdown-menu" ref={dropdownRef}>
                                                <button onClick={() => markAsCompleted(order.id)}>Complete</button>
                                                <button onClick={() => markAsPending(order.id)}>Pending</button>
                                                <button onClick={() => cancelAndRefund(order.id)}>Cancel and Refund</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="pagination-controls">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
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
