import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./styles/cart.module.css";
import CartContext from "../context/ManageUserCartContext";
import CartItem from "../components/cart/cartItem";
import { UserAuthContext } from "../context/ManageUserAuthContext";

function Cart() {
  const Navigate = useNavigate();
  const { cartProducts, totalQuantity, overallTotalPrice } =
    useContext(CartContext);
  const { userId } = useContext(UserAuthContext);

  const tax = overallTotalPrice * (15 / 100);
  const shipping = overallTotalPrice > 400 ? "Free delivery" : "R45";
  const totalPayment =
    overallTotalPrice < 400 ? overallTotalPrice + 45 : overallTotalPrice;

  let loggedin = userId;

  function checkoutHandler() {
    !loggedin
      ? Navigate("/users/login?redirect=shipping")
      : Navigate("/users/shipping");
  }

  const paragraph = "You have no items in your cart.";

  return (
    <div className={classes.cart}>
      <h1 className={classes.cart_items_total}>
        Total in cart<span>({totalQuantity})</span>
      </h1>
      <div className={classes.headers}>
        <div className={classes.item_header}>
          <h2>Item</h2>
        </div>
        <div className={classes.other_headers}>
          <h2>Price</h2>
          <h2>Quantity</h2>
          <h2>Total</h2>
        </div>
      </div>

      <div className={classes.smallScreenHeader}>
        <h2>Price</h2>
      </div>

      <div className={classes.item_container}>
        {cartProducts.length === 0 ? (
          <p style={{ height: "35vh", textAlign: "center" }}>{paragraph}</p>
        ) : (
          <ul>
            {cartProducts.map((product) => {
              return (
                <CartItem
                  product={product}
                  overallTotalPrice={overallTotalPrice}
                  key={product.product._id}
                />
              );
            })}
          </ul>
        )}
        {cartProducts.length > 0 && (
          <div className={classes.subtotal}>
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>Tax:</th>
                    <td>
                      <p>R{tax.toFixed(2)}</p>
                    </td>
                  </tr>
                  <tr>
                    <th> Shipping:</th>
                    <td>
                      <p>{shipping}</p>
                    </td>
                  </tr>
                  <tr>
                    <th>Subtotal:</th>
                    <td>
                      <p>R{totalPayment.toFixed(2)}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes.checkout_continue}>
              <button onClick={checkoutHandler}>Checkout</button>
              <span>or</span>
              <Link to="/" className={classes.continue_shopping}>
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
