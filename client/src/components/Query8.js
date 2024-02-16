

import React, { useState } from 'react';

function Query8() {
  const [city, setCity] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/query8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, bloodGroup, quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessage(data.message);
          setQuantity(data.updatedQuantity);
        } else {
          console.error('Failed to delete items');
          setMessage('Failed to delete items');
        }
      } else {
        console.error('Failed to delete items');
        setMessage('Failed to delete items');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div>
      <h2>Delete Blood By Criteria</h2>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label>Blood Group:</label>
        <input
          type="text"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button onClick={handleDelete}>Delete</button>
      <p>{message}</p>
      <p>Updated Quantity: {quantity}</p>
    </div>
  );
}

export default Query8;
