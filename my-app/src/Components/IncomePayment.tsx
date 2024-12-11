import React from 'react';
import './IncomeAndPayment.css';
import BagSold from '../Sections/InsightPage/BagSold/BagSold';
import CO2ReductionChart from '../Sections/InsightPage/CO2ReductionChart/CO2ReductionChart';
import MonthlySalesChart from'../Sections/InsightPage/MonthlySalesChart/MonthlySalesChart';
import Calendar from '../Sections/InsightPage/Calendar/Calender';
import BestSellingTable from '../Sections/InsightPage/BestSellingTable/BestSellingTable';
import Header from './Header';


const IncomePayment: React.FC = () => {
  return (
    <div className="income-payment-container">
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

         {/*<TableCard title="Best-Selling Item Revenue" />*/}
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

const CalendarCard: React.FC = () => (
  <div className="income-payment-calendar-card">
    <h3>Calendar</h3>
    <div className="income-payment-calendar-placeholder">Calendar</div>
  </div>
);

const PieChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="income-payment-pie-chart-card">
    <h3>{title}</h3>
    {children}
  </div>
);

const TableCard: React.FC<{ title: string }> = ({ title }) => (
  <div className="income-payment-table-card">
    <h3>{title}</h3>
    <div className="income-payment-table-wrapper">
      <table className="income-payment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Percentage</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Donut Bag</td>
            <td>17.5%</td>
            <td>2448</td>
            <td>26-Feb-2025</td>
          </tr>
          <tr>
            <td>Pizza Bag</td>
            <td>18.0%</td>
            <td>1445</td>
            <td>28-Jan-2025</td>
          </tr>
          <tr>
            <td>Combo Bag</td>
            <td>21.3%</td>
            <td>1024</td>
            <td>5-Mar-2025</td>
          </tr>
          <tr>
            <td>Cupcakes</td>
            <td>31.5%</td>
            <td>568</td>
            <td>17-Dec-2025</td>
          </tr>
          <tr>
            <td>Beverages</td>
            <td>12.2%</td>
            <td>286</td>
            <td>17-Dec-2025</td>
          </tr>
          <tr>
            <td>Iced Latte</td>
            <td>12.2%</td>
            <td>286</td>
            <td>17-Dec-2025</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default IncomePayment;
