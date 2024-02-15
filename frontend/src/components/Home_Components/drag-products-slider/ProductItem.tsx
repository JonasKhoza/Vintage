import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ProductListItem from "./ProductListItem";
import classes from "./product.module.css";
import { ProductsContext } from "../../../context/ManageProductsContext";
import Loading from "../../loading/Loading";
import Error from "../../errors/Error";

function ProductItem() {
  const {
    onSpecialProducts: products,
    onSpecialLoading: loading,
    onSpecialError: error,
    onSpecialtotalProducts: totalProducts,
  } = useContext(ProductsContext);

  const slide = useRef<HTMLDivElement>(null);

  const [sliderWidth, setSliderWidth] = useState<number>(0);
  // useEffect(() => {
  //   console.log(
  //     "Data: ",
  //     slide.current!.offsetWidth,
  //     slide.current!.scrollWidth
  //   );
  //   setSliderWidth(slide.current!.offsetWidth - slide.current!.scrollWidth);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      if (slide.current) {
        setSliderWidth(slide.current.offsetWidth - slide.current.scrollWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially to set the correct width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div className={classes.sliderContainer} ref={slide}>
      <div className="view_container">
        <Link to="/specials" className="view_all">
          ..View all..
        </Link>
        {loading ? (
          <Loading />
        ) : (
          <p>There are {totalProducts && totalProducts} items</p>
        )}
      </div>
      {loading && <Loading />}
      {error && <Error error={error} />}
      <motion.ul
        className={classes.products_grid}
        drag="x"
        dragConstraints={{ right: 0, left: sliderWidth }}
      >
        {products.map((product) => {
          return <ProductListItem product={product} key={product._id} />;
        })}
      </motion.ul>
    </motion.div>
  );
}

export default ProductItem;
