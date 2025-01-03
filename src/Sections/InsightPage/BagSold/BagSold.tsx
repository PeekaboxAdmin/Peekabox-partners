import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import './BagSold.css';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const BagSold = () => {
  const data: CategoryData[] = [
   
   
    { name: 'Seafood', value: 63, color: '#FF99B8' },
    { name: 'Beverages', value: 25, color: '#E2E2E2' },
    { name: 'Desserts', value: 25, color: '#FFB52E' },
    { name: 'Meal', value: 63, color: '#1E513C' },
   
    
  
  ];

  const CustomizedLegend = ({ payload }: any) => {
    return (
      <div className="legend-containerb">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="legend-itemb">
            <div
              className="legend-colorb"
              style={{ backgroundColor: entry.color }}
            />
            <div className="legend-text-containerb">
              <span className="legend-textb">{entry.value}</span>
              <span className="legend-numberb">{data[index].value}%</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="containerbagsold">
      <h2 className="title1b">Bag Sold by Category</h2>
      <div className="subtitle1b">Monthly
      <svg className="iconb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
      <path d="M12 17l-5-5h10z" />

          </svg>
      </div>
      <div className="chart-containerb">
        <PieChart width={300} height={230}>
          <Pie
            data={data}
            cx="60%"
            cy="60%"
            innerRadius={0}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            startAngle={0}
            
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
      </div>
    </div>
  );
};

export default BagSold;
