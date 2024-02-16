
import React, { useState, useEffect } from 'react';
import './Query2.css'; 

function Query2() {
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    const fetchQuery2Data = async () => {
      try {
        const response = await fetch('/api/query2');
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

    fetchQuery2Data();
  }, []);

  return (
    <div>
      <h2>City-Wise~blood-GroupWise~Stocks</h2>
      {Array.isArray(queryResult) && queryResult.length > 0 ? (
        <table className="query2-table"> 
          <thead>
            <tr>
              <th>City</th>
              <th>Blood Inventory</th>
            </tr>
          </thead>
          <tbody>
            {queryResult.map((result, index) => (
              <tr key={index}>
                <td>{result.city}</td>
                <td>
                  <ul>
                    {result.bloodInventory.map((inventory, i) => (
                      <li key={i}>
                        <strong>Blood Group:</strong> {inventory.bloodGroup}, <strong>Count:</strong> {inventory.count}
                      </li>
                    ))}
                  </ul>
                </td>
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

export default Query2;
