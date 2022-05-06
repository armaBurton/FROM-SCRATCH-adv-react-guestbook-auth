import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import style from './App.css';


export default function App() {
  return (
    <main className={style.main}>
      <Router>
        <nav></nav>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
          <Route path='/login'>
            {/* <Login /> */}
          </Route>
        </Switch>
      </Router>
    </main>
  )
}
