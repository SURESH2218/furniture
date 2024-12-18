import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <h1 className='text-xl font-bold'>Admin Dashboard</h1>
              </div>
              <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                <Link
                  to='/admin/users'
                  className='text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium'
                >
                  Users
                </Link>
                <Link
                  to='/admin/products'
                  className='text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium'
                >
                  Products
                </Link>
                <Link
                  to='/admin/orders'
                  className='text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium'
                >
                  Orders
                </Link>
                <Link
                  to='/admin/categories'
                  className='text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium'
                >
                  Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className='py-10'>
        <header>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold leading-tight text-gray-900'>
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
            <div className='px-4 py-8 sm:px-0'>
              <div className='border-4 border-dashed border-gray-200 rounded-lg h-96'>
                {/* Content for the dashboard overview */}
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                          <svg
                            className='h-6 w-6 text-white'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Total Users
                            </dt>
                            <dd className='text-lg font-medium text-gray-900'>
                              1,234
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Add more stat cards for products, orders, and categories */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
