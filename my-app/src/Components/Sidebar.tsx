// src/Components/Sidebar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTachometerAlt, faGift, faTag, faClipboardList, faComments, faStore, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from './Images/food.jpg';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    onNavClick: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
    const navigate = useNavigate();

    const handleNavClick = (path: string) => {
        navigate(`/${path}`);
    };

    return (
        <div className={`sideBar ${isOpen ? 'expanded' : 'collapsed'}`}>
            <button className="menu-btn" onClick={onToggle}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Round Image Button with Label */}
            <div className="image-btn" onClick={() => handleNavClick('dashboard')}>
                <img src={Logo} alt="User" className="round-image" />
                <span className='namelabel'>Chowmein Stick -Dubai</span>
                <span className="image-label">Main</span>
            </div>

            {isOpen ? (
                <>
                    <ul>
                        <li onClick={() => handleNavClick('dashboard')}>
                            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                        </li>
                        <li onClick={() => handleNavClick('surpriseBox')}>
                            <FontAwesomeIcon icon={faGift} /> Surprise Bags
                        </li>
                        <li onClick={() => handleNavClick('orderManagement')}>
                            <FontAwesomeIcon icon={faClipboardList} /> Order Management
                        </li>
                        <li onClick={() => handleNavClick('customerFeedback')}>
                            <FontAwesomeIcon icon={faComments} /> Customer Interaction & Feedback
                        </li>
                        <li onClick={() => handleNavClick('storeManagement')}>
                            <FontAwesomeIcon icon={faStore} /> Store Management
                        </li>
                        <li onClick={() => handleNavClick('incomePayment')}>
                            <FontAwesomeIcon icon={faUsers} /> Income and Payment
                        </li>
                        <li onClick={() => handleNavClick('userManagement')}>
                            <FontAwesomeIcon icon={faUsers} /> Settings
                        </li>
                        <li onClick={() => handleNavClick('signup')}>
                            <FontAwesomeIcon icon={faUsers} /> Logout
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <button className="menu-btn" onClick={() => handleNavClick('surpriseBox')}>
                        <FontAwesomeIcon icon={faGift} />
                    </button>
                    <button className="menu-btn" onClick={() => handleNavClick('orderManagement')}>
                        <FontAwesomeIcon icon={faClipboardList} />
                    </button>
                    <button className="menu-btn" onClick={() => handleNavClick('customerFeedback')}>
                        <FontAwesomeIcon icon={faComments} />
                    </button>
                    <button className="menu-btn" onClick={() => handleNavClick('storeManagement')}>
                        <FontAwesomeIcon icon={faStore} />
                    </button>
                    <button className="menu-btn" onClick={() => handleNavClick('signup')}>
                        <FontAwesomeIcon icon={faUsers} />
                    </button>
                </>
            )}
        </div>
    );
};

export default Sidebar;
