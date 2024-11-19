// invoices.js
import React, { useState } from 'react';
import '../styles/Invoices.css';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState({ id: '', amount: '', date: '', customer: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const addInvoice = () => {
    if (invoice.id && invoice.amount && invoice.date && invoice.customer) {
      setInvoices([...invoices, invoice]);
      setInvoice({ id: '', amount: '', date: '', customer: '' });
    }
  };

  return (
    <div className="invoice-container">
      <h2>Manage Invoices</h2>
      
      <div className="invoice-form">
        <input
          type="text"
          name="id"
          placeholder="Invoice ID"
          value={invoice.id}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={invoice.amount}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={invoice.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={invoice.customer}
          onChange={handleInputChange}
        />
        <button onClick={addInvoice}>Add Invoice</button>
      </div>

      <div className="invoice-list">
        <h3>Invoice List</h3>
        <ul>
          {invoices.map((inv, index) => (
            <li key={index}>
              <span>{`ID: ${inv.id}, Amount: ${inv.amount}, Date: ${inv.date}, Customer: ${inv.customer}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Invoices;
