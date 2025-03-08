"use client"

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import './BagsSold.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const BagsSold = () => {
  const [timePeriod, setTimePeriod] = React.useState('monthly')

  const data = {
    labels: ['Seafood', 'Meal', 'Desserts', 'Beverages'],
    datasets: [
      {
        data: [63, 63, 25, 25],
        backgroundColor: [
          '#ff80b4', // Seafood - Pink
          '#2F5A45', // Meal - Dark Green
          '#FFD166', // Desserts - Yellow
          '#E5E7EB', // Beverages - Gray
        ],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  }

  const categories = [
    { name: 'Seafood', percentage: '63%', color: '#ff80b4' },
    { name: 'Meal', percentage: '63%', color: '#2F5A45' },
    { name: 'Desserts', percentage: '25%', color: '#FFD166' },
    { name: 'Beverages', percentage: '25%', color: '#E5E7EB' },
  ]

  return (
    <div className="bags-sold-container">
      <div className="bags-sold-header">
        <h2>Bag Sold by Category</h2>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="time-period-select"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.name} className="category-item">
            <div className="category-info">
              <span 
                className="category-dot" 
                style={{ backgroundColor: category.color }}
              />
              <span className="category-name">{category.name}</span>
              <span className="category-percentage">{category.percentage}</span>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  )
}

export default BagsSold
