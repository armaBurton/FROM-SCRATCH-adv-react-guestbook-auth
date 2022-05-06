import style from './Login.css';
import { Link } from 'react-router-dom';
import { guestbookContext } from '../../context/GuestbookProvider';

export default function Login(){
  const {
    signInOrUp, setSignInOrUp
  } = guestbookContext();


  return (
    <section className={style.loginPage}>
      <div className={style.loginContainer}>
        {
          signInOrUp
            ? <>
              <img src="../../guestbook.png" alt="" />
              <h1>Sign n to your account</h1>
              <p>Or <Link className={style.linkTo} to='#'>create an account</Link></p>
              <form className={style.userLogin}>
                <input placeholder='E-mail' className={style.email} type="email" />
                <input placeholder='Password' className={style.password} type="password" />
                <button>Sign in</button>
              </form>
            </>
            : <>
              <img src="../../guestbook.png" alt="" />
              <h1>Sign n to your account</h1>
              <p>Or <Link className={style.linkTo} to='#'>create an account</Link></p>
              <form className={style.userLogin}>
                <input placeholder='E-mail' className={style.email} type="email" />
                <input placeholder='Password' className={style.password} type="password" />
                <button>Sign in</button>
              </form>
            </>
        }
      </div>
    </section>
  );
}