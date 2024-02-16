import React, { useState } from 'react';

function Query7() {
  const [year, setYear] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  const handleFetchData = async () => {
    try {
      const response = await fetch(`/api/query7?year=${year}`);

      if (response.ok) {
        const result = await response.json();
        setData(result);
        setMessage('');
      } else {
        console.error('Failed to fetch data');
        setMessage('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div>
      <h2>Query 7: Hospital Blood Donation Statistics by Year</h2>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <button onClick={handleFetchData}>Fetch Data</button>
      <p>{message}</p>
      <div>
        <h3>Results for Year: {year}</h3>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Hospital Name</th>
                <th>Email</th>
                <th>Blood Groups</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.hospitalName}</td>
                  <td>{item.hospitalEmail}</td>
                  <td>
                    {item.bloodGroups.map((bg, bgIndex) => (
                      <p key={bgIndex}>
                        Blood Group: {bg.bloodGroup}, Quantity: {bg.totalQuantity}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for the specified year.</p>
        )}
      </div>
    </div> 
  );
}

export default Query7;
