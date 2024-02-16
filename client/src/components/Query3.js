import React, { useState, useEffect } from 'react';
import './Query3.css';

function Query3() {
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    const fetchQuery3Data = async () => {
      try {
        const response = await fetch('/api/query3');
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

    fetchQuery3Data();
  }, []);

  return (
    <div>
      <h2>Hospital Wise received in year</h2>
      {Array.isArray(queryResult) && queryResult.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>Hospital Email</th>
              <th>Year</th>
              <th>Blood Groups</th>
            </tr>
          </thead>
          <tbody>
            {queryResult.map((result, index) => (
              <tr key={index}>
                <td>{result.hospitalName}</td>
                <td>{result.hospitalEmail}</td>
                <td>{result.year}</td>
                <td>
                  <ul>
                    {result.bloodGroups.map((group, groupIndex) => (
                      <li key={groupIndex}>
                        {group.bloodGroup}: {group.totalQuantity}
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

export default Query3;
