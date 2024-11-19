import React, { useState } from 'react';

const InventoryTable = ({ searchQuery }) => {
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'White Oil', quantity: '50 liter', price: 110, value: 5500 },
    { id: 2, name: 'Basmati Rice', quantity: '80 kg', price: 55, value: 4400 },
    { id: 3, name: 'Torch', quantity: '10 unit', price: 68, value: 680 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '', value: '' });
  const [isEditing, setIsEditing] = useState(null);

  // Handle input changes for the new item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new item
  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.price) {
      const price = parseFloat(newItem.price);
      const newItemValue = { ...newItem, value: price * parseInt(newItem.quantity, 10) || 0 };
      setInventoryItems([...inventoryItems, { id: Date.now(), ...newItemValue }]);
      setNewItem({ name: '', quantity: '', price: '', value: '' });
    }
  };

  // Handle edit functionality
  const handleEditItem = (id) => {
    const itemToEdit = inventoryItems.find((item) => item.id === id);
    setNewItem(itemToEdit);
    setIsEditing(id);
  };

  // Handle update functionality
  const handleUpdateItem = () => {
    const updatedItems = inventoryItems.map((item) =>
      item.id === isEditing ? { ...newItem, id: isEditing } : item
    );
    setInventoryItems(updatedItems);
    setNewItem({ name: '', quantity: '', price: '', value: '' });
    setIsEditing(null);
  };

  // Handle delete functionality
  const handleDeleteItem = (id) => {
    const updatedItems = inventoryItems.filter((item) => item.id !== id);
    setInventoryItems(updatedItems);
  };

  // Filter items based on the search query
  const filteredItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price / unit</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.value}</td>
              <td>
                <button onClick={() => handleEditItem(item.id)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Item Section */}
      <div id="add-item-section" className="add-item-section">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price per unit"
          value={newItem.price}
          onChange={handleInputChange}
        />

        <button onClick={isEditing ? handleUpdateItem : handleAddItem}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
    </>
  );
};

export default InventoryTable;
