import { useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/authSlice';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const user = useSelector(selectUser);

  return user.currentUser ? children : <Navigate to={redirectTo} replace />;
};
