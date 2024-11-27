import React from 'react';
import './Stats.css';
import Card from './Card';

const Stats = () => {
  const statsData = [
    { label: 'New Clients', value: 54, trend: '+18%' },
    { label: 'Invoices Overdue', value: 6, trend: '-4.27%' },
    { label: 'Bank Balance', value: '$143,624' },
    { label: 'Transactions', value: 12 },
  ];

  return (
    <div className="stats-container">
      {statsData.map((stat, index) => (
        <Card key={index} label={stat.label} value={stat.value} trend={stat.trend} />
      ))}
    </div>
  );
};

export default Stats;
