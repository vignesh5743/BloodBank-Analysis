import React, { useState } from 'react';

function Query9() {
  const [city, setCity] = useState('');
  const [bloodInventory, setBloodInventory] = useState([]);
  const [message, setMessage] = useState('');

  const handleFetchBloodInventory = async () => {
    try {
      const response = await fetch(`/api/query9?city=${city}`);

      if (response.ok) {
        const data = await response.json();
        setBloodInventory(data);
        setMessage('');
      } else {
        const data = await response.json();
        setMessage(data.message);
        setBloodInventory([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
      setBloodInventory([]);
    }
  }

  return (
    <div>
      <h2>Blood Inventory by City</h2>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button onClick={handleFetchBloodInventory}>Fetch Blood Inventory</button>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Blood Group</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {bloodInventory.map((item, index) => (
            <tr key={index}>
              <td>{item.city}</td>
              <td>{item.bloodInventory.map((group) => group.bloodGroup).join(', ')}</td>
              <td>{item.bloodInventory.map((group) => group.count).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Query9;
