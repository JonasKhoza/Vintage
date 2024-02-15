import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//My files imports
import userSignInHelper from "../utils/userSignInHelper";
import UserSignUpErrorI from "../models/userSignUpError.model";
import classes from "../components/Home_Components/styles/form.module.css";
import Toastify from "../components/toastify/Toastify";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<UserSignUpErrorI>({
    hasError: false,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  function getUserInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  }

  async function submitUserDataHandler(event: React.FormEvent) {
    event.preventDefault();

    const err = userSignInHelper(user);
    if (err.hasError) {
      setError(err);
      return;
    }

    //DATA SUBMITTION
    console.log("Here:", user);
    try {
      const res = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data;
      if (res.ok) {
        data = await res.json();
        toast.info(data.message);
        navigate("/users/login");
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error: any) {
      toast.error(error.message);
      return;
    }

    setUser({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

    setError({
      hasError: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className={classes.users_credetials}>
      <h1>Create an account</h1>
      <Toastify />
      <form onSubmit={submitUserDataHandler} className={classes.form}>
        <p>{error.hasError && error.firstname}</p>
        <input
          type="text"
          id="fistname"
          name="firstname"
          placeholder="First name"
          value={user.firstname}
          onChange={getUserInputChange}
          required
        />
        <p>{error.hasError && error.lastname}</p>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Last name"
          value={user.lastname}
          onChange={getUserInputChange}
          required
        />
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
          <button style={{ cursor: "pointer" }}>Create account</button>
          <Link to="/users/login">Login instead</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
