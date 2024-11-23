// src/components/Overview.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Overview = () => {
    const data = {
        labels: ['Total Sales', 'Food Items Saved', 'Earnings', 'Reviews'],
        datasets: [
            {
                label: 'Statistics',
                data: [12, 19, 3, 5], // Sample data
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    return (
        <div>
            <h2>Overview</h2>
            <Bar data={data} />
        </div>
    );
};

export default Overview;
