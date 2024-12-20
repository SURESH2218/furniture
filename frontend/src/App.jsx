import Home from './pages/home';
import Shop from './pages/shop';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './pages/user/Profile';
import ProductList from './pages/public/ProductLIst';
import ProductDetails from './pages/public/ProductDetails';
import { PrivateRoute } from './routes/PrivateRoute';
import Dashboard from './pages/user/Dashboard';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={
              isAuthenticated ? <Navigate to='/home' replace /> : <Login />
            }
          />
          <Route
            path='/register'
            element={
              isAuthenticated ? <Navigate to='/home' replace /> : <Register />
            }
          />
          <Route path='/' element={<Navigate to={'/home'} />} />
          <Route path='/home' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </PersistGate>
  );
}

export default App;
