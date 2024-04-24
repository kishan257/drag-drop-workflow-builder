import React from 'react';
import Dashboard from './components/Dashboard';
import LeftPanel from './components/LeftPanel';
import Canvas from './components/canvas';

const App = () => {
  return (
    <>
    <div>
      <Dashboard />
      <div className='flex'>
          <LeftPanel />
          <Canvas />
        </div>
    </div>
    </>
  );
};

export default App;