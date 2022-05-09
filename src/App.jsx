import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import style from './App.css';
import { guestbookContext } from './context/GuestbookProvider';
import Login from './views/Auth/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Guestbook from './views/Guestbook/Guestbook';
import Home from './views/Home/Home';
import Footer from './views/Footer/Footer';

export default function App() {
  const { user, setSignInOrUp, logout } = guestbookContext();

  function resetUser() {
    setSignInOrUp(false);
  }

  async function handleLogout(e) {
    e.preventDefault();
    await logout();
  }

  return (
    <main className={style.main}>
      <Router>
        <nav>
          <img src="../guestbook.png" alt="guestbook" />
          <div className={style.navDiv}>
            {user.aud === 'authenticated' ? (
              <p>signed in as {user.email}</p>
            ) : (
              <></>
            )}
            {user.aud === 'authenticated' ? (
              <Link className={style.login} onClick={handleLogout} to="/">
                logout
              </Link>
            ) : (
              <Link className={style.login} onClick={resetUser} to="/">
                login
              </Link>
            )}
          </div>
        </nav>
        <section className={style.body}>
          <Switch>
            <Route path="/login">
              {user.aud === 'authenticated' ? <Guestbook /> : <Login />}
            </Route>
            <PrivateRoute path="/guestbook">
              <Guestbook />
            </PrivateRoute>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </section>
      </Router>
    </main>
  );
}
