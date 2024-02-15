import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { AddressI } from "../models/address.model";
import { UserAuthContext } from "./ManageUserAuthContext";
import { toast } from "react-toastify";

interface AddressInterface {
  street?: string;
  city?: string;
  postalCode?: string;
  loading?: boolean;
  error?: string;
  message?: string;
  setUserAddressHandler: (address: UserAddressI, id: string) => {};
  updateUserAddressHandler: (address: AddressI) => {};
}

interface UserAddressI {
  street: string;
  city: string;
  postalCode: string;
}

const UserAddressContext = createContext<AddressInterface>({
  street: "",
  city: "",
  postalCode: "",
  loading: false,
  error: "",
  message: "",
  setUserAddressHandler: async (address: UserAddressI, id: string) => {},
  updateUserAddressHandler: async (address: AddressI) => {},
});

type Action =
  | { type: "FETCH_ADDRESS_LOADING"; payload: { loading: boolean } }
  | { type: "FETCH_ADDRESS_SUCCESS"; payload: Partial<AddressInterface> }
  | {
      type: "FETCH_ADDRESS_FAILURE";
      payload: { loading: boolean; error: string };
    };
type FC = { children: React.ReactNode };
const reducer = (state: AddressInterface, action: Action) => {
  switch (action.type) {
    case "FETCH_ADDRESS_LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };
    case "FETCH_ADDRESS_SUCCESS":
      return {
        ...state,
        street: action.payload.street,
        city: action.payload.city,
        postalCode: action.payload.postalCode,
        loading: action.payload.loading,
        message: action.payload.message,
      };
    case "FETCH_ADDRESS_FAILURE":
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const ManageUserAddressContext: React.FC<FC> = ({ children }) => {
  const { userId } = useContext(UserAuthContext);

  const initialState: AddressInterface = {
    street: "",
    city: "",
    postalCode: "",
    loading: false,
    error: "",
    message: "",
    setUserAddressHandler: async (address: UserAddressI, id: string) => {},
    updateUserAddressHandler: async (address: AddressI) => {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const setUserAddressHandler = async (address: UserAddressI, id: string) => {
    console.log("Handler triggered!");
    try {
      const res = await fetch("http://localhost:8000/users/shipping", {
        method: "POST",
        body: JSON.stringify({ address, userId: id }),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          navigate("users/payment");
        }
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserAddressHandler = async (address: AddressI) => {
    dispatch({ type: "FETCH_ADDRESS_LOADING", payload: { loading: true } });
    const addressToUpdate = {
      userId,
      ...address,
    };
    try {
      const res = await fetch("http://localhost:8000/users/update-address", {
        method: "PUT",
        body: JSON.stringify(addressToUpdate),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        dispatch({
          type: "FETCH_ADDRESS_SUCCESS",
          payload: { loading: false, message: data.message },
        });
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error: any) {
      toast.error(error.message);
      dispatch({
        type: "FETCH_ADDRESS_FAILURE",
        payload: { loading: false, error: error.message },
      });
      console.error(error);
    } finally {
      dispatch({ type: "FETCH_ADDRESS_LOADING", payload: { loading: false } });
    }
  };

  const contextValue: AddressInterface = {
    street: state.street,
    city: state.city,
    postalCode: state.postalCode,
    loading: state.loading,
    error: state.error,
    setUserAddressHandler,
    updateUserAddressHandler,
  };

  return (
    <UserAddressContext.Provider value={contextValue}>
      {children}
    </UserAddressContext.Provider>
  );
};

export { UserAddressContext, ManageUserAddressContext };
