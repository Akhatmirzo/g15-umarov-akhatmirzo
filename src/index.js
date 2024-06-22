import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import ProductsContext from "./context/ProductsContext.jsx";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import BacketContext from "./context/BacketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsContext>
      <BacketContext>
        <App />
        <ToastContainer />
      </BacketContext>
    </ProductsContext>
  </BrowserRouter>
);
