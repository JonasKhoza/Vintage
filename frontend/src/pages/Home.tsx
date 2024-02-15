import ProductSearch from "../components/Home_Components/product-search/ProductSearch";
import MainSlider from "../components/Home_Components/main-slider/mainSlider";
import ProductItem from "../components/Home_Components/drag-products-slider/ProductItem";
import ProductsItem from "../components/Home_Components/product/ProductItem";
import classes from "./styles/home.module.css";

function Home() {
  return (
    <div className={classes.home}>
      <section>
        <ProductSearch />
        < MainSlider />
      </section>
      <section className={classes.specials}>
        <h1 className={classes.this_week}>THIS WEEK</h1>
        <ProductItem />
      </section>
      <section>
        <ProductsItem />
      </section>
    </div>
  );
}

export default Home;
