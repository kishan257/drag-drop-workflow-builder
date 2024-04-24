import React from 'react';

const CSVDataOptions = () => {
  return (
    <div>
      <h3 className="mb-2 font-bold">Choose CSV Data:</h3>
      <input type="file" accept=".csv" />
    </div>
  );
};

export default CSVDataOptions;