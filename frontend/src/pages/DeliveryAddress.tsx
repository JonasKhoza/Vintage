import { useContext, useState } from "react";
import classes from "./styles/delivery_address.module.css";
import { UserAddressContext } from "../context/ManageUserAddressContext";
import { UserAuthContext } from "../context/ManageUserAuthContext";

function DeliveryAddress() {
  const [userAddress, setUserAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
  });

  const { userId } = useContext(UserAuthContext);
  const { setUserAddressHandler } = useContext(UserAddressContext);

  function getUserShippingAdrress(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserAddress((prevV) => {
      return {
        ...prevV,
        [name]: value,
      };
    });
  }

  return (
    <div className={classes.delivery_address}>
      <h1>Delivery Adress</h1>
      <form>
        <label>
          STREET
          <input
            type="street"
            name="street"
            placeholder="33 Fourth Street"
            value={userAddress.street}
            required
            onChange={getUserShippingAdrress}
          />
        </label>
        <label>
          CITY
          <input
            type="text"
            name="city"
            placeholder="Krugersdorp"
            value={userAddress.city}
            required
            onChange={getUserShippingAdrress}
          />
        </label>
        <label>
          POSTAL CODE
          <input
            type="text"
            name="postalCode"
            placeholder="0321"
            value={userAddress.postalCode}
            required
            onChange={getUserShippingAdrress}
          />
        </label>
        <button
          onClick={(event) => {
            event.preventDefault();
            setUserAddressHandler(userAddress, userId);
          }}
          disabled={!userId}
        >
          CONTINUE
        </button>
      </form>
    </div>
  );
}

export default DeliveryAddress;
