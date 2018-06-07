import { formatName } from "./helper-functions";

describe("formatName", () => {
  it("should remove spaces", () => {
    expect(formatName("remo ve al l the spac es")).toBe("removeallthespaces");
  });
  it("should change characters to lowercase", () => {
    expect(formatName("UppercAsE")).toBe("uppercase");
  });
  it("should remove special characters", () => {
    expect(
      formatName("specIAl character like `~!@#$%^&*()-_+={}[]:;|?/>.<,")
    ).toBe("specialcharacterlike");
  });
});
