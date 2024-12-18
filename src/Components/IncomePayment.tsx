import React from 'react';
import './IncomeAndPayment.css';
import BagSold from '../Sections/InsightPage/BagSold/BagSold';
import CO2ReductionChart from '../Sections/InsightPage/CO2ReductionChart/CO2ReductionChart';
import MonthlySalesChart from'../Sections/InsightPage/MonthlySalesChart/MonthlySalesChart';
import Calendar from '../Sections/InsightPage/Calendar/Calender';
import BestSellingTable from '../Sections/InsightPage/BestSellingTable/BestSellingTable';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';


const IncomePayment: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
};

  return (
    <div className="income-payment-container">
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />
      <Header/>
      <header className="income-payment-header">
        <h1>Insights</h1>
      </header>

      <section className="income-payment-summary-cards">
        <SummaryCard title="Earnings" value="350.48 AED" />
        <SummaryCard title="Spend this month" value="642.39 AED" />
        <SummaryCard title="Types" value="-" />
        <SummaryCard title="Sales" value="574.34 AED" percentage="+25%" />
        <SummaryCard title="Total Sold" value="2935" />
      </section>

      <div className="income-payment-main-content">
        <div className="income-payment-left-panel">
          <ChartCard title="">
            <MonthlySalesChart/>
          </ChartCard>

          <ChartCard title="">
            <CO2ReductionChart/>
          </ChartCard>
        </div>

        <div className="income-payment-right-panel">
          <Calendar />
          <BagSold/>

          <PieChartCard title="">

         <BestSellingTable/>
          </PieChartCard>
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ title: string; value: string; percentage?: string }> = ({ title, value, percentage }) => (
  <div className="income-payment-summary-card">
    <h3>{title}</h3>
    <p>{value}</p>
    {percentage && <span className="income-payment-percentage">{percentage}</span>}
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="income-payment-chart-card">
    <h3>{title}</h3>
    {children}
  </div>
);

const PieChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="income-payment-pie-chart-card">
    <h3>{title}</h3>
    {children}
  </div>
);

export default IncomePayment;
