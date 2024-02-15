import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import PaginationSize from "../components/Home_Components/pagination/Pagination";
import ProductListItem from "../components/all-products/ProductListItem";
import classes from "./styles/product_search.module.css";
import { CartProductInterface } from "../models/product.models";
import Loading from "../components/loading/Loading";
import Error from "../components/errors/Error";

function ProductSearch() {
  const [products, setProducts] = useState<CartProductInterface[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qsearch = queryParams.get("qsearch");
  const page = queryParams.get("page");

  useEffect(() => {
    setLoading(true);
    async function fetchSearchedProducts() {
      setLoading(true);
      try {
        setLoading(false);
        const res = await fetch(
          `http://localhost:8000/products/search?query=${qsearch}&page=${page}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
          setTotalPages(data.totalPages);
          setTotalProducts(data.totalProducts);
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchedProducts();
  }, [qsearch, page]);

  //products={products} page={page} setPage={setPage}

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div className={classes.product_search}>
      <h1 className={classes.products_found_header}>
        We have found ({totalProducts}) product(s)
      </h1>

      <div className={classes.products_searched}>
        <div className="pagination_container">
          {<PaginationSize totalPages={totalPages} />}
          <p>There are {totalProducts && totalProducts} items</p>
        </div>
        {products.length < 1 ? (
          <p>No products found that matches the search.</p>
        ) : (
          <ul className={classes.products_grid}>
            {products.map((product) => {
              return <ProductListItem key={product._id} {...product} />;
            })}
          </ul>
        )}

        <div className="pagination_container">
          {<PaginationSize totalPages={totalPages} />}
          <p>There are {totalProducts && totalProducts} items</p>
        </div>
      </div>
    </div>
  );
}

export default ProductSearch;
