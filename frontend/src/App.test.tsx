import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders main sections", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});
