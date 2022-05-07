import { Redirect, Route, useLocation } from 'react-router-dom';
import { useGuestbook } from '../../context/GuestbookProvider';

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useGuestbook();
  const location = useLocation();

  return (
    <Route {...rest}>
      {user.email ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { origin: location },
          }}
        />
      )}
    </Route>
  );
}
