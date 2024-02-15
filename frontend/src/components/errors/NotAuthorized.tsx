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
      Need to be an admin to access this page!
    </p>
  </div>
);

const NotAuthorized: React.FC<FC> = ({ children }) => {
  const { isAdmin } = useContext(UserAuthContext);

  if (!isAdmin) {
    return errorData;
  } else {
    return <>{children}</>;
  }
};

export default NotAuthorized;
