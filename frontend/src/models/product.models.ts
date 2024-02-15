import { ProductI } from "../components/form/Form";

export interface ProductInterface extends Document {
  _id: string;
  title: string;
  image: string;
  summary: string;
  oldPrice: number;
  price: number;
  description: string;
  color?: string[];
  quantity: number;
  special?: boolean;
  brand?: string;
  reviews?: {
    username?: string;
    rating?: number;
    comment?: string;
    createdAt?: Date;
    uid?: string;
  }[];
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface CartProductInterface {
  _id: string;
  title: string;
  image: string;
  summary: string;
  oldPrice: number;
  price: number;
  description: string;
  color?: string[];
  quantity: number;
  special?: boolean;
  brand?: string;
  reviews?: {
    username?: string;
    rating?: number;
    comment?: string;
    createdAt?: Date;
    uid?: string;
  }[];
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface ProductsContextType {
  products: ProductInterface[];
  loading: boolean;
  onSpecialLoading: boolean;
  error: string;
  onSpecialError: string;
  totalProducts: number;
  totalPages: number;
  onSpecialProducts: CartProductInterface[];
  onSpecialtotalProducts: number;
  onSpecialtotalPages: number;
  onAdminFetchLoading: boolean;
  onAdminFetchError: string;
  adminProducts: CartProductInterface[];
  updateMessage: string;
  adminUpdateLoading: boolean;
  adminDeleteLoading: boolean;
  deleteMessage: string;
  fetchPage: (page: number) => void;
  adminAddNewProductHandler: (product: ProductI) => void;
  adminUpdateProductHandler: (product: ProductI, id: string) => void;
  adminDeleteProductHandler: (id: string) => void;
}

export interface FC {
  children: React.ReactNode;
}

export type Action =
  | {
      type: "FETCH_PRODUCTS_REQUEST";
      payload: {
        loading?: boolean;
        onSpecialLoading?: boolean;
        onAdminFetchLoading?: boolean;
        adminUpdateLoading?: boolean;
        adminDeleteLoading?: boolean;
      };
    }
  | {
      type: "FETCH_PRODUCTS_SUCCESS";
      payload: {
        loading: boolean;
        products: ProductInterface[];
        totalProducts: number;
        totalPages: number;
      };
    }
  | {
      type: "FETCH_ON_SPECIAL_PRODUCTS_SUCCESS";
      payload: {
        onSpecialLoading?: boolean;
        onSpecialProducts: CartProductInterface[];
        onSpecialtotalProducts: number;
        onSpecialtotalPages: number;
      };
    }
  | {
      type: "FETCH_ADMIN_PRODUCTS";
      payload: {
        onAdminFetchLoading: boolean;
        adminProducts: CartProductInterface[];
      };
    }
  | {
      type: "ADMIN_UPDATE_PRODUCT";
      payload: {
        adminUpdateLoading?: boolean;
        updateMessage: string;
      };
    }
  | {
      type: "ADMIN_DELETE_PRODUCT";
      payload: { adminDeleteLoading: boolean; deleteMessage: string };
    }
  | {
      type: "FETCH_PRODUCTS_FAILURE";
      payload: {
        loading?: boolean;
        onSpecialLoading?: boolean;
        error?: string;
        onSpecialError?: string;
        onAdminFetchLoading?: boolean;
        onAdminFetchError?: string;
        adminUpdateLoading?: boolean;
        adminUpdateError?: string;
        adminDeleteLoading?: boolean;
      };
    };
