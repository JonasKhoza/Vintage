import { CartItemInterface } from "./cart.models";

export interface UserInterface {
  userId: string;
  isAdmin: boolean;
  userName: string;
  createdAt: string;
}

export interface UserDataInterface {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDataInterface {
  cart: {
    items: CartItemInterface[];
    overallTotalPrice: number;
    totalQuantity: number;
    _id: string;
  };
  user: UserDataInterface;
  createdAt: string;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface CartDataInterface {
  cartProducts: CartItemInterface[];
  totalQuantity: number;
  overallTotalPrice: number;
}

export interface OrderI {
  cart: CartDataInterface;
  user: UserDataInterface;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  _id: string;
}

export interface UserAddressI {
  _id: string;
  street: string;
  city: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderInterface {
  orders: OrderDataInterface[];
  adminOrders: OrderDataInterface[];
  addOrderHandler: () => Promise<void>;
  updateStatusHandler: (status: string, orderId: string) => {};
  loading: boolean;
  error?: string;
  updated?: string;
  userAddress: UserAddressI;
  adminUsersAddresses: UserAddressI[];
  adminUpdateLoading: boolean;
  updateMessage: string;
}
