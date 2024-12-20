import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyAuth } from '../store/slices/authSlice';

export const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // console.log('useEffect Called');
    const isPublicRoute =
      location.pathname === '/login' || location.pathname === '/register';

    const persistedAuth = localStorage.getItem('persist:root');
    if (persistedAuth && !isPublicRoute) {
      const parsedAuth = JSON.parse(persistedAuth);
      const authState = JSON.parse(parsedAuth.auth);

      if (authState.isAuthenticated || !user) {
        dispatch(verifyAuth());
      }
    }
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};
