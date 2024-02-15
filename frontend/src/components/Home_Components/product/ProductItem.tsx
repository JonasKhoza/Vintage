import { useContext } from "react";
import { Link } from "react-router-dom";

import PaginationSize from "../pagination/Pagination";
import ProductListItem from "./ProductListItem";

import { ProductsContext } from "../../../context/ManageProductsContext";

import classes from "./product.module.css";
import Loading from "../../loading/Loading";
import Error from "../../errors/Error";

function ProductsItem() {
  const { products, loading, error, totalPages, totalProducts } =
    useContext(ProductsContext);

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
          <p>There are {totalProducts && totalProducts} items</p>
        </div>
      </div>
      {loading && <Loading />}
      {error && <Error error={error} />}

      <ul className={classes.products_grid}>
        {products.map((product) => {
          return <ProductListItem product={product} key={product._id} />;
        })}
      </ul>
      <div className="pagination_container">
        <PaginationSize totalPages={totalPages} />
        <p>There are {totalProducts && totalProducts} items</p>
      </div>
    </div>
  );
}
export default ProductsItem;
