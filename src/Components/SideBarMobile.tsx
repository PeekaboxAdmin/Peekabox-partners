import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBarMobile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faBars,
    faTachometerAlt,
    faGift,
    faClipboardList,
    faComments,
    faStore,
    faUsers,
    faQuestion,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Images/food.jpg';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const MobileSidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
    const navigate = useNavigate();

    const handleNavClick = (path: string) => {
        navigate(`/${path}`);
        if (window.innerWidth <= 768) {
            onToggle(); // Auto-close the sidebar on mobile navigation
        }
    };

    return (
        <div className={`mobile-sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
            <button
                className={`mhamburger-btn ${isOpen ? 'collapse-btn' : ''}`}
                onClick={onToggle}
            >
                <FontAwesomeIcon icon={isOpen ? faArrowRight : faBars} />
            </button>

            {isOpen && (
                <>
                    <div className="msidebar-overlay visible" onClick={onToggle}></div>
                    <div className="msidebar-content open">
                        <h2 className="msidebar-title">Peekabox</h2>
                        <div
                            className="company-title-section"
                            onClick={() => handleNavClick('dashboard')}
                        >
                            <img src={Logo} alt="User" className="round-image" />
                            <span className="mnamelabel">Chowmein Stick - Dubai</span>
                        </div>
                        <span className="main-label">Main</span>
                        <ul className="msidebar-menu">
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
                            <span className="main-label">Settings</span>
                            <li onClick={() => handleNavClick('userManagement')}>
                                <FontAwesomeIcon icon={faUsers} /> Settings
                            </li>
                            <div className="msidebar-last-section">
                                <li onClick={() => handleNavClick('signup')}>
                                    <FontAwesomeIcon icon={faQuestion} /> Help
                                </li>
                                <li onClick={() => handleNavClick('signup')}>
                                    <FontAwesomeIcon icon={faLock} /> Logout
                                </li>
                            </div>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default MobileSidebar;
