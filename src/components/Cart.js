import React, { useContext } from "react";
import { CartContext } from "../CartContext";

export default function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const totalAmount = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      data-testid="cart"
      style={{
        background: "#f9f9f9",
        padding: "15px",
        width: "300px",
        border: "1px solid #ddd",
      }}
    >
      <h3>عربة التسوق</h3>
      {state.cart.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <div>
          {state.cart.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #eee",
                paddingBottom: "5px",
              }}
            >
              <p>
                <b>{item.name}</b>
              </p>
              <p>
                السعر: ${item.price} × {item.quantity}
              </p>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                }
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "3px 6px",
                  cursor: "pointer",
                }}
              >
                حذف
              </button>
            </div>
          ))}
          <h4>المجموع الكلي: ${totalAmount}</h4>
        </div>
      )}
    </div>
  );
}
