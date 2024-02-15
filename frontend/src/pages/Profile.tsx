import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";

import OrderHistory from "../components/profile/OrderHistory";
import Address from "../components/profile/Address";
import ProfileUpdate from "../components/profile/ProfileUpdate";
import { UserAuthContext } from "../context/ManageUserAuthContext";

import classes from "./styles/profile.module.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(true);
  const [userHistory, setUserHistory] = useState(false);
  const [userdeliveryDetails, setUserDeliveryDetails] = useState(false);

  const navigate = useNavigate();
  const { createdAt, userName } = useContext(UserAuthContext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await fetch("http://localhost:8000/users/profile", {
          headers: {
            accept: "*/*",
          },
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (!res.ok) navigate(-1);
      } catch (error: any) {
        ///
      }
    };
    sendRequest();
  }, [navigate]);

  function showUpdateUseDetails() {
    setUserDetails((prevV) => !prevV);
    setUserHistory(false);
    setUserDeliveryDetails(false);
  }
  function showUserHistory() {
    setUserHistory((prevV) => !prevV);
    setUserDetails(false);
    setUserDeliveryDetails(false);
  }

  function showUserDeliveryAddress() {
    setUserDeliveryDetails((prevV) => !prevV);
    setUserHistory(false);
    setUserDetails(false);
  }

  let formattedDate;
  if (createdAt) {
    const parsedDate = parseISO(createdAt);
    formattedDate = format(parsedDate, "dd MMM yyyy");
  }

  return (
    <div className={classes.profile}>
      <h1 className={classes.heading}>Your profile</h1>

      <div className={classes.profile_content}>
        <div className={classes.customer_profile}>
          <h1>
            Hello, <span className={classes.customer_name}>{userName}!</span>
          </h1>
          <p>
            Joined: <span>{formattedDate}</span>
          </p>

          <div className={classes.customer_profile_actions}>
            <button
              onClick={showUpdateUseDetails}
              className={userDetails ? `${classes.active}` : ""}
            >
              PROFILE SETTINGS
            </button>
            <button
              className={userdeliveryDetails ? `${classes.active}` : ""}
              onClick={showUserDeliveryAddress}
            >
              Delivery Address
            </button>
            <button
              className={userHistory ? `${classes.active}` : ""}
              onClick={showUserHistory}
            >
              ORDER HISTORY<span>5</span>
            </button>
          </div>
        </div>
        {userDetails && <ProfileUpdate />}
        {userdeliveryDetails && <Address />}

        {userHistory && <OrderHistory />}
      </div>
    </div>
  );
}

export default Profile;
