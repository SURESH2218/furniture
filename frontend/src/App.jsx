import Home from './pages/home';
import Shop from './pages/shop';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

import { verifyAuth } from './store/slices/authSlice';

import Login from './auth/Login';
import Register from './auth/Register';
// import Dashboard from './pages/user/Dashboard';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyAuth());
  }, []);

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
          <Route
            path='/home'
            element={
              isAuthenticated ? <Home /> : <Navigate to='/login' replace />
            }
          />
          <Route
            path='/'
            element={
              <Navigate to={isAuthenticated ? '/home' : '/login'} replace />
            }
          />
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </Router>
    </PersistGate>
  );
}

export default App;
