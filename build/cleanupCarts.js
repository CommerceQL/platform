"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphcool_lib_1 = require("graphcool-lib");
module.exports = event => {
    const graphcool = graphcool_lib_1.fromEvent(event);
    const api = graphcool.api('simple/v1');
    const itemIds = event.data.Cart.node.items.map(i => i.id);
    const cartId = event.data.Cart.node.id;
    const deleteItems = itemIds
        .map(id => `${id}: deleteCartItem(id: "${id}") {
        id
      }`)
        .join('\n');
    const deleteCart = `${cartId}: deleteCart(id: "${cartId}") {
    id
  }`;
    const mutation = `
    mutation {
      ${deleteItems}
      ${deleteCart}
    }
  `;
    return api
        .request(mutation)
        .then(data => console.log(data))
        .catch(error => {
        console.log(error.response.errors);
        console.log(error.response.data);
        return { error: `Unexpected error: ${error}` };
    });
};
//# sourceMappingURL=cleanupCarts.js.map