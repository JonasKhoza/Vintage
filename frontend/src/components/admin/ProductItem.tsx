import { Link } from "react-router-dom";
import { useContext } from "react";

import c from "./styles/product.module.css";
import { CartProductInterface } from "../../models/product.models";
import { ProductsContext } from "../../context/ManageProductsContext";

interface ISingleProduct {
  product: CartProductInterface;
}

const ProductItem: React.FC<ISingleProduct> = ({ product }) => {
  const { adminDeleteProductHandler } = useContext(ProductsContext);
  return (
    <li>
      <article className={c.product_details}>
        <div className={c.img_cont}>
          <img src={product.image} alt={product.title} />
        </div>

        <div className={c.product_item_content}>
          <h2>{product.title}</h2>
          <div className={c.product_items_actions}>
            <Link
              to={`/admin/all-products/${product._id}`}
              className={`button ${c.edit}`}
            >
              View & Edit
            </Link>

            <Link
              to="#"
              className={`button ${c.edit}`}
              onClick={() => adminDeleteProductHandler(product._id)}
            >
              Delete
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
};

export default ProductItem;
