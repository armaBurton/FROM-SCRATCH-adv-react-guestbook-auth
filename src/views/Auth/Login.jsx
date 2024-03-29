import style from './Login.css';
import { useHistory, useLocation } from 'react-router-dom';
import { guestbookContext } from '../../context/GuestbookProvider';
import { useGuestbook } from '../../context/GuestbookProvider';
import { useForm } from '../../hooks/useForm';

export default function Login() {
  const { signInOrUp, setSignInOrUp } = guestbookContext();
  const { login, signUp, user } = useGuestbook();
  const history = useHistory();
  const location = useLocation();
  const { formState, handleFormChange } = useForm({ email: '', password: '' });

  const { from } = location.state || { from: { pathname: '/' } };

  function userStatus(e) {
    e.preventDefault();
    signInOrUp ? setSignInOrUp(false) : setSignInOrUp(true);
  }

  async function handleLogin(e) {
    e.preventDefault();

    await login(formState.email, formState.password);
    console.log(user);
  }

  async function handleSignUp(e) {
    e.preventDefault();

    await signUp(formState.email, formState.password);
  }

  console.log(user);

  return (
    <section className={style.loginPage}>
      <div className={style.loginContainer}>
        {signInOrUp ? (
          <>
            <img src="../../guestbook.png" alt="guestbook icon" />
            <h1>Sign in to your account</h1>
            <p>
              Or{' '}
              <span
                className={style.linkTo}
                onClick={userStatus}
                data-testid="createUser"
              >
                create an account
              </span>
            </p>
            <form onSubmit={handleLogin} className={style.userLogin}>
              <input
                id="email"
                data-testid="loginEmail"
                name="email"
                type="email"
                placeholder="E-Mail"
                className={style.email}
                value={formState.email}
                onChange={handleFormChange}
              />
              <input
                id="password"
                data-testid="loginPassword"
                name="password"
                type="password"
                placeholder="Password"
                className={style.password}
                value={formState.password}
                onChange={handleFormChange}
              />
              <button type="submit" aria-label="Sign In">
                Sign In
              </button>
            </form>
          </>
        ) : (
          <>
            <img src="../../guestbook.png" alt="guestbook icon" />
            <h1>Sign up for an account</h1>
            <p>
              Or{' '}
              <span
                className={style.linkTo}
                onClick={userStatus}
                data-testid="signInUser"
              >
                sign in to your account
              </span>
            </p>
            <form onSubmit={handleSignUp} className={style.userLogin}>
              <input
                id="email"
                data-testid="signUpEmail"
                name="email"
                type="email"
                placeholder="E-Mail"
                className={style.email}
                value={formState.email}
                onChange={handleFormChange}
              />
              <input
                id="password"
                data-testid="signUpPassword"
                name="password"
                type="password"
                placeholder="Password"
                className={style.password}
                value={formState.password}
                onChange={handleFormChange}
              />
              <button type="submit" data-testid="Sign Up">
                Sign Up
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
