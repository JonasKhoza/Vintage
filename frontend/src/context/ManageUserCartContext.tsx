import {
  useState,
  useEffect,
  createContext,
  useReducer,
  useCallback,
} from "react";

import { ActionI, CartContextI, FC } from "../models/cart.models";
import { useLocation } from "react-router-dom";

export const CartContext = createContext<CartContextI>({
  cartProducts: [],
  totalQuantity: 0,
  overallTotalPrice: 0,
  loading: false,
  error: "",
  addProductToCart: async (id: string | number) => {},
  updateProductHandler: async (id: string, newQuantity: number) => {},
});

const reducer = (state: CartContextI, action: ActionI): CartContextI => {
  switch (action.type) {
    case "FETCH_CART_LOADING":
      return { ...state, loading: true };
    case "FETCH_CART_SUCCESS":
      return {
        ...state,
        cartProducts: action.payload.cartProducts,
        totalQuantity: action.payload.totalQuantity,
        overallTotalPrice: action.payload.overallTotalPrice,
        loading: action.payload.loading,
      };
    case "FETCH_CART_FAILURE":
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
const initialState: CartContextI = {
  cartProducts: [],
  totalQuantity: 0,
  overallTotalPrice: 0,
  loading: false,
  error: "",
  addProductToCart: async (id: string | number) => {},
  updateProductHandler: async (id: string, newQuantity: number) => {},
};

export const ManageUserCartContext: React.FC<FC> = ({ children }) => {
  const [addedProd, setAddedProd] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(false);

  const { pathname } = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);

  const addProductToCart = useCallback(async (id: string | number) => {
    try {
      const res = await fetch("http://localhost:8000/cart", {
        method: "POST",
        body: JSON.stringify({ productId: id }),
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });
      if (res.ok) {
        setAddedProd((prevV) => !prevV);
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateProductHandler = async (id: string, newQuantity: number) => {
    const res = await fetch("http://localhost:8000/cart", {
      method: "PATCH",
      body: JSON.stringify({ productId: id, newQuantity: newQuantity }),
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      mode: "cors",
      credentials: "include",
    });

    if (res.ok) {
      setUpdatedProduct((prevV) => !prevV);
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_CART_LOADING", payload: { loading: true } });

    async function getCartHandler() {
      const res = await fetch("http://localhost:8000/cart/items", {
        headers: {
          accept: "*/*",
        },
        method: "GET",
        mode: "cors",
        credentials: "include",
      });

      dispatch({ type: "FETCH_CART_LOADING", payload: { loading: false } });

      if (res.ok) {
        const cartData = await res.json();

        if (cartData?.cartItem?.items.length > 0) {
          dispatch({
            type: "FETCH_CART_SUCCESS",
            payload: {
              cartProducts: cartData.cartItem.items,
              totalQuantity: cartData.cartItem.totalQuantity,
              overallTotalPrice: cartData.cartItem.overallTotalPrice,
              loading: false,
              error: "",
            },
          });
        } else {
          dispatch({
            type: "FETCH_CART_SUCCESS",
            payload: {
              cartProducts: [],
              totalQuantity: 0,
              overallTotalPrice: 0,
              loading: false,
              error: "",
            },
          });
        }
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    }
    try {
      getCartHandler();
    } catch (error) {
      console.log(error);
    }
  }, [
    state.totalQuantity,
    addProductToCart,
    addedProd,
    updatedProduct,
    pathname,
  ]);

  const cartContextValue = {
    cartProducts: state.cartProducts,
    totalQuantity: state.totalQuantity,
    overallTotalPrice: state.overallTotalPrice,
    loading: state.loading,
    error: state.error,
    addProductToCart,
    updateProductHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
