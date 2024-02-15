import { useContext, useState } from "react";
import classes from "./styles/payment.module.css";
import CartContext from "../context/ManageUserCartContext";
import OrdersContext from "../context/ManageOrdersContext";

function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { addOrderHandler } = useContext(OrdersContext);

  const { overallTotalPrice } = useContext(CartContext);
  const tax = overallTotalPrice * (15 / 100);
  const shipping = overallTotalPrice > 400 ? "Free delivery" : "R45";
  let totalPayment: number;
  totalPayment =
    overallTotalPrice < 400 ? overallTotalPrice + 45 : overallTotalPrice;

  const paymentMethodHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className={classes.payment}>
      <h1>Great, that's R{overallTotalPrice.toFixed(2)}!</h1>
      <div className={classes.order_summa}>
        <div className={classes.payment_method_container}>
          <h2>How would you like to pay?</h2>
          <div className={classes.payment_method}>
            <div className={classes.input_container}>
              <input
                type="radio"
                id="html"
                name="paypal"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={paymentMethodHandler}
              />
              <label htmlFor="html">Paypal</label>
            </div>
            <hr />
            <div className={classes.input_container}>
              <input
                type="radio"
                id="css"
                name="credit/debit"
                value="credit/debit"
                checked={paymentMethod === "credit/debit"}
                onChange={paymentMethodHandler}
              />
              <label htmlFor="css">Credit/Debit Card</label>
            </div>
          </div>
        </div>

        <div className={classes.order_table_summary}>
          <table>
            <tbody>
              <tr>
                <th>Products:</th>
                <td>
                  <p>R{overallTotalPrice.toFixed(2)}</p>
                </td>
              </tr>
              <tr>
                <th>Shipping:</th>
                <td>
                  <p>{shipping}</p>
                </td>
              </tr>
              <tr>
                <th> Tax:</th>
                <td>
                  <p>R{tax.toFixed(2)}</p>
                </td>
              </tr>
              <tr>
                <th> Total:</th>
                <td>
                  <p>R{totalPayment.toFixed(2)}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={addOrderHandler}>Place order</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
