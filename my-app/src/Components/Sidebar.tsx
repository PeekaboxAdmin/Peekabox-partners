// src/Components/Sidebar.tsx
import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTachometerAlt, faGift, faTag, faClipboardList, faComments, faStore, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from './Images/food.jpg';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    onNavClick: (section: string) => void; // Add this prop for navigation
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onNavClick }) => {
    return (
        <div className={`sideBar ${isOpen ? 'expanded' : 'collapsed'}`}>
            <button className="menu-btn" onClick={onToggle}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Round Image Button with Label */}
            <div className="image-btn" onClick={() => onNavClick('profile')}>
                <img src={Logo} alt="User" className="round-image" /> <span className='namelabel'>Chowmein Stick -Dubai</span>
                <span className="image-label">Main</span>
            </div>

            {isOpen ? (
                <>
                    <ul>
                        <li onClick={() => onNavClick('dashboard')}>
                            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                        </li>
                        <li onClick={() => onNavClick('surpriseBox')}>
                            <FontAwesomeIcon icon={faGift} /> Surprise Bags
                        </li>
                        <li onClick={() => onNavClick('orderManagement')}>
                            <FontAwesomeIcon icon={faClipboardList} /> Order Management
                        </li>
                        <li onClick={() => onNavClick('customerFeedback')}>
                            <FontAwesomeIcon icon={faComments} /> Customer Interaction & Feedback
                        </li>
                        <li onClick={() => onNavClick('storeManagement')}>
                            <FontAwesomeIcon icon={faStore} /> Store Management
                        </li>
                        <li onClick={() => onNavClick('incomePayment')}>
                            <FontAwesomeIcon icon={faUsers} /> Income and Payment
                        </li>
                        <li onClick={() => onNavClick('userManagement')}>
                            <FontAwesomeIcon icon={faUsers} /> Settings
                        </li>
                        <li onClick={() => onNavClick('userManagement')}>
                            <FontAwesomeIcon icon={faUsers} /> Logout
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <button className="menu-btn" onClick={() => onNavClick('surpriseBox')}>
                        <FontAwesomeIcon icon={faGift} />
                    </button>
                    <button className="menu-btn" onClick={() => onNavClick('orderManagement')}>
                        <FontAwesomeIcon icon={faClipboardList} />
                    </button>
                    <button className="menu-btn" onClick={() => onNavClick('customerFeedback')}>
                        <FontAwesomeIcon icon={faComments} />
                    </button>
                    <button className="menu-btn" onClick={() => onNavClick('storeManagement')}>
                        <FontAwesomeIcon icon={faStore} />
                    </button>
                    <button className="menu-btn" onClick={() => onNavClick('userManagement')}>
                        <FontAwesomeIcon icon={faUsers} />
                    </button>
                </>
            )}
        </div>
    );
};

export default Sidebar;
