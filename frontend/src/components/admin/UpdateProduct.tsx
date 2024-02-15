import classes from "./styles/product.module.css";
import Form from "../form/Form";

function UpdateProduct() {
  return (
    <div className={classes.update_product_cont}>
      <h1 className={classes.update_product_h1}>Update Product</h1>
      <Form />
    </div>
  );
}

export default UpdateProduct;
