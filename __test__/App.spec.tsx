import App from "../src/App";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    screen.debug();
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("Hello World");
  });
});
