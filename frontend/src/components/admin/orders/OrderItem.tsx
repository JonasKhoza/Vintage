import React from "react";

import OrderListItem from "./OrderListItem";
import { OrderDataInterface, UserAddressI } from "../../../models/order.model";

import c from "./styles/orders.module.css";

interface OrderInterface {
  orders: OrderDataInterface[];
  userAddress: UserAddressI[];
}
const defaultAddress = {
  _id: "",
  street: "",
  city: "",
  postalCode: "",
  createdAt: "",
  updatedAt: "",
};

const OrderItem: React.FC<OrderInterface> = ({ orders, userAddress }) => {
  const ordersLength = orders && orders.length > 0;

  return (
    <ol className={c.ordered_list}>
      {ordersLength &&
        orders.map((order) => {
          const filteredAddress = userAddress.filter(
            (address) => address._id.toString() === order.user._id.toString()
          );
          return (
            <OrderListItem
              key={order._id}
              order={order}
              userAddress={
                filteredAddress.length > 0 ? filteredAddress[0] : defaultAddress
              }
            />
          );
        })}
    </ol>
  );
};

export default OrderItem;
