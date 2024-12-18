import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/slices/authSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6 text-black'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8'>
        <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
        {user ? (
          <div>
            <div className='mb-4'>
              <p className='text-xl'>
                Welcome, <span className='font-bold'>{user.name}</span>!
              </p>
              <p className='text-gray-600'>Email: {user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Please log in to view your dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
