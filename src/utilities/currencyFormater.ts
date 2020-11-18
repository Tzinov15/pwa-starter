/*
Takes a currency and always returns that currency correct formatted
with the proper placement of commas for thousands and dollar sign at
beginning

*/
export const formatCurrency = (value: string, maxLength: number): string => {
  if (typeof value !== "string") return "$";
  if (value === "" || !value.replace(/\s/g, "").length) {
    return "$";
  }

  let valueWithoutCommasOrDollarSigns = value
    .replace(/,/g, "")
    .replace(/\$/g, "");
  if (valueWithoutCommasOrDollarSigns === "") return "$";
  if (valueWithoutCommasOrDollarSigns.length > maxLength) {
    valueWithoutCommasOrDollarSigns = valueWithoutCommasOrDollarSigns.slice(
      0,
      maxLength
    );
  }
  if (Number.isNaN(Number(valueWithoutCommasOrDollarSigns))) return "$";
  const cleanValue = Number(valueWithoutCommasOrDollarSigns);
  const valueWithCommas = cleanValue.toLocaleString();
  return "$" + valueWithCommas;
};

export const cleanCurrency = (value: string): number => {
  return Number(value.replace(/,/g, "").replace(/\$/g, "")) || 0;
};
