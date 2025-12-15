import style from "./Login.module.scss";
import logoImg from "../../assets/logo.png";
import { User, LockKeyhole } from "lucide-react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Slice/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      loginUser({
        username,
        password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back! 👏");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };
  return (
    <div className={style.loginContainer}>
      <div className={style.loginInner}>
        <div className={style.logo}>
          <img src={logoImg} alt="logo Img" />
          <p>
            Caption<span>AI</span>
          </p>
        </div>
        <form onSubmit={handleLogin} className={style.form}>
          <div className={style.inputs}>
            <User className={style.icon} />
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className={style.inputs}>
            <LockKeyhole className={style.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
        <div className={style.bottom}>
          <p>
            Don't have an account?{" "}
            <Link to="/auth/register" className={style.link}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
