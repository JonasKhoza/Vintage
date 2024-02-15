import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CartProductInterface } from "../../../models/product.models";
import classes from "./product.module.css";
import CartContext from "../../../context/ManageUserCartContext";
interface ISingleProduct {
  product: CartProductInterface;
}

const ProductListItem: React.FC<ISingleProduct> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  return (
    <li>
      <article className={classes.product_details}>
        <Link to={`/${product._id}`}>
          <img src={product.image} alt="" />
        </Link>

        <div className={classes.product_item_content}>
          <div>
            <p className={classes.special_price}>
              Was <span>R{product.oldPrice}</span>
            </p>

            <p>R{product.price}</p>
            <h1>{product.title}</h1>
            <p>Ends Nov 2022</p>
          </div>

          <div className={classes.product_items_actions}>
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
};

export default ProductListItem;
