import React, { useContext } from "react";
import { CartContext } from "../CartContext";

export default function Navbar() {
  const { state } = useContext(CartContext);
  // حساب إجمالي عدد المنتجات في السلة
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: "#eee",
        padding: "10px",
      }}
    >
      <h2>متجري الإلكتروني</h2>
      <h3 data-testid="cart-count">🛒 السلة: {totalItems} منتجات</h3>
    </nav>
  );
}
