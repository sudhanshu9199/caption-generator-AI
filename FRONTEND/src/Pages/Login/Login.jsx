import style from "./Login.module.scss";
import logoImg from "../../assets/logo.png";
import { User, LockKeyhole } from "lucide-react";
import { Link } from 'react-router';

const Login = () => {
  return (
    <div className={style.loginContainer}>
      <div className={style.loginInner}>
        <div className={style.logo}>
          <img src={logoImg} alt="logo Img" />
          <p>
            Caption<span>AI</span>
          </p>
        </div>
        <form action="" className={style.form}>
          <div className={style.inputs}>
            <User className={style.icon} />
            <input type="text" placeholder="username" />
          </div>
          <div className={style.inputs}>
            <LockKeyhole className={style.icon} />
            <input type="password" placeholder="Password" />
          </div>

          <button type="submit">Login</button>
        </form>
        <div className={style.bottom}>
            <p>Don't have an account? <Link to='/auth/register' className={style.link}>Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
