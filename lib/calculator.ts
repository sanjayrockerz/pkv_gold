export function calculateGoldValue(weightGrams: number, ratePerGram: number) {
  return Math.round(Math.max(0, weightGrams) * Math.max(0, ratePerGram));
}

export function formatIndianRupees(value: number) {
  return new Intl.NumberFormat('en-IN').format(value);
}
