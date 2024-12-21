import React from 'react';
import { Outlet } from 'react-router-dom';
import Homenavbar from './Homenavbar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Homenavbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;