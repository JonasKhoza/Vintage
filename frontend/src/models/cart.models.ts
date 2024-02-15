import { CartProductInterface } from "./product.models";

export interface CartItemInterface {
  product: CartProductInterface;
  totalPrice: number;
  quantity: number;
}

export interface CartContextI {
  cartProducts: CartItemInterface[];
  totalQuantity: number;
  overallTotalPrice: number;
  loading: boolean;
  error: string;
  addProductToCart: (id: string | number) => {};
  updateProductHandler: (id: string, newQuantity: number) => {};
}

export interface CartDataInterface {
  cartProducts: CartItemInterface[];
  totalQuantity: number;
  overallTotalPrice: number;
  loading: boolean;
  error: string;
}

export interface FC {
  children: React.ReactNode;
}

export type ActionI =
  | { type: "FETCH_CART_LOADING"; payload: { loading: boolean } }
  | { type: "FETCH_CART_SUCCESS"; payload: CartDataInterface }
  | { type: "FETCH_CART_FAILURE"; payload: { error: string } };
