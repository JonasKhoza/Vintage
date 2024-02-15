import React, { useContext, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import classes from "../../pages/styles/cart.module.css";
import { CartProductInterface } from "../../models/product.models";
import CartContext from "../../context/ManageUserCartContext";

interface CartItemInterface {
  product: CartProductInterface;
  totalPrice: number;
  quantity: number;
}

interface CartItemInteface {
  product: CartItemInterface;
  overallTotalPrice: number;
}

const CartItem: React.FC<CartItemInteface> = ({ product }) => {
  const [productValueUpdate, setProductValueUpdate] = useState<number>(
    product.quantity
  );
  const { updateProductHandler } = useContext(CartContext);
  //Updates of a product handler
  function productChangesHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let value = +event.currentTarget.value;
    setProductValueUpdate(value);
  }

  const increaseProductUpdateHandler = (id: string) => {
    setProductValueUpdate((prevValue) => {
      const updatedValue = prevValue + 1;
      updateProductHandler(id, updatedValue);
      return updatedValue;
    });
  };

  const decreaseProductUpdateHandler = (id: string) => {
    setProductValueUpdate((prevValue) => {
      const updatedValue = prevValue - 1;
      updateProductHandler(id, updatedValue);
      return updatedValue;
    });
  };

  return (
    <ul>
      <li key={product.product._id}>
        <article className={classes.cart_item}>
          <div className={classes.product_img}>
            <img src={product.product.image} alt={product.product.title} />
          </div>

          <div className={classes.item_summary}>
            <h2>{product.product.title}</h2>

            <div className={classes.sub_summary}>
              <div className={classes.price}>
                <p>R{product.product.price.toFixed(2)}</p>
              </div>

              <div className={classes.item_quantity}>
                <div className={classes.item_quantity_actions}>
                  <RemoveIcon
                    className={classes.icons}
                    onClick={() =>
                      decreaseProductUpdateHandler(product.product._id)
                    }
                  />

                  <input
                    type="number"
                    value={productValueUpdate}
                    min="0"
                    step="1"
                    onChange={productChangesHandler}
                  />
                  <AddIcon
                    className={classes.icons}
                    onClick={() =>
                      increaseProductUpdateHandler(product.product._id)
                    }
                  />
                </div>
              </div>
              <div className={classes.item_total}>
                <p>R{product.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </article>

        <article className={classes.smallScreenCartItem}>
          <div className={classes.product_img_cont}>
            <img src={product.product.image} alt={product.product.title} />
          </div>

          <div className={classes.desc_cont}>
            <div className={classes.prodInfo_cont}>
              <h2>{product.product.title}</h2>
              <p>R{product.product.price.toFixed(2)}</p>
            </div>

            <div className={classes.prod_updates_cont}>
              <div className={classes.item_quant_actions}>
                <input
                  type="number"
                  value={productValueUpdate}
                  min="0"
                  step="1"
                  onChange={productChangesHandler}
                />
                <button
                  onClick={() =>
                    updateProductHandler(
                      product.product._id,
                      productValueUpdate
                    )
                  }
                >
                  Update
                </button>
              </div>

              <div className={classes.item_total}>
                <p>R{product.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </article>

        <article className={classes.mobile_cont}>
          <div className={classes.product_img_desc_cont}>
            <div className={classes.img_cont}>
              <img src={product.product.image} alt={product.product.title} />
            </div>
            <div className={classes.prodInfo_cont}>
              <h2>{product.product.title}</h2>
              <p>R{product.product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className={classes.prod_updates_cont}>
            <div className={classes.item_quant_actions}>
              <input
                type="number"
                value={productValueUpdate}
                min="0"
                step="1"
                onChange={productChangesHandler}
              />
              <button
                onClick={() =>
                  updateProductHandler(product.product._id, productValueUpdate)
                }
              >
                Update
              </button>
            </div>

            <div className={classes.item_total}>
              <p>R{product.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </article>
      </li>
    </ul>
  );
};

export default CartItem;
