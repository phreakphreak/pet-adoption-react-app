import { describe, it } from "vitest";
import { getVariable } from "../../src/utils";

describe("Test for env variables", () => {
  it("Get url access token", () => {
    const url = getVariable("VITE_PET_FINDER_TOKEN_URL");
    expect(url).toMatch(/petfinder/);
  });
});
