import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";

const renderApp = () =>
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

const addButtons = () => screen.getAllByRole("button", { name: "إضافة للسلة" });

test("adding the same product twice increments quantity by exactly one each time", () => {
  renderApp();
  fireEvent.click(addButtons()[0]);
  fireEvent.click(addButtons()[0]);

  const cart = screen.getByTestId("cart");
  expect(within(cart).getByText(/× 2/)).toBeInTheDocument();
  expect(within(cart).getByText(/المجموع الكلي: \$1600/)).toBeInTheDocument();
  expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
});

test("removing a product empties the cart", () => {
  renderApp();
  fireEvent.click(addButtons()[1]);
  fireEvent.click(screen.getByRole("button", { name: "حذف" }));

  expect(screen.getByText("السلة فارغة")).toBeInTheDocument();
  expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
});
