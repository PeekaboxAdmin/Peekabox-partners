import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';
import './CO2ReductionChart.css'
type DataPoint = {
  category: string;
  value: number;
};

const data: DataPoint[] = [
  { category: 'Bakery Items', value: 87 },
  { category: 'Dairy', value: 60 },
  { category: 'Fruit Bag', value: 110 },
  { category: 'Meal Bag', value: 75 },
  { category: 'Bakery Bag', value: 90 },
  { category: 'Snack Bag', value: 134 },
  { category: 'Veg Bag', value: 43 }
];

const CO2ReductionChart: React.FC = () => {
  return (
    <div className="chart-container1">
      <div className="chart-header1">

        <div className="chart-left-header1">
          <div className="chart-header-content1">
            <div className="writing-mode-vertical1">
              <h3 className="chart-title1">CO₂ Reduction (Kg)</h3>
            </div>
          </div>
        </div>

      
        <div className="chart-right-section1">
          <div className="chart-percentage1">
            <span className="percentage-text1">▲ +2.45%</span>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
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
                tick={{ fill: '#828898', fontSize: 8 ,fontWeight:'800px'}}
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
                barSize={20}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                ))}

                <LabelList
                  dataKey="value"
                  position="top"
                  fontSize={12}
                  fill="#A1A9BC"
                />
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


export default CO2ReductionChart
