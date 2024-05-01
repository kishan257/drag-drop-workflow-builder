import React from 'react';
import Dashboard from './components/Dashboard';
import LeftPanel from './components/LeftPanel';
import Canvas from './components/canvas';
import { useSelector } from 'react-redux';

const App = () => {
  const csvData = useSelector(state => state.csvData?.data);

  console.log("csvData", csvData)
  return (
    <>
    <div>
      <Dashboard />
      <div className='flex'>
          <LeftPanel />
          <Canvas />
      </div>
      <div>
      {csvData?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Parsed CSV Data:</h3>
          <div className="overflow-auto max-h-60 border border-gray-300 rounded p-2">
            <pre>{JSON.stringify(csvData, null, 2)}</pre>
          </div>
        </div>
      )}
      </div>    
    </div>
    </>
  );
};

export default App;