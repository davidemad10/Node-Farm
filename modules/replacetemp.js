module.exports = (temp, product) => {
  let output = temp.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
