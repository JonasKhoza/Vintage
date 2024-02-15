import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import ManageProductsContext from "./context/ManageProductsContext";
import ManageUserAuthContext from "./context/ManageUserAuthContext";
import { ManageUserCartContext } from "./context/ManageUserCartContext";
import { ManageUserAddressContext } from "./context/ManageUserAddressContext";
import { ManageOrdersContext } from "./context/ManageOrdersContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ManageUserAuthContext>
      <ManageUserCartContext>
        <ManageOrdersContext>
          <ManageUserAddressContext>
            <ManageProductsContext>
              <App />
            </ManageProductsContext>
          </ManageUserAddressContext>
        </ManageOrdersContext>
      </ManageUserCartContext>
    </ManageUserAuthContext>
  </BrowserRouter>
);
