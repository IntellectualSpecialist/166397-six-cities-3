import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAvailable: boolean;
  route: string;
  children: JSX.Element;
}

function PrivateRoute({isAvailable, route, children}: PrivateRouteProps): JSX.Element {
  return (
    isAvailable ? children : <Navigate to={route} />
  );
}

export default PrivateRoute;
