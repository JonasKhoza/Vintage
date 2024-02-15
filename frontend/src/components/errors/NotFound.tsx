import { Link } from "react-router-dom";

import ourFriends from "../../data/ourFriends";
import classes from "./styles/notfound.module.css";

function NotFound() {
  const generateRadomnFriend = Math.floor(Math.random() * ourFriends.length);
  return (
    <div className={classes.not_found}>
      <div className={classes.redirect_info}>
        <h1>Sorry</h1>
        <h2>We couldn't find that page</h2>
        <p className={classes.redirect_button}>
          Try going back to the
          <Link to="/" className={classes.home_link}>
            Home
          </Link>
          page
        </p>
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <p>Meet our friend(s)😊</p>
          <p className={classes.ourFriendsNames}>
            This is {ourFriends[generateRadomnFriend].name}
          </p>
        </div>

        <img
          src={ourFriends[generateRadomnFriend].imageURL}
          alt={ourFriends[generateRadomnFriend].name}
        />
      </div>
    </div>
  );
}

export default NotFound;
