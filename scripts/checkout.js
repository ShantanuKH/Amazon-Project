import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../cart/cart-class.js';
// import '../backend/backend-practice.js';
import { loadProducts } from "./products-data.js";


loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});


// This renderOrderSummary(); and renderPaymentSummary(); will be stored in the parameter fun of loadProduct which is in product-data.js file so that these function will be called after loading the response and we do not have to wait for the response


