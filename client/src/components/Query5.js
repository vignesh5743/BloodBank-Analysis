


import React, { useState } from 'react';
import './Style5.css';
function TopDonors() {
  const [limit, setLimit] = useState('');
  const [topDonors, setTopDonors] = useState([]);
  const [message, setMessage] = useState('');

  const handleFetchTopDonors = async () => {
    try {
      if (!limit || isNaN(limit) || parseInt(limit) <= 0) {
        setMessage('Invalid limit value. Please provide a positive number.');
        return;
      }

      const response = await fetch(`/api/query5?k=${limit}`);
      if (response.ok) {
        const data = await response.json();
        setTopDonors(data);
        setMessage('');
      } else {
        setMessage('Failed to fetch top donors.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div>
      <h2>Top Donors</h2>
      <div>
        <label>Limit (k):</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>
      <button onClick={handleFetchTopDonors}>Fetch Top Donors</button>
      <p>{message}</p>
      {topDonors.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Blood Group</th>
              <th>Total Donated</th>
            </tr>
          </thead>
          <tbody>
            {topDonors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.donorName}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.totalDonated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TopDonors;
