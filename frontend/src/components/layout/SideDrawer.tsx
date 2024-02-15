import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { PropInterface } from "../../models/props.models";
import classes from "./styles/header.module.css";
import { UserAuthContext } from "../../context/ManageUserAuthContext";

const SideDrawer: React.FC<Partial<PropInterface>> = ({
  menuIsOpen,
  toggleMenuBar,
}) => {
  const { userId, isAdmin, handleLogout } = useContext(UserAuthContext);
  let isLoggedIn = false;

  if (userId) {
    isLoggedIn = true;
  }

  return (
    <aside
      className={
        !menuIsOpen
          ? classes.sideDrawer
          : `${classes.sideDrawer}  ${classes.active}`
      }
    >
      <nav>
        <ul>
          <li onClick={toggleMenuBar}>
            <Link to="/" className={classes.home_anchor}>
              Home
            </Link>
          </li>
          {!isAdmin && (
            <li onClick={toggleMenuBar}>
              <Link to="/cart" className={classes.cart_header}>
                Cart
                <span>12</span>
              </Link>
            </li>
          )}

          {isLoggedIn && !isAdmin && (
            <li onClick={toggleMenuBar}>
              <Link to="/users/profile">Profile</Link>
            </li>
          )}

          {!isLoggedIn && (
            <li onClick={toggleMenuBar}>
              <Link to="/users/signup">Signup</Link>
            </li>
          )}

          {!isLoggedIn && (
            <li onClick={toggleMenuBar}>
              <Link to="/users/login">Login</Link>
            </li>
          )}

          {isAdmin && (
            <li onClick={toggleMenuBar}>
              <Link to="admin/all-products">Manage Products</Link>
            </li>
          )}
          {isAdmin && (
            <li onClick={toggleMenuBar}>
              <Link to="/admin/orders"> Manage Orders</Link>
            </li>
          )}

          {isLoggedIn && (
            <li onClick={toggleMenuBar}>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideDrawer;
