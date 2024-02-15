import React, { useContext } from "react";
import { UserAuthContext } from "../../context/ManageUserAuthContext";

import classes from "./styles/not_authorized.module.css";

type FC = {
  children: React.ReactNode;
};

const errorData = (
  <div className={classes.container}>
    <h1 id="heading" className={classes.heading}>
      You are not authorized to visit this page!
    </h1>
    <p className={classes.instructions}>
      Need to be logged in to access this page!
    </p>
  </div>
);

const NotLoggedIn: React.FC<FC> = ({ children }) => {
  const { userId, isAdmin } = useContext(UserAuthContext);

  if (!userId || isAdmin) {
    return errorData;
  } else {
    return <>{children}</>;
  }
};

export default NotLoggedIn;
