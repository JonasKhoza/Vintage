import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IPagination } from "../../../models/pagination.models";
import { ProductsContext } from "../../../context/ManageProductsContext";
import { useLocation, useNavigate } from "react-router-dom";

const PaginationSize: React.FC<IPagination> = (totalPages) => {
  const { fetchPage } = useContext(ProductsContext);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get("page"));
  const qsearch = queryParams.get("qsearch");

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (location.pathname.includes("/search")) {
      navigate(`${location.pathname}?qsearch=${qsearch}&page=${newPage}`);
    } else {
      navigate(`${location.pathname}?page=${newPage}`);
    }

    fetchPage(newPage);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages.totalPages}
        size="large"
        defaultPage={1}
        page={page || 1}
        onChange={handlePageChange}
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationSize;
