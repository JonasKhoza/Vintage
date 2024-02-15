import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./styles/product.module.css";
import { CartProductInterface } from "../../models/product.models";
import CartContext from "../../context/ManageUserCartContext";

function ProductListItem(product: CartProductInterface) {
  const { addProductToCart } = useContext(CartContext);
  return (
    <li>
      <article className={classes.product_details}>
        <Link to={`/${product._id}`}>
          <img src={product.image} alt={product.title} />
        </Link>

        <div className={classes.product_item_content}>
          <div>
            <h1>{product.title}</h1>
            <p>R{product.price}</p>
          </div>

          <div className={classes.product_items_actions2}>
            <button
              className="btn"
              onClick={() => addProductToCart(product._id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}

export default ProductListItem;
