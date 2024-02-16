import React, { useState } from 'react';

function Query4() {
  const [city, setCity] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/query4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, bloodGroup, quantity }),
      });

      if (response.ok) {
        setSuccessMessage('Items deleted successfully');
        setCity('');
        setBloodGroup('');
        setQuantity('');
      } else {
        console.error('Failed to delete items');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Delete Inventory Items</h2>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        <label>Blood Group:</label>
        <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <button onClick={handleDelete}>Delete</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default Query4;
