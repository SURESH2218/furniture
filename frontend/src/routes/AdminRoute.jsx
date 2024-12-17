import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/unauthorized' />
  );
};
