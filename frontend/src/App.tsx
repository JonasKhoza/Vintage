import { Suspense, lazy } from "react";

import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import NotAuthorized from "./components/errors/NotAuthorized";
import NotLoggedIn from "./components/errors/NotLoggedIn";
import Loading from "./components/loading/Loading";

const HomePage = lazy(async () => {
  const module = await import("./pages/Home");
  return { default: module.default };
});

const CartPage = lazy(async () => {
  const module = await import("./pages/Cart");
  return { default: module.default };
});

const SignupPage = lazy(async () => {
  const module = await import("./pages/SignUp");
  return {
    default: module.default,
  };
});

const LoginPage = lazy(async () => {
  const module = await import("./pages/Login");
  return { default: module.default };
});

const ProductDetailsPage = lazy(async () => {
  const module = await import("./pages/ProductDetails");
  return { default: module.default };
});

const DeliveryAddressPage = lazy(async () => {
  const module = await import("./pages/DeliveryAddress");
  return { default: module.default };
});

const ProductSearchPage = lazy(async () => {
  const module = await import("./pages/ProductSearch");
  return { default: module.default };
});

const ProfilePage = lazy(async () => {
  const module = await import("./pages/Profile");
  return { default: module.default };
});

const OrderSummaryPage = lazy(async () => {
  const module = await import("./pages/OrderSummary");
  return { default: module.default };
});

const PaymentMethodPage = lazy(async () => {
  const module = await import("./pages/PaymentMethod");
  return { default: module.default };
});

const SpecialsPage = lazy(async () => {
  const module = await import("./pages/Specials");
  return { default: module.default };
});

const NotFoundPage = lazy(async () => {
  const module = await import("./pages/NotFoundPage");
  return { default: module.default };
});

const AdminAllProductsPage = lazy(async () => {
  const module = await import("./pages/admin/AdminAllProducts");
  return { default: module.default };
});

const AddNewProductPage = lazy(async () => {
  const module = await import("./pages/admin/AddNewProduct");
  return { default: module.default };
});

const UpdateProductPage = lazy(async () => {
  const module = await import("./components/admin/UpdateProduct");
  return { default: module.default };
});

const OrdersPlacedPage = lazy(async () => {
  const module = await import("./pages/admin/OrdersPlaced");
  return { default: module.default };
});

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ProductDetailsPage />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<Loading />}>{<ProductSearchPage />}</Suspense>
          }
        />
        <Route
          path="/users/signup"
          element={
            <Suspense fallback={<Loading />}>
              <SignupPage />
            </Suspense>
          }
        />
        <Route
          path="/users/login"
          element={<Suspense fallback={<Loading />}>{<LoginPage />}</Suspense>}
        />
        <Route
          path="/users/profile"
          element={
            <NotLoggedIn>
              <Suspense fallback={<Loading />}>{<ProfilePage />}</Suspense>
            </NotLoggedIn>
          }
        />
        <Route
          path="/specials"
          element={
            <Suspense fallback={<Loading />}>
              <SpecialsPage />
            </Suspense>
          }
        />
        <Route
          path="users/shipping"
          element={
            <NotLoggedIn>
              <Suspense fallback={<Loading />}>
                {<DeliveryAddressPage />}
              </Suspense>
            </NotLoggedIn>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loading />}>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <NotLoggedIn>
              <Suspense fallback={<Loading />}>
                <OrderSummaryPage />
              </Suspense>
            </NotLoggedIn>
          }
        />
        <Route
          path="users/payment"
          element={
            <NotLoggedIn>
              <Suspense fallback={<Loading />}>
                <PaymentMethodPage />
              </Suspense>
            </NotLoggedIn>
          }
        />

        <Route
          path="/admin/all-products"
          element={
            <NotAuthorized>
              <Suspense fallback={<Loading />}>
                {<AdminAllProductsPage />}
              </Suspense>
            </NotAuthorized>
          }
        />
        <Route
          path="/admin/all-products/new"
          element={
            <NotAuthorized>
              <Suspense fallback={<Loading />}>
                {<AddNewProductPage />}
              </Suspense>
            </NotAuthorized>
          }
        />
        <Route
          path="/admin/all-products/:id"
          element={
            <NotAuthorized>
              <Suspense fallback={<Loading />}>
                {<UpdateProductPage />}
              </Suspense>
            </NotAuthorized>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <NotAuthorized>
              <Suspense fallback={<Loading />}>{<OrdersPlacedPage />}</Suspense>
            </NotAuthorized>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>{<NotFoundPage />}</Suspense>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
