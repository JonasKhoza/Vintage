import { FormEvent, useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ManageProductsContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Toastify from "../toastify/Toastify";

import classes from "../Home_Components/styles/form.module.css";
import c from "../form/form.module.css";

export interface ProductI {
  title: string;
  image: string;
  summary: string;
  price: string;
  oldPrice: number;
  quantity: number;
  special: boolean;
  color: string[];
  brand: string;
  description: string;
}

function Form() {
  const [productFound, setProductFound] = useState(false);
  const [addProduct, setAddProduct] = useState({
    title: "",
    image: "",
    summary: "",
    price: "",
    oldPrice: 0,
    quantity: 0,
    special: false,
    color: "",
    brand: "",
    description: "",
  });
  const [updatedProduct, setUpdatedProduct] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const {
    adminAddNewProductHandler,
    adminUpdateProductHandler,
    updateMessage,
  } = useContext(ProductsContext);

  const productChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { type, name, value, checked } = event.target as HTMLInputElement;

    setAddProduct((prevV) => {
      return {
        ...prevV,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const addNewProduct = (event: FormEvent) => {
    event.preventDefault();

    const product = {
      title: addProduct.title,
      image: addProduct.image,
      summary: addProduct.summary,
      price: addProduct.price,
      oldPrice: addProduct.oldPrice,
      quantity: addProduct.quantity,
      special: addProduct.special,
      color: addProduct.color.split(",").map((color) => color.trim()),
      brand: addProduct.brand,
      description: addProduct.description,
    };

    if (location.pathname === "/admin/all-products/new") {
      adminAddNewProductHandler(product);
    } else {
      adminUpdateProductHandler(product, id!);
      setUpdatedProduct((prevV) => !prevV);
    }

    setAddProduct({
      title: "",
      image: "",
      summary: "",
      price: "",
      oldPrice: 0,
      quantity: 0,
      special: false,
      color: "",
      brand: "",
      description: "",
    });

    !productFound && navigate("/admin/all-products");
  };

  useEffect(() => {
    if (location.pathname === "/admin/all-products/new") return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/admin/all-products/${id}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (res.ok) {
          const { product, foundProduct } = await res.json();
          setProductFound(foundProduct);
          if (foundProduct) {
            setAddProduct(product); // Prepopulate the form with the fetched product
          }
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id, updatedProduct, updateMessage]);

  return (
    <form onSubmit={addNewProduct} className={classes.form}>
      <Toastify />
      <p>
        <label htmlFor="title">Title</label>
      </p>
      <input
        type="text"
        id="title"
        name="title"
        value={addProduct.title}
        required
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="image">Image</label>
      </p>
      <input
        type="url"
        id="image"
        name="image"
        value={addProduct.image}
        required
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="summary">Summary</label>
      </p>
      <input
        type="text"
        id="summary"
        name="summary"
        maxLength={250}
        value={addProduct.summary}
        required
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="price">Price</label>
      </p>
      <input
        type="number"
        id="price"
        name="price"
        min="0.00"
        step="0.01"
        value={addProduct.price}
        required
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="oldPrice">Old Price</label>
      </p>
      <input
        type="number"
        id="oldPrice"
        name="oldPrice"
        min="0.00"
        step="0.01"
        value={addProduct.oldPrice}
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="color">Colors</label>
      </p>
      <input
        type="text"
        id="color"
        name="color"
        placeholder="Separate colors by commas,e.g, blue, red, etc.."
        value={addProduct.color}
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="quantity">Quantity</label>
      </p>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="0"
        step="1"
        value={addProduct.quantity}
        required
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="special">On Special</label>
      </p>
      <input
        type="checkbox"
        id="special"
        name="special"
        checked={addProduct.special}
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="brand">Brand</label>
      </p>
      <input
        type="text"
        id="brand"
        name="brand"
        maxLength={250}
        required
        value={addProduct.brand}
        onChange={productChangeHandler}
      />

      <p>
        <label htmlFor="description">Description</label>
      </p>
      <textarea
        id="description"
        name="description"
        rows={7}
        required
        value={addProduct.description}
        onChange={productChangeHandler}
      ></textarea>

      <p
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <button type="reset" className="btn alt-reset">
          Reset
        </button>
        <button className="btn" type="submit">
          Save
        </button>
      </p>
    </form>
  );
}

export default Form;
