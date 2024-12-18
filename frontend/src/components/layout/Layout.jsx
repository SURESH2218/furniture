import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import api from '../../utils/api';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-gray-800 text-white'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <Link to='/' className='text-xl font-bold'>
                Furniture Store
              </Link>
            </div>
            <div className='flex'>
              <Link
                to='/shop'
                className='px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
              >
                Shop
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to='/wishlist'
                    className='px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
                  >
                    Wishlist
                  </Link>
                  <Link
                    to='/order-history'
                    className='px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
                  >
                    Orders
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link
                      to='/admin/dashboard'
                      className='px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className='px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to='/auth'
                  className='px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className='flex-grow'>{children}</main>
      <footer className='bg-gray-800 text-white'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
          <p className='text-center'>
            &copy; 2023 Furniture Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
