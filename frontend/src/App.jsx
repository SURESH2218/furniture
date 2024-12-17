import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// User Routes
import UserDashboard from './pages/user/UserDashboard';
import Profile from './pages/user/Profile';
import Wishlist from './pages/user/Wishlist';
import OrderHistory from './pages/user/OrderHistory';

// Product Routes
import ProductList from './pages/public/ProductList';
import ProductDetails from './pages/public/ProductDetails';

// Admin Routes
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import CategoryManagement from './pages/admin/CategoryManagement';

// Protected Routes
import { PrivateRoute } from './routes/PrivateRoute';
import { AdminRoute } from './routes/AdminRoute';
import Authentication from './pages/auth/Authentication';
import Shop from './pages/shop';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <main className='flex-grow'>
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<ProductList />} />
              <Route path='/auth' element={<Authentication />} />
              <Route path='/product/:id' element={<ProductDetails />} />

              {/* Private User Routes */}
              <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<UserDashboard />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/order-history' element={<OrderHistory />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<UserManagement />} />
                <Route path='/admin/products' element={<ProductManagement />} />
                <Route path='/admin/orders' element={<OrderManagement />} />
                <Route
                  path='/admin/categories'
                  element={<CategoryManagement />}
                />
              </Route>

              {/* 404 Route */}
              <Route path='*' element={<div>Page Not Found</div>} />
              {/* <Route path='/' element={<Home />} /> */}
              <Route path='/shop' element={<Shop />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
