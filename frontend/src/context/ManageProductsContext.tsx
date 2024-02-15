import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Action, FC, ProductsContextType } from "../models/product.models";
import { ProductI } from "../components/form/Form";
import { UserAuthContext } from "./ManageUserAuthContext";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  onSpecialLoading: false,
  error: "",
  onSpecialError: "",
  totalProducts: 0,
  totalPages: 0,
  onSpecialtotalProducts: 0,
  onSpecialtotalPages: 0,
  onSpecialProducts: [],
  onAdminFetchLoading: false,
  onAdminFetchError: "",
  adminProducts: [],
  updateMessage: "",
  adminUpdateLoading: false,
  adminDeleteLoading: false,
  deleteMessage: "",
  fetchPage: (page: number) => {},
  adminAddNewProductHandler: (product: ProductI) => {},
  adminUpdateProductHandler: (product: ProductI, id: string) => {},
  adminDeleteProductHandler: (id: string) => {},
});

const initialState: ProductsContextType = {
  loading: false,
  onSpecialLoading: false,
  error: "",
  onSpecialError: "",
  products: [],
  totalProducts: 0,
  totalPages: 0,
  onSpecialtotalProducts: 0,
  onSpecialtotalPages: 0,
  onSpecialProducts: [],
  onAdminFetchLoading: false,
  onAdminFetchError: "",
  adminProducts: [],
  updateMessage: "",
  adminUpdateLoading: false,
  adminDeleteLoading: false,
  deleteMessage: "",
  fetchPage: (page: number) => {},
  adminAddNewProductHandler: (product: ProductI) => {},
  adminUpdateProductHandler: (product: ProductI, id: string) => {},
  adminDeleteProductHandler: (id: string) => {},
};

const reducer = (
  state: ProductsContextType,
  action: Action
): ProductsContextType => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: action.payload.loading!,
        onSpecialLoading: action.payload.onSpecialLoading!,
        onAdminFetchLoading: action.payload.onAdminFetchLoading!,
      };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: action.payload.loading,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        totalPages: action.payload.totalPages,
      };

    case "FETCH_ON_SPECIAL_PRODUCTS_SUCCESS":
      return {
        ...state,
        onSpecialLoading: action.payload.onSpecialLoading!,
        onSpecialProducts: action.payload.onSpecialProducts,
        onSpecialtotalPages: action.payload.onSpecialtotalPages,
        onSpecialtotalProducts: action.payload.onSpecialtotalProducts,
      };

    case "FETCH_ADMIN_PRODUCTS":
      return {
        ...state,
        onAdminFetchLoading: action.payload.onAdminFetchLoading,
        adminProducts: action.payload.adminProducts,
      };
    case "ADMIN_UPDATE_PRODUCT":
      return {
        ...state,
        adminUpdateLoading: action.payload.adminUpdateLoading!,
        updateMessage: action.payload.updateMessage,
      };
    case "ADMIN_DELETE_PRODUCT":
      return {
        ...state,
        adminDeleteLoading: action.payload.adminDeleteLoading,
        deleteMessage: action.payload.deleteMessage,
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error!,
        onSpecialError: action.payload.onSpecialError!,
      };
    default:
      return state;
  }
};

const ManageProductsContext: React.FC<FC> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addedProduct, setAddedProduct] = useState(false);
  const { isAdmin } = useContext(UserAuthContext);

  const location = useLocation();

  const fetchPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({
        type: "FETCH_PRODUCTS_REQUEST",
        payload: { loading: false },
      });
      try {
        const res = await fetch(
          `http://localhost:8000/products?currentPage=${currentPage}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          dispatch({
            type: "FETCH_PRODUCTS_SUCCESS",
            payload: {
              loading: false,
              products: data.products,
              totalProducts: data.totalProducts,
              totalPages: data.totalPages,
            },
          });
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error: any) {
        dispatch({
          type: "FETCH_PRODUCTS_FAILURE",
          payload: { onSpecialError: error.message, loading: false },
        });
      }
    };

    fetchProducts();
  }, [currentPage, addedProduct]);

  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCTS_REQUEST",
      payload: { onSpecialLoading: true },
    });
    async function getProducts() {
      try {
        const res = await fetch(
          `http://localhost:8000/products/specials?page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
          }
        );

        dispatch({
          type: "FETCH_PRODUCTS_REQUEST",
          payload: { onSpecialLoading: false },
        });

        if (res.ok) {
          const data = await res.json();
          dispatch({
            type: "FETCH_ON_SPECIAL_PRODUCTS_SUCCESS",
            payload: {
              onSpecialLoading: false,
              onSpecialProducts: data.products,
              onSpecialtotalProducts: data.totalProducts,
              onSpecialtotalPages: data.totalPages,
            },
          });
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error: any) {
        dispatch({
          type: "FETCH_PRODUCTS_FAILURE",
          payload: { onSpecialLoading: false, error: error.message },
        });
        console.log(error);
      } finally {
        dispatch({
          type: "FETCH_PRODUCTS_REQUEST",
          payload: { onSpecialLoading: false },
        });
      }
    }
    getProducts();
  }, [currentPage, addedProduct]);

  useEffect(() => {
    if (!location.pathname.includes("/admin")) {
      return;
    }

    dispatch({
      type: "FETCH_PRODUCTS_REQUEST",
      payload: { onAdminFetchLoading: true },
    });
    async function getProducts() {
      try {
        const res = await fetch("http://localhost:8000/admin/all-products", {
          method: "GET",
          headers: {
            accept: "*/*",
          },
          mode: "cors",
          credentials: "include",
        });

        if (res.ok) {
          const { products } = await res.json();
          dispatch({
            type: "FETCH_ADMIN_PRODUCTS",
            payload: {
              onAdminFetchLoading: false,
              adminProducts: products,
            },
          });
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error: any) {
        console.error(error);
        dispatch({
          type: "FETCH_PRODUCTS_FAILURE",
          payload: {
            onAdminFetchError: error.message,
            onAdminFetchLoading: false,
          },
        });
      } finally {
        dispatch({
          type: "FETCH_PRODUCTS_REQUEST",
          payload: { onAdminFetchLoading: false },
        });
      }
    }
    getProducts();
  }, [addedProduct, location.pathname]);

  const adminAddNewProductHandler = async (product: ProductI) => {
    try {
      const res = await fetch("http://localhost:8000/admin/all-products/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
        mode: "cors",
        credentials: "include",
      });

      if (res.ok) {
        const addedProduct = await res.json();
        console.log(addedProduct);
        setAddedProduct((prevV) => !prevV);
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const adminUpdateProductHandler = async (product: ProductI, id: string) => {
    dispatch({
      type: "FETCH_PRODUCTS_REQUEST",
      payload: { adminUpdateLoading: true },
    });
    try {
      const res = await fetch(
        `http://localhost:8000/admin/all-products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
          mode: "cors",
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        toast.success(data.success);
        dispatch({
          type: "ADMIN_UPDATE_PRODUCT",
          payload: {
            adminUpdateLoading: false,
            updateMessage: data.success,
          },
        });
        setAddedProduct((prevV) => !prevV);
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "FETCH_PRODUCTS_REQUEST",
        payload: { adminUpdateLoading: false },
      });
    }
  };

  const adminDeleteProductHandler = async (id: string) => {
    dispatch({
      type: "FETCH_PRODUCTS_REQUEST",
      payload: { adminDeleteLoading: true },
    });
    try {
      const res = await fetch(
        `http://localhost:8000/admin/all-products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: "ADMIN_DELETE_PRODUCT",
          payload: {
            adminDeleteLoading: false,
            deleteMessage: data.message,
          },
        });
        setAddedProduct((prevV) => !prevV);
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "FETCH_PRODUCTS_REQUEST",
        payload: { adminDeleteLoading: false },
      });
    }
  };

  const contextValue: ProductsContextType = {
    products: state.products,
    loading: state.loading,
    onSpecialLoading: state.onSpecialLoading,
    error: state.error,
    onSpecialError: state.onSpecialError,
    totalProducts: state.totalProducts,
    totalPages: state.totalPages,
    onSpecialtotalProducts: state.onSpecialtotalProducts,
    onSpecialtotalPages: state.onSpecialtotalPages,
    onSpecialProducts: state.onSpecialProducts,
    onAdminFetchError: state.onAdminFetchError,
    onAdminFetchLoading: state.onAdminFetchLoading,
    adminProducts: state.adminProducts,
    updateMessage: state.updateMessage,
    adminUpdateLoading: state.adminUpdateLoading,
    adminDeleteLoading: state.adminDeleteLoading,
    deleteMessage: state.deleteMessage,
    fetchPage,
    adminAddNewProductHandler,
    adminUpdateProductHandler,
    adminDeleteProductHandler,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ManageProductsContext;
