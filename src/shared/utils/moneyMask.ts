export const moneyMask = (num: number | undefined) =>
  num?.toLocaleString('en', {style: 'currency', currency: 'USD'});
