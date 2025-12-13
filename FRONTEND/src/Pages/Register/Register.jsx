import style from './Register.module.scss';
import { Link } from 'react-router';
import { User, LockKeyhole, Lock } from "lucide-react";

const Register = () => {
  return (
    <div className={style.registerContainer}>
      <div className={style.registerInner}>
        <p className={style.header}>Create an Account</p>

        <form action="" className={style.form}>
          <div className={style.inputs}>
            <User className={style.icon}/>
            <input type="text" placeholder='Username'/>
          </div>
          <div className={style.inputs}>
            <Lock className={style.icon}/>
            <input type="password" placeholder='Password'/>
          </div>
          <div className={style.inputs}>
            <LockKeyhole className={style.icon}/>
            <input type="password" placeholder='Confirm Password'/>
          </div>

          <button type="submit">Register</button>
        </form>
        <div className={style.bottom}>
            <p>Already have an account? <Link to='/auth/login' className={style.link}>Login here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register