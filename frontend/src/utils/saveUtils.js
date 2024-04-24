// saveUtils.js
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateSaveForLater = (state) => {
    const itemsPrice = state.saveForLaterItems.reduce(
      (acc, item) => acc + (item.price * 100 * item.qty) / 100,
      0
    );
    state.itemsPrice = addDecimals(itemsPrice);
  
    // Calculate the shipping price (you can adjust this logic as needed)
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    state.shippingPrice = addDecimals(shippingPrice);
  
    // Calculate the tax price (adjust this logic based on your requirements)
    const taxPrice = 0.15 * itemsPrice;
    state.taxPrice = addDecimals(taxPrice);
  
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    state.totalPrice = addDecimals(totalPrice);
  
    // Save the updated saveForLater items to localStorage
    localStorage.setItem("saveForLater", JSON.stringify(state));
  
    return state;
  };
  