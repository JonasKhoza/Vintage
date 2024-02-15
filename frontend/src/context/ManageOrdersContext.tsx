import React, { useReducer, createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  OrderDataInterface,
  OrderInterface,
  UserAddressI,
  UserDataInterface,
} from "../models/order.model";

const initialState: OrderInterface = {
  orders: [],
  adminOrders: [],
  adminUsersAddresses: [],
  addOrderHandler: async () => {},
  updateStatusHandler: async (status: string, orderId: string) => {},
  loading: false,
  userAddress: {
    _id: "",
    street: "",
    city: "",
    postalCode: "",
    createdAt: "",
    updatedAt: "",
  },
  adminUpdateLoading: false,
  updateMessage: "",
};

type FC = {
  children: React.ReactNode;
};

type Action =
  | {
      type: "FETCH_ORDER_LOADING";
      payload: { loading?: boolean; adminUpdateLoading?: boolean };
    }
  | {
      type: "FETCH_ORDER_SUCCESS";
      payload: {
        orders?: OrderDataInterface[];
        userData?: UserDataInterface;
        loading?: boolean;
        updated?: string;
        userAddress?: UserAddressI;
      };
    }
  | {
      type: "ADMIN_ORDERS_FETCH";
      payload: {
        adminOrders: OrderDataInterface[];
        adminUsersAddresses?: UserAddressI[];
      };
    }
  | {
      type: "ADMIN_ORDER_UPDATE";
      payload: {
        updateMessage: string;
      };
    }
  | {
      type: "FETCH_ORDER_FAILURE";
      payload: { loading?: boolean; error?: string; adminUpdateError?: string };
    };

const reducer = (state: OrderInterface, action: Action): OrderInterface => {
  switch (action.type) {
    case "FETCH_ORDER_LOADING":
      return {
        ...state,
        loading: action.payload.loading!,
        adminUpdateLoading: action.payload.adminUpdateLoading!,
      };
    case "FETCH_ORDER_SUCCESS":
      return {
        ...state,
        orders: action.payload.orders!,
        loading: action.payload.loading!,
        updated: action.payload.updated,
        userAddress: action.payload.userAddress!,
      };

    case "ADMIN_ORDERS_FETCH":
      return {
        ...state,
        adminOrders: action.payload.adminOrders!,
        adminUsersAddresses: action.payload.adminUsersAddresses!,
      };
    case "ADMIN_ORDER_UPDATE":
      return {
        ...state,
        updateMessage: action.payload.updateMessage,
      };
    case "FETCH_ORDER_FAILURE":
      return {
        ...state,
        loading: action.payload.loading!,
        error: action.payload.error!,
      };
    default:
      return state;
  }
};

const OrdersContext = createContext<OrderInterface>(initialState);

export const ManageOrdersContext: React.FC<FC> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [statusUpdated, setStatusUpdated] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const addOrderHandler = async (): Promise<void> => {
    dispatch({ type: "FETCH_ORDER_LOADING", payload: { loading: true } });
    try {
      const res = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });
      dispatch({ type: "FETCH_ORDER_LOADING", payload: { loading: false } });
      if (res.ok) {
        const { message } = await res.json();
        dispatch({
          type: "FETCH_ORDER_SUCCESS",
          payload: { updated: message },
        });
        navigate("/users/profile?redirect=order-history");
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error: any) {
      dispatch({
        type: "FETCH_ORDER_FAILURE",
        payload: { loading: false, error: error.message },
      });
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ORDER_LOADING", payload: { loading: true } });
    const getOrdersItems = async (): Promise<void> => {
      try {
        const res = await fetch("http://localhost:8000/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          dispatch({
            type: "FETCH_ORDER_SUCCESS",
            payload: {
              orders: data.orders,
              userAddress: data.userAddress,
              loading: false,
            },
          });
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error: any) {
        dispatch({
          type: "FETCH_ORDER_FAILURE",
          payload: { loading: false, error: error.message },
        });
        console.error(error);
      } finally {
        dispatch({ type: "FETCH_ORDER_LOADING", payload: { loading: false } });
      }
    };
    getOrdersItems();
  }, [state.updated, pathname, orderUpdated]);

  useEffect(() => {
    const getOrdersItems = async (): Promise<void> => {
      try {
        const res = await fetch("http://localhost:8000/admin/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          dispatch({
            type: "ADMIN_ORDERS_FETCH",
            payload: {
              adminOrders: data.orders,
              adminUsersAddresses: data.usersAddresses,
            },
          });
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    getOrdersItems();
  }, [state.updated, pathname, orderUpdated, statusUpdated]);

  const updateStatusHandler = async (status: string, orderId: string) => {
    dispatch({
      type: "FETCH_ORDER_LOADING",
      payload: { adminUpdateLoading: true },
    });
    try {
      const res = await fetch(`http://localhost:8000/admin/orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({ newStatus: status }),
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        dispatch({
          type: "ADMIN_ORDER_UPDATE",
          payload: { updateMessage: data.message },
        });
        setOrderUpdated((prevV) => !prevV);
        setStatusUpdated((prevV) => !prevV);
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      dispatch({
        type: "FETCH_ORDER_FAILURE",
        payload: { adminUpdateError: error.message },
      });
    } finally {
      dispatch({
        type: "FETCH_ORDER_LOADING",
        payload: { adminUpdateLoading: false },
      });
    }
  };

  const orderContextValue: OrderInterface = {
    orders: state.orders,
    adminOrders: state.adminOrders,
    adminUsersAddresses: state.adminUsersAddresses,
    loading: state.loading,
    error: state.error,
    userAddress: state.userAddress,
    adminUpdateLoading: state.adminUpdateLoading,
    updateMessage: state.updateMessage,
    addOrderHandler,
    updateStatusHandler,
  };

  return (
    <OrdersContext.Provider value={orderContextValue}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;
