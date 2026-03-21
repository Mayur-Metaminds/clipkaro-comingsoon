type FormatType = "number" | "currency" | "compact" | "currencyCompact";

export const formatValue = (
  value: unknown,
  type: FormatType = "number"
): string => {
  const num = Number(value);

  if (!Number.isFinite(num)) {
    return type.includes("currency") ? "₹0" : "0";
  }

  if (type === "currency") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(num);
  }

  if (type === "currencyCompact") {
    return (
      "₹" +
      new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(num)
    );
  }

  if (type === "compact") {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  }

  return num.toString();
};
