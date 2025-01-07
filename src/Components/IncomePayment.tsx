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
import EarningsIcon from '../assets/images/Earn.png'
import SalesIcon from '../assets/images/sales.png'
import total from '../assets/images/total.png'
import InsightCard from './InsightCard/InsightCard';


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


      <section className="cards">
       <InsightCard
              title="Earnings"
              value="350.4B AED"
              icon={EarningsIcon}
              text=""
              
            />
            <InsightCard
               title="spend this month"
               value="642.93 AED"
               icon={SalesIcon}
               text=""
                />
        <InsightCard
               title="spend this month"
               value="Types"
               icon={SalesIcon}
               text=""
                />
          <InsightCard
           title="spend this month"
          value="642.93 AED"
          icon={SalesIcon}
          text=""
          />
        <InsightCard
              title="Sales"
               value="574.34 AED"

               text=" since last month"
               percentage="+23%"
                />
        <InsightCard
              title="Total Sold"
              value="2935"
               icon={total}
               text=""
                />

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
