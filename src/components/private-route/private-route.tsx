import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAvailable: boolean;
  route: string;
  children: JSX.Element;
}

const PrivateRoute = ({isAvailable, route, children}: PrivateRouteProps): JSX.Element => (
  isAvailable ? children : <Navigate to={route} />
);

export default PrivateRoute;
