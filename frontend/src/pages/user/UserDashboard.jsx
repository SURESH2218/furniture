import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Welcome, {user.name}!</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <DashboardCard
          title='My Profile'
          description='View and edit your personal information'
          link='/profile'
        />
        <DashboardCard
          title='My Wishlist'
          description="Check items you've saved for later"
          link='/wishlist'
        />
        <DashboardCard
          title='Order History'
          description='View your past orders and their status'
          link='/order-history'
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, description, link }) => (
  <div className='bg-white shadow-md rounded-lg p-6'>
    <h2 className='text-xl font-semibold mb-2'>{title}</h2>
    <p className='text-gray-600 mb-4'>{description}</p>
    <Link
      to={link}
      className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300'
    >
      View
    </Link>
  </div>
);

export default UserDashboard;
