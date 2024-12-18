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
    const persistedAuth = localStorage.getItem('persist:root');
    if (persistedAuth) {
      const parsedAuth = JSON.parse(persistedAuth);
      const authState = JSON.parse(parsedAuth.auth);
      if (authState.isAuthenticated) {
        // console.log('useEffect called');
        dispatch(verifyAuth());
      }
    }
  }, [dispatch]);

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
          <Route path='*' element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </PersistGate>
  );
}

export default App;
