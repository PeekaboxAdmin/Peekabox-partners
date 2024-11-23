// src/components/Notifications.js
import React from 'react';

const Notifications = () => {
    const notifications = [
        'New order received: Pizza',
        'Order completed: Burger',
        'New feedback received for Sushi',
    ];

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
