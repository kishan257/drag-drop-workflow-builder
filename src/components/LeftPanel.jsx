import React from 'react';
import CSVDataOptions from './leftPanel/CSVDataOptions';
import ArrayMethodNodes from './leftPanel/ArrayMethodNodes';

const LeftPanel = () => {
  return (
     <div className="w-1/4 bg-gray-200 p-4">
      <CSVDataOptions />
      <ArrayMethodNodes />
   </div>
  );
};

export default LeftPanel;
