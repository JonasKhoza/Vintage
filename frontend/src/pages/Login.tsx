import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toastify from "../components/toastify/Toastify";

//My own files imports
import classes from "../components/Home_Components/styles/form.module.css";
import userLoginInHelper from "../utils/userLoginHelper";
import UserSignUpErrorI from "../models/userSignUpError.model";
import { UserAuthContext } from "../context/ManageUserAuthContext";

function Login() {
  const { fetchUserAuthData } = useContext(UserAuthContext);
  let isLoggedIn: boolean = false;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<UserSignUpErrorI>({
    hasError: false,
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect");

  function getUserInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  }

  async function logUserIn(event: React.FormEvent) {
    event.preventDefault();

    const err = userLoginInHelper(user);
    if (err.hasError) {
      setError(err);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      if (res.ok) {
        const userData = await res.json();

        toast.info(userData.message);
        if (userData?.userData.userId) {
          fetchUserAuthData!(userData.userData);
          isLoggedIn = true;
        }
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error: any) {
      toast.error(error.message);
      return;
    }

    setUser({
      email: "",
      password: "",
    });

    setError({
      hasError: false,
      email: "",
      password: "",
    });

    if (isLoggedIn && redirect) {
      navigate("/users/shipping");
    } else if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/users/login");
    }
  }

  return (
    <div
      className={classes.users_credetials}
      style={{ paddingBottom: "100px" }}
    >
      <h1>Login</h1>
      <Toastify />
      <form onSubmit={logUserIn} className={classes.form}>
        <p>{error.hasError && error.email}</p>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={getUserInputChange}
          required
        />
        <p>{error.hasError && error.password}</p>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={getUserInputChange}
          required
        />
        <div className={classes.form_actions}>
          <button style={{ cursor: "pointer" }}>Login</button>
          <Link to="/users/signup">Signup instead</Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
