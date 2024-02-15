import React, { createContext, useEffect, useReducer, useState } from "react";

import {
  Action,
  FC,
  UserAuthInterface,
  UserTokenI,
} from "../models/auth.models";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileUpdateI } from "../components/profile/ProfileUpdate";
import { toast } from "react-toastify";

export const UserAuthContext = createContext<UserAuthInterface>({
  userId: "",
  userName: "",
  isAdmin: false,
  createdAt: "",
  fetchUserAuthData: async (user: UserTokenI) => {},
  handleLogout: async () => {},
  updateUserInfoHandler: async (user: ProfileUpdateI) => {},
});

const reducer = (state: UserAuthInterface, action: Action) => {
  switch (action.type) {
    case "FETCH_LOGIN_LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };
    case "FETCH_LOGIN_SUCCESS":
      // Handle the success action
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.name,
        isAdmin: action.payload.isAdmin,
        createdAt: action.payload.createdAt,
      };

    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        message: action.payload.message,
        loading: action.payload.loading,
      };
    case "FETCH_LOGIN_FAILURE":
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const ManageUserAuthContext: React.FC<FC> = ({ children }) => {
  const initialState: UserAuthInterface = {
    userId: "",
    userName: "",
    isAdmin: false,
    createdAt: "",
    message: "",
    fetchUserAuthData: async (user: UserTokenI) => {},
    handleLogout: async () => {},
    updateUserInfoHandler: async () => {},
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isStatus, setIsStatus] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const fetchUserAuthData = async (user: UserTokenI) => {
    dispatch({ type: "FETCH_LOGIN_SUCCESS", payload: user });
    // Store user data in local storage
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    const checkCookieStatus = async () => {
      dispatch({ type: "FETCH_LOGIN_LOADING", payload: { loading: true } });
      try {
        const res = await fetch("http://localhost:8000/users/auth", {
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (res.ok) {
          dispatch({
            type: "FETCH_LOGIN_LOADING",
            payload: { loading: false },
          });

          const status = await res.json();
          setIsStatus(status.hasCookie);

          if (!status.hasCookie) {
            localStorage.removeItem("user");
            const defaultUser = {
              userId: "",
              name: "",
              email: "",
              isAdmin: false,
              createdAt: "",
            };

            dispatch({ type: "FETCH_LOGIN_SUCCESS", payload: defaultUser });
          } else {
            // Check if user data exists in local storage
            const userData = localStorage.getItem("user");
            if (userData) {
              const user = JSON.parse(userData);
              fetchUserAuthData(user);
            }
          }
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error: any) {
        dispatch({
          type: "FETCH_LOGIN_FAILURE",
          payload: { loading: false, error: error.message },
        });
        console.error(error);
      } finally {
        dispatch({ type: "FETCH_LOGIN_LOADING", payload: { loading: false } });
      }
    };

    checkCookieStatus();
  }, [location.pathname, isStatus, isUpdated]);

  const updateUserInfoHandler = async (user: ProfileUpdateI) => {
    dispatch({ type: "FETCH_LOGIN_LOADING", payload: { loading: true } });
    const userToUpdate = {
      userId: state.userId,
      ...user,
    };

    try {
      const res = await fetch("http://localhost:8000/users/update-info", {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
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
          type: "USER_UPDATE_SUCCESS",
          payload: { loading: false, message: data.message },
        });
        setIsUpdated((prevV) => !prevV);
        console.log(data);
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error: any) {
      toast.error(error.message);
      dispatch({
        type: "FETCH_LOGIN_FAILURE",
        payload: { error: error.message, loading: false },
      });
      console.error(error);
    } finally {
      dispatch({ type: "FETCH_LOGIN_LOADING", payload: { loading: false } });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/users/logout", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("user");
        setIsUpdated((prevV) => !prevV);
        navigate("/");
      } else {
        const errorData = res.json();
        throw errorData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    userId: state.userId,
    userName: state.userName,
    isAdmin: state.isAdmin,
    createdAt: state.createdAt,
    message: state.message,
    fetchUserAuthData,
    handleLogout,
    updateUserInfoHandler,
  };

  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default ManageUserAuthContext;
