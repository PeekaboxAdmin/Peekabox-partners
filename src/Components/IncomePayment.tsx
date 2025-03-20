"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, DollarSign, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileSidebar from "./SideBarMobile";
import PaymentTable from "../Sections/InsightPage/PaymentTable";
import "./IncomePayment.css";
import axios from "axios";

const IncomePayment: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [salesData, setSalesData] = useState<any>({}); // Ensure it's not null
  const storeId = useSelector((state: any) => state.storeAuth?.Store_id);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const apiurl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiurl}/api/v1/stores/paymentTotalSalesDeatils/6785ba32f6d68eb6561cdca1`, 
          { withCredentials: true }
        );
  
        if (response.data.success && response.data.data.success) {
          setSalesData(response.data.data.data);
        } else {
          throw new Error("Failed to fetch sales data");
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
  
    if (storeId) {
      fetchSalesData();
    }
  }, [storeId]);

  const statsCards = [
    {
      icon: <BarChart3 />,
      title: "Total Sales",
      value: salesData?.totalGrossSales || "N/A",
      iconBg: "bg-pink-50",
    },
    {
      icon: <DollarSign />,
      title: "Total Platform Commission",
      value: salesData?.totalNetSales || "N/A",
      iconBg: "bg-green-50",
    },
    {
      icon: <ShoppingBag />,
      title: "Total Bag Sold",
      value: salesData?.totalQuantitySold || "N/A",
      iconBg: "bg-green-50",
    },
  ];

  return (
    <div className="income-payment-container">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
      <Sidebar isOpen={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} onNavClick={() => {}} />

      <div className="income-content">
        <div className="stats-cards">
          {statsCards.map((card, index) => (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${card.iconBg}`}>{card.icon}</div>
              <div className="stat-info">
                <h3>{card.title}</h3>
                <p className="stat-value">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="main-grid">
          <PaymentTable />
        </div>

        <div className="bottom-section"></div>
      </div>
    </div>
  );
};

export default IncomePayment;
