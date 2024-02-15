import React, { useState, useContext } from "react";

import Toastify from "../../toastify/Toastify";

import OrdersContext from "../../../context/ManageOrdersContext";
import { OrderDataInterface, UserAddressI } from "../../../models/order.model";
import { UserAuthContext } from "../../../context/ManageUserAuthContext";

import c from "./styles/orders.module.css";

interface OrderInterface {
  order: OrderDataInterface;
  userAddress: UserAddressI;
}

type Status = {
  status: string;
};

const OrderListItem: React.FC<OrderInterface> = ({ order, userAddress }) => {
  const { isAdmin } = useContext(UserAuthContext);

  const [status, setStatus] = useState<Status>({
    status: order.status,
  });

  const { updateStatusHandler } = useContext(OrdersContext);

  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function onStatusChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setStatus((prevV) => {
      return { ...prevV, [name]: value };
    });
  }

  const updateOrderStatusHandler = (event: React.FormEvent) => {
    event.preventDefault();
    updateStatusHandler(status.status, order._id);
  };

  return (
    <li>
      <Toastify />
      <article className={c.order_Item}>
        <header className={c.order_summary}>
          <h2>
            <span className={c.order_item_summary}>
              R{order.cart.overallTotalPrice.toFixed(2)} -
            </span>
            {date}
          </h2>
          <p>
            <span className={c.badge}>{order.status.toUpperCase()}</span>
          </p>
        </header>

        <section className={c.order_details}>
          {isAdmin && (
            <address>
              <p>
                <a href={`maito:${order.user.email}`}>
                  {order.user.firstname + " " + order.user.lastname}
                </a>
              </p>
              <p>
                {userAddress.street}({userAddress.city}
                )(
                {userAddress.postalCode})
              </p>
            </address>
          )}

          <ul>
            {
              //not admin
            }
            {order.cart.items.map((product) => {
              return (
                <li key={product.product._id}>
                  {product.product.title}
                  (R{product.totalPrice}) (R{product.product.price} x
                  {product.quantity})
                </li>
              );
            })}
          </ul>
        </section>
        {isAdmin && (
          <section className={c.order_actions}>
            <form id="form">
              {
                // to be used when submitting this form to update(PATCH) the order
              }
              <select
                onChange={onStatusChangeHandler}
                value={status.status}
                name="status"
              >
                <option value="pending">Pending</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className={c.btn} onClick={updateOrderStatusHandler}>
                Update
              </button>
            </form>
          </section>
        )}
      </article>
    </li>
  );
};

export default OrderListItem;
