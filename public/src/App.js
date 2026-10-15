import React, { createContext, useReducer } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

// 1. إنشاء الـ Context
export const CartContext = createContext();

// 2. الحالة الأولية (منتجات تجريبية متاحة + السلة فارغة)
const initialState = {
  products: [
    { id: 1, name: "لابتوب ديل", price: 800 },
    { id: 2, name: "هاتف ذكي", price: 500 },
    { id: 3, name: "ساعة ذكية", price: 150 },
  ],
  cart: [],
};

// 3. دالة الـ Reducer للتحكم في العمليات
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existingIndex > -1) {
        // إذا كان المنتج موجوداً مسبقاً، نزيد الكمية
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      } else {
        // إذا لم يكن موجوداً، نضيفه مع كمية 1
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <Navbar />
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ProductList />
          <Cart />
        </div>
      </div>
    </CartContext.Provider>
  );
}
