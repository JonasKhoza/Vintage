import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ProductInterface } from "../../../models/product.models";

import classes from "./product.module.css";
import CartContext from "../../../context/ManageUserCartContext";

interface ProductListItemInterface {
  product: ProductInterface;
}

const ProductListItem: React.FC<ProductListItemInterface> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  return (
    <li>
      <article className={classes.product_details}>
        <div className={classes.image_container}>
          <Link to={`/${product._id}`}>
            <img src={product.image} alt="" />
          </Link>
        </div>
        <div className={classes.product_item_content}>
          <div className={classes.product_name}>
            <h1>{product.title}</h1>
            <p>R{product.price}</p>
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
