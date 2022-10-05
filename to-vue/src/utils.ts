export function getCurrency(price: number) {
  let finalPrice = "";
  let stringPrice = price + "";
  let decimal = ".00";

  if (price % 1 != 0) {
    decimal = "." + stringPrice.split(".")[1];
    stringPrice = Math.trunc(+stringPrice) + "";
    decimal.length < 3 ? (decimal += "0") : null;
  }

  let hasOtherThreeDigits = true;
  do {
    finalPrice = stringPrice.substring(stringPrice.length - 3) + finalPrice;

    if (stringPrice.length > 3) {
      stringPrice = stringPrice.substring(0, stringPrice.length - 3);
      finalPrice = "," + finalPrice;
    } else {
      hasOtherThreeDigits = false;
    }
  } while (hasOtherThreeDigits);

  return `$${finalPrice}${decimal}`;
}
