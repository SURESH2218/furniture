import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../utils/api';
import { loginSuccess, logout } from '../redux/slices/authSlice';

export const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const response = await api.get('/users/check-auth');
        console.log('PrivateRoute Auth Check:', response.data);
        dispatch(loginSuccess(response.data.data || response.data.user));
      } catch (error) {
        console.error('Authentication verification failed', error);
        dispatch(logout());
      }
    };

    if (!isAuthenticated && !loading) {
      verifyAuthentication();
    }
  }, [dispatch, isAuthenticated, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/auth' />;
};
