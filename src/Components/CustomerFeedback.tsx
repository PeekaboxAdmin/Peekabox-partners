import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFlag, faSearch, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import './CustomerFeedback.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Logo1 from './Images/food.jpg';
import FooterLinks from './FooterLink/FooterLinks';

interface Review {
    id: number;
    customerName: string;
    orderNumber: string;
    surpriseBag: string;
    date: string;
    time: string;
    rating: number;
    comment: string;
    reported: boolean;
}

const CustomerFeedback: React.FC = () => {
    const reviewsPerPage = 5; // Number of reviews per page
    const [reviews, setReviews] = useState<Review[]>([
        { id: 1, customerName: 'Alfa', orderNumber: 'Order #123', surpriseBag: 'Banana Pudding', date: '11-Nov-2024', time: '12:00 - 13:00', rating: 5, comment: 'Loved the Banana Pudding!', reported: false },
        { id: 2, customerName: 'John', orderNumber: 'Order #321', surpriseBag: 'Croissants', date: '06-Nov-2024', time: '14:00 - 15:00', rating: 4, comment: 'Croissants were fresh and tasty.', reported: false },
        { id: 3, customerName: 'Sophia', orderNumber: 'Order #456', surpriseBag: 'Cupcakes', date: '05-Nov-2024', time: '13:00 - 14:00', rating: 3, comment: 'Could use more flavor.', reported: false },
        { id: 4, customerName: 'Oliver', orderNumber: 'Order #789', surpriseBag: 'Chocolate Cake', date: '02-Nov-2024', time: '16:00 - 17:00', rating: 5, comment: 'Best chocolate cake ever!', reported: false },
        { id: 5, customerName: 'Amelia', orderNumber: 'Order #101', surpriseBag: 'Fruit Tart', date: '01-Nov-2024', time: '10:00 - 11:00', rating: 2, comment: 'Too sour for my taste.', reported: false },
        { id: 6, customerName: 'Ethan', orderNumber: 'Order #102', surpriseBag: 'Muffins', date: '30-Oct-2024', time: '09:00 - 10:00', rating: 4, comment: 'Great muffins, will order again!', reported: false },
        { id: 7, customerName: 'Isabella', orderNumber: 'Order #103', surpriseBag: 'Brownies', date: '28-Oct-2024', time: '15:00 - 16:00', rating: 5, comment: 'Delicious brownies, highly recommended!', reported: false },
        // Add more reviews here...
    ]);

    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [reply, setReply] = useState("");
    const [ratingFilter, setRatingFilter] = useState<number | null>(null); // State for filtering by rating
    const [currentPage, setCurrentPage] = useState(1); // State for the current page

    const handleReportReview = (id: number) => {
        setReviews(reviews.map(review => review.id === id ? { ...review, reported: !review.reported } : review));
    };

    const handleCommentClick = (review: Review) => {
        setSelectedReview(review);
    };

    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply(e.target.value);
    };

    const handleCloseModal = () => {
        setSelectedReview(null);
        setReply("");
    };

    const handleRatingFilterChange = (rating: number | null) => {
        setRatingFilter(rating);
    };

    // Filter reviews based on selected rating
    const filteredReviews = ratingFilter
        ? reviews.filter(review => review.rating === ratingFilter)
        : reviews;

    // Pagination logic
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
    };

    return (
        <div className='feebackcontainer-main'>
            <Header/>
            <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />
        <div className="feedback-container">
           
            <h2 className='cusfheading'>Customers' Feedback</h2>
            
            <div className="filter-search-container">
                <div className="filter-container">
                    <span>Filter by Rating:</span>
                    <select
                        value={ratingFilter || ''}
                        onChange={(e) => handleRatingFilterChange(Number(e.target.value) || null)}
                        className="rating-dropdown"
                    >
                        <option value="">All</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>

                <div className="search-container">
                    <input type="text" placeholder="Search" />
                  
                </div>
            </div>

            <table className="feedback-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Order Number</th>
                        <th>Surprise Bag</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Ratings</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReviews.map(review => (
                        <tr key={review.id}>
                                        <td>
                <input
                    type="checkbox"
                    id={`checkbox-${review.id}`}
                    value={review.id}
                    style={{ cursor: 'pointer' }}
                />
            </td>

                            <td data-label="Customer Name">{review.customerName}</td>
                            <td data-label="Order Number">{review.orderNumber}</td>
                            <td data-label="Review">{review.surpriseBag}</td>
                            <td data-label="Date">{review.date}</td>
                            <td data-label="Time">{review.time}</td>
                            <td data-label="Rating cells" className="rating-cell">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        color={i < review.rating ? "#FF69B4" : "#ccc"}
                                    />
                                ))}
                            </td>
                            <td>
                                <button onClick={() => handleCommentClick(review)} className="comment-button">
                                    <FontAwesomeIcon icon={faCommentDots} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Modal for Comments */}
            {selectedReview && (
                <div className="modal-overlay">
                    <div className="modalreply">
                        <img className='replyroundeImage' src={Logo1}></img>
                        <h3>Comment by {selectedReview.customerName}</h3>
                        <h3>Order 123</h3>
                        <p>{selectedReview.comment}</p>
                        <textarea
                            value={reply}
                            onChange={handleReplyChange}
                            placeholder="Write your reply here..."
                            className="reply-textarea"
                        ></textarea>
                        <div className="modal-actions">
                            <button onClick={handleCloseModal} className="close-button">Close</button>
                            <button onClick={() => alert('Reply sent!')} className="send-button">Send Reply</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <footer className="dashboard-footer">
            <FooterLinks />
        </footer>
        </div>
    );
};

export default CustomerFeedback;
