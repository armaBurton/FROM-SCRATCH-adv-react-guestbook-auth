import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import style from './App.css';
import { guestbookContext } from './context/GuestbookProvider';
import Login from './views/Auth/Login';

export default function App() {
  const {
    user,
    setSignInOrUp,
    logout,
  } = guestbookContext();

  function resetUser(){
    setSignInOrUp(false);
  }

  async function handleLogout(e){
    e.preventDefault();
    await logout();
  }

  return (
    <main className={style.main}>
      <Router>
        <nav>
          <img src="../guestbook.png" alt="guestbook" />
          {
            user.aud === 'authenticated'
              ? <Link className={style.login} onClick={handleLogout} to='/'>logout</Link>
              : <Link className={style.login} onClick={resetUser} to='/'>login</Link>
          }
          
        </nav>
        <section className={style.body}>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/login' />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>
        </section>
      </Router>
    </main>
  )
}
