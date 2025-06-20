import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main sections", () => {
  render(<App />);
  // Ana sayfa başlıklarından birini kontrol et
  expect(
    screen.getByText(/Developer|About|Experience|Lab|Contact/i)
  ).toBeInTheDocument();
});
