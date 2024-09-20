export function addCommasEveryNDigits(value: number, n: number) {
  const regex = new RegExp(`\\B(?=(\\d{${n}})+(?!\\d))`, "g");
  return value.toString().replace(regex, ",");
}

export const formatValue = (value: number) => addCommasEveryNDigits(value,3);
