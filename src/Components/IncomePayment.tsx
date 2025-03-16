"use client"

import React from 'react'
import { BarChart3, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react'
import Header from './Header'
import Sidebar from './Sidebar'
import MobileSidebar from './SideBarMobile'
import PaymentTable from '../Sections/InsightPage/PaymentTable'
import CO2ReductionChart from '../Sections/InsightPage/CO2ReductionChart/CO2ReductionChart'
import MonthlySalesChart from '../Sections/InsightPage/MonthlySalesChart/MonthlySalesChart'
import Calendar from '../Sections/InsightPage/Calendar/Calender'
import BagsSold from '../Sections/InsightPage/BagsSold/BagsSold'
import './IncomePayment.css'

const IncomePayment: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false)

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  const statsCards = [
    {
      icon: <BarChart3  />,
      title: "Earnings",
      value: "350.4B AED",
      iconBg: "bg-pink-50",
    },
    {
      icon: <DollarSign/>,
      title: "Spend this month",
      value: "642.39 AED",
      iconBg: "bg-green-50",
    },
    {
      icon: <TrendingUp />,
      title: "Sales",
      value: "574.34 AED",
      change: "+23% since last month",
      iconBg: "bg-green-50",
    },
    {
      icon: <ShoppingBag />,
      title: "Total Sold",
      value: "2935",
      iconBg: "bg-green-50",
    },
  ]

  return (
    <div className="income-payment-container">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      <div className="income-content">
        <div className="stats-cards">
          {statsCards.map((card, index) => (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${card.iconBg}`}>
                {card.icon}
              </div>
              <div className="stat-info">
                <h3>{card.title}</h3>
                <p className="stat-value">{card.value}</p>
                {card.change && <span className="stat-change positive">{card.change}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="main-grid">
            <PaymentTable/>
            <MonthlySalesChart />
            
        </div>

        <div className="bottom-section">
            
        </div>
      </div>
    </div>
  )
}

export default IncomePayment
