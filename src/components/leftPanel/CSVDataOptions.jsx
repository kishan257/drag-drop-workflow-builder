import React, { useState } from 'react';
import { parse } from 'papaparse';
import { setCSVData } from '../../redux/workflowSlice';
import { useDispatch } from 'react-redux';

const CSVDataOptions = () => {
  const [csvData, setCsvData] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const dispatch = useDispatch();
  // Function to handle file upload
  const handleFileUpload = (event) => {
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
      complete: (result) => {
        dispatch(setCSVData(result.data));
      },
      error: error => {
        console.error('CSV parsing error:', error);
      }
    });
  };

  return (
    <div>
      <h3 className="mb-2 font-bold">Choose CSV Data:</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={handleParseCSV}>Upload & Parse CSV</button>
      {parsedData.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Show CSV Data:</h3>
          <div className="overflow-auto max-h-60 border border-gray-300 rounded p-2">
            <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVDataOptions;
