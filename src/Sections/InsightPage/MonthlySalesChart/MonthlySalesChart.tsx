import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './MonthlySalesChart.css';

const data = [
  { month: 'Mar', sales: 150 },
  { month: 'April', sales: 80 },
  { month: 'May', sales: 100 },
  { month: 'Jun', sales: 55 },
  { month: 'Jul', sales: 180 },
  { month: 'Aug', sales: 80 },
  { month: 'Sep', sales: 250 },
];

const MonthlySalesChart = () => {
  return (
    <div className="chart-container2">
      <h2 className="chart-title2">Monthly Net Sales</h2>
      <div className="chart-wrapper2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            style={{ pointerEvents: 'none' }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              strokeDasharray="1 1"
              stroke="#82889880"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: '#666', fontSize: '12px' }}
              axisLine={false}
              tickLine={false} 
              padding={{ left: 30, right: 30 }} 
            />
            <YAxis
              label={{
                value: 'In (AED)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle' },
              }}
              tick={{ fill: '#666', fontSize: '12px' }}
              axisLine={false} 
              tickLine={false} 
              domain={[0, 250]}
              ticks={[0, 50, 100, 150, 200, 250]} 
              interval={0} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <Line
              type="linear"
              dataKey="sales"
              stroke="#FF69B4"
              strokeWidth={2}
              dot={false}  
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySalesChart;
