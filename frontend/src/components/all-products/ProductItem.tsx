import { useContext } from "react";
import PaginationSize from "../Home_Components/pagination/Pagination";
import ProductListItem from "./ProductListItem";

import classes from "./styles/product.module.css";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/ManageProductsContext";
import { CartProductInterface } from "../../models/product.models";

const ProductItem: React.FC<{ products: CartProductInterface[] }> = ({
  products,
}) => {
  const { totalPages, totalProducts } = useContext(ProductsContext);

  return (
    <div className={classes.all_products}>
      <div className={classes.headers}>
        <header>
          <h1>Festive deals</h1>
          <p>Add the christmas spirit to your home and fill it with love</p>
          <Link to="/specials" className={classes.view_more}>
            View more
          </Link>
        </header>
        <header>
          <h1>Festive giving</h1>
          <p>Give the spirit of the festive season with our festive deals</p>
        </header>
      </div>
      <div>
        <h1 className={classes.all_deals}>ALL DEALS</h1>

        <div className="pagination_container">
          <PaginationSize totalPages={totalPages} />
          <p>There are {products && products.length} items</p>
        </div>
      </div>

      <ul className={classes.products_grid}>
        {products.map((product) => {
          return <ProductListItem {...product} key={product._id} />;
        })}
      </ul>
      <div className="pagination_container">
        <PaginationSize totalPages={totalPages} />
        <p>There are {totalProducts && totalProducts} items</p>
      </div>
    </div>
  );
};
export default ProductItem;
