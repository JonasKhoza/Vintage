import { useParams } from "react-router-dom";
import classes from "./styles/order_summary.module.css";
import { useEffect, useState } from "react";
import { CartItemInterface } from "../models/cart.models";
import UserInterface from "../models/userSignIn.model";
import Loading from "../components/loading/Loading";
import Error from "../components/errors/Error";

interface OrderI {
  cart: {
    items: CartItemInterface[];
  };
  createdAt: string;
  updatedAt: string;
  status: string;
  _id: string;
  user: UserInterface;
}

function OrderSummary() {
  const [order, setOrder] = useState<OrderI | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchSingleOrder = async (): Promise<void> => {
      try {
        const res = await fetch(`http://localhost:8000/orders/${id}`, {
          method: "GET",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        });

        setLoading(false);

        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error: any) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchSingleOrder();
  }, [id]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div className={classes.order_summary}>
      <h1>Order ({order?._id})</h1>
      <table>
        <thead>
          <tr>
            <th>Order Items</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order?.cart.items.map((product) => {
            return (
              <tr key={product.product._id}>
                <td>{product.product.title}</td>
                <td>{product.quantity}</td>
                <td>
                  R{product.totalPrice} (R{product.product.price}){" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderSummary;
