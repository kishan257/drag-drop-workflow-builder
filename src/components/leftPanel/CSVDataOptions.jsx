import React, { useState } from 'react';
import { parse } from 'papaparse';

const CSVDataOptions = ({ onUpload }) => {
  const [csvData, setCsvData] = useState(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    console.log("event.target.files", event.targetSS)
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = event => {
      const text = event.target.result;
      setCsvData(text);
    };

    reader.readAsText(file);
  };

  // Function to parse CSV data and pass to parent component
  const handleParseCSV = () => {
    if (!csvData) {
      console.error('No CSV data uploaded.');
      return;
    }

    parse(csvData, {
      header: true,
      complete: result => {
        // console.log('result***********', result)
        onUpload(result.data);
      },
      error: error => {
        console.error('CSV parsing error:', error);
      }
    });
  };
  return (
    <div>
      <h3 className="mb-2 font-bold">Choose CSV Data:</h3>
      <input type="file" accept=".csv"
      onClick={handleParseCSV}
      />
      <button onClick={handleParseCSV}>Upload & Parse CSV</button>
    </div>
  );
};

export default CSVDataOptions;
