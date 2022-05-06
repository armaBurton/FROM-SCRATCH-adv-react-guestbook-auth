import style from './Login.css';

export default function Login(){

  return (
    <section className={style.loginPage}>
      <div className={style.loginContainer}>
        <img src="../../guestbook.png" alt="" />
        <h1>Sign in to your accout</h1>
        <p>Or create an accout</p>
        <form className={style.userLogin}>
          <input placeholder='E-mail' className={style.email} type="email" />
          <input placeholder='Password' className={style.password} type="password" />
          <button>Sign in</button>
        </form>
      </div>
    </section>
  );
}