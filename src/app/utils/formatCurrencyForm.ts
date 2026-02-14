export function formatCurrencyForm(value: string | number) {
  if (typeof value === "number") {
    return value;
  }

  const sanitizedString = value
    .replace(/[^\d.,-]/g, "") 
    .replace(/\./g, "")      
    .replace(",", ".");      

  return Number(sanitizedString);
}
