import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faTachometerAlt,
    faGift,
    faClipboardList,
    faToolbox,
    faStore,
    faMoneyBill,
    faBars,
    faQuestion,
    faLock,
    faInfo,
    faSign,
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Images/food.jpg';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    className?: string; // Optional className prop
    onNavClick: (section: string) => void;
    
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle}) => {
    const navigate = useNavigate();
    const storeId = useSelector((state: any) => state.storeAuth.Store_id);
    const [store, setStore] = useState<any>(null);

    const handleNavClick = (path: string) => {
        navigate(`/${path}`);
    };


     // Fetch store data from API
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const apiurl = process.env.REACT_APP_API_URL
        const response = await axios.get(`${apiurl}/api/v1/stores/store/${storeId}`,
          {
            withCredentials: true
          }
        );
        if (response.data.success) {
          console.log(response)
          setStore(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStoreData();
  }, []);

    return (
        <div className={`sideBar ${isOpen ? 'expanded' : 'collapsed'}`}>
           {!isOpen && (<button className="menu-btn" onClick={onToggle}>
                <FontAwesomeIcon icon={faBars} />
            </button> )}

            {isOpen && (
                <button className="collapse-btn" onClick={onToggle}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            )}

            {isOpen && <h2 className="sidebar-title">Peekabox</h2>}

            <div className="company-title-section" onClick={() => handleNavClick('dashboard')}>
                <img src={Logo} alt="User" className="round-image" />
                <span className="namelabel">{store ? store.name : 'Loading...'}</span> {/* Display store name */}
            </div>

            <span className="main-label">Main</span>

            {isOpen ? (
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
                {/*  <li onClick={() => handleNavClick('customerFeedback')}>
                        <FontAwesomeIcon icon={faComments} /> Customer Interaction & Feedback
                    </li> */}
                    <li onClick={() => handleNavClick('storeManagement')}>
                        <FontAwesomeIcon icon={faStore} /> Store Management
                    </li>
                    <li onClick={() => handleNavClick('incomePayment')}>
                        <FontAwesomeIcon icon={faMoneyBill} /> Income and Payment
                    </li>
                    <span className="main-label">Settings</span>
                    <li onClick={() => handleNavClick('userManagement')}>
                        <FontAwesomeIcon icon={faToolbox} /> Settings
                    </li>
                    <div className="sidebar-last-section">
                        <li onClick={() => handleNavClick('help')}>
                            <FontAwesomeIcon icon={faQuestion} /> Help
                        </li>
                        <li onClick={() => handleNavClick('signup')}>
                            <FontAwesomeIcon icon={faLock} /> Logout
                        </li>
                    </div>
                </ul>
            ) : (
                <>
                    <button className="menu-btn" onClick={() => handleNavClick('surpriseBox')}>
                        <FontAwesomeIcon icon={faGift} />
                    </button>
                    <button className="menu-btn" onClick={() => handleNavClick('orderManagement')}>
                        <FontAwesomeIcon icon={faClipboardList} />
                    </button>
                 {/* <button className="menu-btn" onClick={() => handleNavClick('customerFeedback')}>
                        <FontAwesomeIcon icon={faComments} /> 
                    </button> */}
                    <button className="menu-btn" onClick={() => handleNavClick('storeManagement')}>
                        <FontAwesomeIcon icon={faStore} />
                    </button>
                    <button className="menu-btn" onClick={() => handleNavClick('incomePayment')}>
                        <FontAwesomeIcon icon={faMoneyBill} />
                    </button>
                    <span className="main-label">Settings</span>
                    <button className="menu-btn" onClick={() => handleNavClick('signup')}>
                        <FontAwesomeIcon icon={faToolbox} />
                    </button>
                    <button className="menu-btn" onClick={() => handleNavClick('help')}>
                        <FontAwesomeIcon icon={faQuestion} />
                    </button>
                    <button className="menu-btn" onClick={() => handleNavClick('signup')}>
                        <FontAwesomeIcon icon={faLock} />
                    </button>
                </>
            )}
        </div>
    );
};

export default Sidebar;
