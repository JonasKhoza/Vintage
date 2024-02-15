import { CartProductInterface } from "../../models/product.models";
import ProductItem from "./ProductItem";
import c from "./styles/product.module.css";

interface ProductsI {
  products: CartProductInterface[];
}

const ProductCard: React.FC<ProductsI> = ({ products }) => {
  return (
    products && (
      <ul className={c.products_grid}>
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </ul>
    )
  );
};

export default ProductCard;
