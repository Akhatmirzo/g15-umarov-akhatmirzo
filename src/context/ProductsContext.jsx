import React, { createContext, useEffect, useReducer } from "react";
import { uid } from "uid";

const productContext = createContext();

export default function ProductsContext({ children }) {
  const [products, productsDispatcher] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        const newState = [...state, { id: uid(), ...action.payload }]
        localStorage.setItem("products", JSON.stringify(newState));
        return newState;
      case "REMOVE_PRODUCT":
        return state.filter((product) => product.id !== action.payload);

      case "UPDATE_PRODUCT":
        return state.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      case "GET_PRODUCT":
        return action.payload;
      default:
        return state;
    }
  }, []);

  const findOneProduct = (id) => {
    return products.find((product) => product.id === id);
  }

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("products"));
    if (localProducts) {
      productsDispatcher({ type: "GET_PRODUCT", payload: localProducts });
    }
  }, [])

  return (
    <productContext.Provider value={{ findOneProduct, products, productsDispatcher }}>
      {children}
    </productContext.Provider>
  );
}

export { productContext };
