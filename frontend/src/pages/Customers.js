// customers.js
import React, { useState } from 'react';
import '../styles/Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const addCustomer = () => {
    if (customer.name && customer.email && customer.phone) {
      setCustomers([...customers, customer]);
      setCustomer({ name: '', email: '', phone: '' });
    }
  };

  return (
    <div className="customer-container">
      <h2>Manage Customers</h2>

      <div className="customer-form">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={customer.phone}
          onChange={handleInputChange}
        />
        <button onClick={addCustomer}>Add Customer</button>
      </div>

      <div className="customer-list">
        <h3>Customer List</h3>
        <ul>
          {customers.map((cust, index) => (
            <li key={index}>
              <span>{`Name: ${cust.name}, Email: ${cust.email}, Phone: ${cust.phone}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Customers;
