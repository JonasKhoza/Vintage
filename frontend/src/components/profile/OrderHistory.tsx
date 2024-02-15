import { Link } from "react-router-dom";
import classes from "./styles/order_history.module.css";
import { useContext } from "react";
import OrdersContext from "../../context/ManageOrdersContext";

function formattedDate(d: Date) {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return (
      "Today at " +
      date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  } else if (date.toDateString() === yesterday.toDateString()) {
    return (
      "Yesterday at " +
      date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  } else {
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }
}

function OrderHistory() {
  const { orders } = useContext(OrdersContext);

  return orders.length <= 0 ? (
    <p style={{ textAlign: "center" }}>You have no order history.</p>
  ) : (
    <div className={classes.order_history}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>STATUS</th>
            <th>DATE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        {orders.map((order) => {
          const convertedToDate = new Date(order.createdAt);
          const date = formattedDate(convertedToDate);
          return (
            <tbody key={order._id}>
              <tr>
                <td>
                  <Link to={`/order/${order._id}`}> {order._id}</Link>
                </td>
                <td>{order.status}</td>
                <td>{date}</td>
                <td>R{order.cart.overallTotalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default OrderHistory;
