import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';
import './SalesChart.css'
import FooterLinks from './FooterLink/FooterLinks';

type DataPoint = {
  category: string;
  value: number;
};

const data: DataPoint[] = [

];

const SalesChart: React.FC = () => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Sales</h2>
      </div>

      {/* Chart Section */}
      <div className="chart-right-section">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="#FF80B4" stopOpacity={0.8} />
                <stop offset="80%" stopColor="#0B4B2C" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#828898', fontSize: 8, fontWeight: 800 }}
              interval={0}
              angle={0}
              textAnchor="middle"
              dy={2}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#828898', fontSize: 12 }}
              domain={[0, 150]}
              ticks={[0, 50, 100, 150]}
            />

            <Bar
              dataKey="value"
              radius={[20, 20, 0, 0]}
              barSize={30}
            >
              {data.length > 0 && 
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#barGradient)" />
              ))
            }
              <LabelList
                dataKey="value"
                fontSize={12}
                fill="#A1A9BC"
              />
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
      <footer className="dashboard-footer">
        <FooterLinks />
      </footer>
    </div>
  );
};

export default SalesChart;
