// Dashboard.
import React from 'react';
import Stats from '../components/Stats';
import Chart from '../components/Chart';
import ToDoList from '../components/ToDoList';
//import './Dashboard.css';

const Dashboard = () => {
  return (
  <div className="dashboard">
    <h3>Welcome to the Dashboard!</h3>
      <Stats />
      <Chart />
      <ToDoList />
    </div>
  );
};

export default Dashboard;
