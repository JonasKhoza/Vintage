import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { PropInterface } from "../../models/props.models";
import React, { useContext } from "react";
import classes from "./styles/header.module.css";
import { UserAuthContext } from "../../context/ManageUserAuthContext";
import CartContext from "../../context/ManageUserCartContext";

const Navigation: React.FC<Partial<PropInterface>> = ({
  menuIsOpen,
  toggleMenuBar,
}) => {
  const { userId, isAdmin, userName, handleLogout } =
    useContext(UserAuthContext);
  const { totalQuantity } = useContext(CartContext);

  let isLoggedIn = false;
  let isAnAdmin = false;

  if (userId) {
    isLoggedIn = true;
  }

  if (isAdmin) {
    isAnAdmin = true;
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo_area}>
        <Link to="/" className={classes.logo}>
          Vintage
        </Link>

        <Link to="/" className={classes.home_anchor}>
          Home
        </Link>
      </div>
      {!isLoggedIn ? (
        <nav className={classes.notlogged}>
          <ul>
            {!isLoggedIn && (
              <li>
                <Link to="/users/signup">Signup</Link>
              </li>
            )}
            {!isLoggedIn && <span className={classes.or}>or</span>}
            {!isLoggedIn && (
              <li>
                <Link to="/users/login">Login</Link>
              </li>
            )}
          </ul>
          {isAnAdmin === false && (
            <Link to="/cart" className={classes.cart_header}>
              <ShoppingCartIcon className={classes.cart_icon} />
              <span>{totalQuantity}</span>
            </Link>
          )}
        </nav>
      ) : (
        <nav className={classes.isloggedin}>
          <div className={classes.dropdown}>
            <button className={classes.dropbtn}>
              {`Hi, ${userName}!`}
              <ArrowDropDownIcon className={classes.drop_icon} />
            </button>

            <div className={classes.dropdown_content}>
              {isLoggedIn && !isAdmin && (
                <Link to="/users/profile">Profile</Link>
              )}
              <ul>
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
              </ul>

              {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
            </div>
          </div>
          {!isAnAdmin && (
            <Link to="/cart" className={classes.cart_header}>
              <ShoppingCartIcon className={classes.cart_icon} />
              <span>{totalQuantity}</span>
            </Link>
          )}
        </nav>
      )}

      <div className={classes.hamburger_menu}>
        {!menuIsOpen ? (
          <MenuIcon className={classes.closed_menu} onClick={toggleMenuBar} />
        ) : (
          <CloseIcon className={classes.closed_menu} onClick={toggleMenuBar} />
        )}
      </div>
    </header>
  );
};

export default Navigation;
