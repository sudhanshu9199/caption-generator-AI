import style from "./Register.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { User, LockKeyhole, Lock } from "lucide-react";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword)
      return toast.warning("Please fill in all field! ⚠️");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match! ❌");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registered successfully! Welcome🎉");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(data.message || "Registration failed 😞");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Is the backend running? 🔌");
    }
  };
  return (
    <div className={style.registerContainer}>
      <div className={style.registerInner}>
        <p className={style.header}>Create an Account</p>

        <form onSubmit={handleRegister} className={style.form}>
          <div className={style.inputs}>
            <User className={style.icon} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className={style.inputs}>
            <Lock className={style.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className={style.inputs}>
            <LockKeyhole className={style.icon} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setconfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>
        <div className={style.bottom}>
          <p>
            Already have an account? <Link to="/auth/login" className={style.link}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
