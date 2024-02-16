
import React, { useState, useEffect } from 'react';

function Query1() {
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    const fetchQuery1Data = async () => {
      try {
        const response = await fetch('/api/query1');
        if (response.ok) {
          const data = await response.json();
          setQueryResult(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchQuery1Data();
  }, []);

  return (
    <div>
      <h2>Top 5 Donors</h2>
      {Array.isArray(queryResult) && queryResult.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Blood Group</th>
              <th>Total Donated</th>
            </tr>
          </thead>
          <tbody>
            {queryResult.map((result, index) => (
              <tr key={index}>
                <td>{result.donorName}</td>
                <td>{result.bloodGroup}</td>
                <td>{result.totalDonated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Query1;
