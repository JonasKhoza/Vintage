import { useContext, useState } from "react";
import classes from "./styles/address.module.css";
import addressErrorHelper from "../../utils/addressErrorHelper";
import { AddressErrorI } from "../../models/address.model";
import { UserAddressContext } from "../../context/ManageUserAddressContext";
import Toastify from "../toastify/Toastify";

function Address() {
  const [userAddress, setUserAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
  });

  const [error, setError] = useState<Partial<AddressErrorI>>({
    hasError: false,
    street: "",
    city: "",
    postalCode: "",
  });

  const { updateUserAddressHandler } = useContext(UserAddressContext);

  function getUserShippingAdrress(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserAddress((prevV) => {
      return {
        ...prevV,
        [name]: value,
      };
    });
  }

  const setUserUpdatedShippingAddress = (event: React.FormEvent) => {
    event.preventDefault();

    const err = addressErrorHelper(userAddress);
    if (err.hasError) {
      setError(err);
      return;
    }

    //Updating user address
    updateUserAddressHandler(userAddress);

    setError({
      hasError: false,
      street: "",
      city: "",
      postalCode: "",
    });

    setUserAddress({
      street: "",
      city: "",
      postalCode: "",
    });
  };

  return (
    <div className={classes.profile_address}>
      <Toastify />
      <div className={classes.profile_address_form}>
        <form onSubmit={setUserUpdatedShippingAddress}>
          <p>{error.hasError && error.street}</p>
          <label>
            STREET
            <input
              type="street"
              name="street"
              value={userAddress.street}
              placeholder="33 Fourth Street"
              onChange={getUserShippingAdrress}
            />
          </label>
          <p>{error.hasError && error.city}</p>
          <label>
            CITY
            <input
              type="text"
              name="city"
              value={userAddress.city}
              placeholder="Krugersdorp"
              onChange={getUserShippingAdrress}
            />
          </label>
          <p>{error.hasError && error.postalCode}</p>
          <label>
            POSTAL CODE
            <input
              type="text"
              name="postalCode"
              value={userAddress.postalCode}
              placeholder="0321"
              onChange={getUserShippingAdrress}
            />
          </label>
          <button>UPDATE ADDRESS</button>
        </form>
      </div>
    </div>
  );
}

export default Address;
