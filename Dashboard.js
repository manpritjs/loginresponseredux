import React from 'react';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const userLname = useSelector((state) => {
    console.log(state.userdata,"state")
    return state.userdata.user.lname});
  return (
    <div>
      <h2>Dashboard</h2>
      <p>{userLname}</p>
    </div>
  );
};

export default Dashboard;
