import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const workflows = useSelector((state) => state.workflows);

  return (
    <div>
      <ul>
        {workflows.map((workflow) => (
          <li key={workflow.id}>{workflow.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

