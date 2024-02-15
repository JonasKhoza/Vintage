import React from "react";
import { useContext } from "react";
// import OrdersContext from "../../context/OrdersContext";
import OrderItem from "../../components/admin/orders/OrderItem";
import OrdersContext from "../../context/ManageOrdersContext";

function OrdersPlaced() {
  const { adminOrders: orders, adminUsersAddresses: userAddress } =
    useContext(OrdersContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      <h1
        style={{
          fontFamily: "Kanit sans-serif",
          fontWeight: "700",
          fontSize: "3rem",
          textAlign: "center",
        }}
      >
        All customers orders
      </h1>

      <OrderItem orders={orders} userAddress={userAddress} />
    </div>
  );
}

export default OrdersPlaced;
