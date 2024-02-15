import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "../styles/search.module.css";

function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const Navigate = useNavigate();

  function productSearchQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }
  function searchProductHandler() {
    Navigate(`/search/?qsearch=${searchQuery}`);
  }

  return (
    <div className={classes.search}>
      <input
        type="search"
        placeholder="I'm searching for..."
        onChange={productSearchQuery}
      />
      <button onClick={searchProductHandler}>
        <SearchIcon />
      </button>
    </div>
  );
}

export default ProductSearch;
