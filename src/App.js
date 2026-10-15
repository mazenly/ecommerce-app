import React, { useReducer } from "react";
import { CartContext } from "./CartContext";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

// 1. الحالة الأولية (منتجات تجريبية متاحة + السلة فارغة)
const initialState = {
  products: [
    { id: 1, name: "لابتوب ديل", price: 800 },
    { id: 2, name: "هاتف ذكي", price: 500 },
    { id: 3, name: "ساعة ذكية", price: 150 },
  ],
  cart: [],
};

// 2. دالة الـ Reducer للتحكم في العمليات
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.cart.some((item) => item.id === action.payload.id);
      if (exists) {
        // إذا كان المنتج موجوداً مسبقاً، نزيد الكمية (بدون تعديل الكائن الأصلي)
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
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
