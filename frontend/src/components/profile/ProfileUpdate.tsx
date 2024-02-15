import React, { useContext, useState } from "react";
import classes from "./styles/updateprofile.module.css";
import userSignInHelper from "../../utils/userSignInHelper";
import UserSignUpErrorI from "../../models/userSignUpError.model";
import { UserAuthContext } from "../../context/ManageUserAuthContext";
import Toastify from "../toastify/Toastify";

export interface ProfileUpdateI {
  username: string;
  email: string;
  existingPassword: string;
  password: string;
}

function ProfileUpdate() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    existingPassword: "",
    password: "",
  });
  const [error, setError] = useState<UserSignUpErrorI>({
    hasError: false,
    username: "",
    email: "",
    password: "",
    existingPassword: "",
  });

  const { updateUserInfoHandler } = useContext(UserAuthContext);

  const onUserProfileDataChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const updateUserProfileData = (event: React.FormEvent) => {
    event.preventDefault();

    const err = userSignInHelper(user);

    if (err.hasError) {
      setError(err);
      return;
    }

    //Updating the user
    updateUserInfoHandler(user);

    setError({
      hasError: false,
      username: "",
      email: "",
      password: "",
      existingPassword: "",
    });

    setUser({
      username: "",
      email: "",
      existingPassword: "",
      password: "",
    });
  };

  return (
    <div className={classes.profile_update}>
      <Toastify />
      <form onSubmit={updateUserProfileData}>
        <p>{error.username && error.username}</p>
        <label htmlFor="Username">
          USERNAME
          <input
            type="text"
            name="username"
            value={user.username}
            placeholder="Username"
            onChange={onUserProfileDataChange}
          />
        </label>
        <p>{error.email && error.email}</p>
        <label htmlFor="Email">
          EMAIL
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="user@gmail.com"
            onChange={onUserProfileDataChange}
          />
        </label>
        <p>{error.existingPassword && error.existingPassword}</p>
        <label htmlFor="password">
          PASSWORD
          <input
            type="password"
            name="existingPassword"
            value={user.existingPassword}
            placeholder="Old password"
            onChange={onUserProfileDataChange}
          />
        </label>
        <p>{error.password && error.password}</p>
        <label htmlFor="password">
          NEW PASSWORD
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="New password"
            onChange={onUserProfileDataChange}
          />
        </label>
        <button>UPDATE PROFILE</button>
      </form>
    </div>
  );
}

export default ProfileUpdate;
