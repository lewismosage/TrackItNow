// report.js
import React from 'react';
import '../styles/Reports.css';

const Report = () => {
    return (
        <div className="report-container">
            <header className="report-header">
                <h3>Reports Overview</h3>
            </header>
            <section className="report-summary">
                <div className="report-card">
                    <p>Total Sales</p>
                    <h2>786</h2>
                </div>
                <div className="report-card">
                    <p>Revenue</p>
                    <h2>$17,584</h2>
                </div>
                <div className="report-card">
                    <p>Total Customers</p>
                    <h2>1.8k</h2>
                </div>
            </section>
            <section className="report-chart">
                <h3>Sales and Purchase Statistics</h3>
                <div className="chart-placeholder"> {/* Chart goes here */}</div>
            </section>
        </div>
    );
};

export default Report;
