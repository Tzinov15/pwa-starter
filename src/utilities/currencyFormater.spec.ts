import { formatCurrency, cleanCurrency } from "./currencyFormater";

describe("Should return clean currency under all cases", () => {
  describe("Returns correctly under normal cases", () => {
    it("Regular number", () => {
      expect(cleanCurrency("$5,000")).toEqual(5000);
    });

    it("Regular with no commas", () => {
      expect(cleanCurrency("$500")).toEqual(500);
    });

    it("Regular with no dollar sign", () => {
      expect(cleanCurrency("400")).toEqual(400);
    });

    it("edge case", () => {
      expect(cleanCurrency("hello")).toEqual(0);
    });
  });
});

describe("Should format currency under all cases", () => {
  describe("Should correctly handle normal input cases", () => {
    it("Normal input number only", () => {
      const input = "5";
      expect(formatCurrency(input, 5)).toEqual("$5");
    });

    it("Normal input number with dollar sign", () => {
      const input = "$5";
      expect(formatCurrency(input, 5)).toEqual("$5");
    });

    it("Normal input number without commas", () => {
      const input = "5000";
      expect(formatCurrency(input, 5)).toEqual("$5,000");
    });

    it("Normal input number with commas", () => {
      const input = "5,000";
      expect(formatCurrency(input, 5)).toEqual("$5,000");
    });

    it("Too long input", () => {
      const input = "$500,000";
      expect(formatCurrency(input, 5)).toEqual("$50,000");
    });
  });
  describe("Should correctly handle null/incorrect input cases", () => {
    it("Non string", () => {
      const input = 5;
      // @ts-ignore
      expect(formatCurrency(input, 5)).toEqual("$");
    });
    it("Empty string", () => {
      const input = "";
      expect(formatCurrency(input, 5)).toEqual("$");
    });

    it("Empty string with multiple spaces", () => {
      const input = " ";
      expect(formatCurrency(input, 5)).toEqual("$");
    });
    it("Non number", () => {
      const input = "heloworld";
      expect(formatCurrency(input, 5)).toEqual("$");
    });

    it("Single dollar sign", () => {
      const input = "$$";
      expect(formatCurrency(input, 5)).toEqual("$");
    });

    it("Minus sign -", () => {
      const input = "-";
      expect(formatCurrency(input, 5)).toEqual("$");
    });
  });
});
