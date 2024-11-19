// orders.js
import React from 'react';
import '../styles/Orders.css';

const Orders = () => {
    return (
        <div className="orders-container">
            <header className="orders-header">
                <h3>Orders</h3>
            </header>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#1001</td>
                        <td>08/11/2023</td>
                        <td>Olivia Cooper</td>
                        <td><span className="status-pending">Pending</span></td>
                    </tr>
                    <tr>
                        <td>#1002</td>
                        <td>08/11/2023</td>
                        <td>Kevin Parsons</td>
                        <td><span className="status-fulfilled">Fulfilled</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Orders;