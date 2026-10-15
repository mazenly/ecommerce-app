import React, { useContext } from "react";
import { CartContext } from "../CartContext";

export default function ProductList() {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div>
      <h3>المنتجات المتاحة</h3>
      {state.products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h4>{product.name}</h4>
          <p>السعر: ${product.price}</p>
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
            style={{
              background: "green",
              color: "white",
              padding: "5px 10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            إضافة للسلة
          </button>
        </div>
      ))}
    </div>
  );
}
