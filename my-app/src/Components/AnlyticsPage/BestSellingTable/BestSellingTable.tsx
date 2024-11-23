import React from 'react';
import './BestSellingTable.css';

interface SaleItem {
  name: string;
  percentage: number;
  quantity: number;
  date: string;
}

const BestSellingTable: React.FC = () => {
  const salesData: SaleItem[] = [
    { name: "Donut Bag", percentage: 17.5, quantity: 2458, date: "24-Jan-2025" },
    { name: "Pizza Bag", percentage: 10.8, quantity: 1485, date: "12-Jun-2025" },
    { name: "Combo Bag", percentage: 21.3, quantity: 1024, date: "5-Jan-2025" },
    { name: "Cupcakes", percentage: 31.5, quantity: 858, date: "7-Mar-2025" },
    { name: "Beverages", percentage: 12.2, quantity: 258, date: "17-Dec-2025" },
    { name: "Iced Lattes", percentage: 12.2, quantity: 258, date: "17-Dec-2025" },
  ];

  return (
    <div className="best-selling-table">
      <div className="best-selling-table-header">
        <h2>Best-Selling Item Revenue</h2>
      </div>
      
      <div className="best-selling-table-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Percentage</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item, index) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.percentage}%</td>
                <td>{item.quantity.toLocaleString()}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellingTable;
