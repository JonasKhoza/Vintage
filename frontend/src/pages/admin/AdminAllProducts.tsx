import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/admin/ProductCard";
import { UserAuthContext } from "../../context/ManageUserAuthContext";

import classes from "../../components/admin/styles/product.module.css";
import { ProductsContext } from "../../context/ManageProductsContext";
import Loading from "../../components/loading/Loading";
import Error from "../../components/errors/Error";

//add an error component
function AdminAllProducts() {
  const { isAdmin } = useContext(UserAuthContext);

  const {
    onAdminFetchError: error,
    onAdminFetchLoading: loading,
    adminProducts: products,
  } = useContext(ProductsContext);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div>
      <h1 className={classes.all_products_h1}>
        Products Admnistration : <span>{products.length}</span> : Products
      </h1>
      <section>
        <h2 className={classes.all_products_h2}>Manage Products</h2>
        <p style={{ textAlign: "center" }}>
          <Link to="/admin/all-products/new" className={classes.btn}>
            Add product
          </Link>
        </p>
      </section>
      <section>{<ProductCard products={products} />}</section>
    </div>
  );
}

export default AdminAllProducts;
