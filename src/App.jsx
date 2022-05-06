import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import style from './App.css';
import Login from './views/Auth/Login';

export default function App() {
  return (
    <main className={style.main}>
      <Router>
        <nav>
          <img src="../guestbook.png" alt="guestbook" />
          <Link className={style.login} to='/'>login</Link>
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
