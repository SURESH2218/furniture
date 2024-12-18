import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold my-4'>Order Management</h2>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Order ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  User
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Total
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {order.user.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    ${order.total.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {order.status}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                      <option value='pending'>Pending</option>
                      <option value='processing'>Processing</option>
                      <option value='shipped'>Shipped</option>
                      <option value='delivered'>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedOrder && (
        <div className='mt-4'>
          <h3 className='text-lg font-semibold'>Order Details</h3>
          {/* Add order details here */}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
