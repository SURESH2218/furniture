import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  if (isLoading) return <div>Loading order history...</div>;
  if (error) return <div className='text-red-500'>{error}</div>;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold my-4'>Order History</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className='space-y-8'>
          {orders.map((order) => (
            <div
              key={order.id}
              className='bg-white shadow overflow-hidden sm:rounded-lg'
            >
              <div className='px-4 py-5 sm:px-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Order #{order.id}
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className='border-t border-gray-200'>
                <dl>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Status
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {order.status}
                    </dd>
                  </div>
                  <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>Total</dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      ${order.total.toFixed(2)}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>Items</dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                        {order.items.map((item) => (
                          <li
                            key={item.id}
                            className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                          >
                            <div className='w-0 flex-1 flex items-center'>
                              <span className='ml-2 flex-1 w-0 truncate'>
                                {item.name} x {item.quantity}
                              </span>
                            </div>
                            <div className='ml-4 flex-shrink-0'>
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;