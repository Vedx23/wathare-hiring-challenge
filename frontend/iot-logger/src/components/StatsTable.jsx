import React from 'react';

const StatsTable = ({ stats }) => {
  return (
    <div className='flex flex-col items-center justify-center border-2 rounded-md border-black'>
      <h2 className='text-3xl p-3'>Statistics</h2>
      <table className='table table-zebra table-lg'>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
