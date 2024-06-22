import React, { createContext, useEffect, useReducer } from "react";
import { uid } from "uid";

const backetContext = createContext();
export default function BacketContext({ children }) {
  const [backets, backetsDispatcher] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TO_BACKET":
        const newState = [...state, { backet_id: uid(), ...action.payload }]
        return newState;

      case "REMOVE_FROM_BACKET":
        return state.filter((item) => item.backet_id !== action.payload.id);

      case "INCREMENT_QTY_ADD":
        return state.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        );

      case "INCREMENT_QTY":
        return state.map((item) =>
          item.backet_id === action.payload.id
            ? { ...item, qty: item.qty < 1000 ? item.qty + 1 : item.qty }
            : item
        );

      case "DECREMENT_QTY":
        return state.map((item) =>
          item.backet_id === action.payload.id
            ? {
                ...item,
                qty: item.qty > 1 ? item.qty - 1 : item.qty,
              }
            : item
        );

      case "GET_BUCKET":
        return action.payload;

      default:
        return state;
    }
  }, []);

  const checkBacketProduct = (id) => {
    return backets.find((item) => item.id === id);
  };

  const totalPriceProducts = () => {
    const totalPrice = backets.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    return totalPrice;
  };

  const totalProductPrice = (id) => {
    return (
      backets.find((item) => item.id === id).price *
      backets.find((item) => item.id === id).qty
    );
  };

  return (
    <backetContext.Provider
      value={{
        backets,
        backetsDispatcher,
        checkBacketProduct,
        totalPriceProducts,
        totalProductPrice,
      }}
    >
      {children}
    </backetContext.Provider>
  );
}

export { backetContext };
