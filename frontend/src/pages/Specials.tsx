import { useContext } from "react";
import { Link } from "react-router-dom";
import PaginationSize from "../components/Home_Components/pagination/Pagination";
import Loading from "../components/loading/Loading";

import classes from "./styles/specials.module.css";
import Error from "../components/errors/Error";
import CartContext from "../context/ManageUserCartContext";
import { ProductsContext } from "../context/ManageProductsContext";

function Specials() {
  const {
    onSpecialProducts: products,
    onSpecialtotalPages: totalPages,
    onSpecialtotalProducts: totalProducts,
    onSpecialError: error,
    onSpecialLoading: loading,
  } = useContext(ProductsContext);
  const { addProductToCart } = useContext(CartContext);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div className={classes.all_specials}>
      <header>
        <h1>This week specials</h1>
        <p>Simply, buy more to save more</p>
      </header>

      <div className="pagination_container">
        <PaginationSize totalPages={totalPages} />
        <p>There are {totalProducts && totalProducts} items</p>
      </div>

      <ul className={classes.products_grid}>
        {products.map((product) => {
          return (
            <li key={product._id}>
              <article className={classes.product_details}>
                <Link to={`/${product._id}`}>
                  <img src={product.image} alt={product.title} />
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
        })}
      </ul>
      <div className="pagination_container">
        <PaginationSize totalPages={totalPages} />

        <p>There are {totalProducts && totalProducts} items</p>
      </div>
    </div>
  );
}

export default Specials;
