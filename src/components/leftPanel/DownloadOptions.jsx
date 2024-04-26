import React from 'react';
import { exportJSON, exportCSV } from '../../utils/exportFileUtils';

const DownloadOptions = ({ data }) => {
    
  const handleExportJSON = () => {
    exportJSON(data, 'workflow.json');
  };

  const handleExportCSV = () => {
    exportCSV(data, 'workflow.csv');
  };

  return (
    <div>
      <button onClick={handleExportJSON} className=' absolute p-1 left-0 bottom-20 px-2 rounded text-white bg-gray-400'>Export as JSON</button>
      <button onClick={handleExportCSV} className='absolute p-1 left-[140px] bottom-20 px-2 rounded text-white bg-gray-400'>Export as CSV</button>
    </div>
  );
};

export default DownloadOptions;
