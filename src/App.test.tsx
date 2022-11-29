import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the prompt to paste in a github repo", () => {
  render(<App />);
  const titleElement = screen.getByText(
    /Start by pasting the repository URL./i
  );
  expect(titleElement).toBeInTheDocument();
});
