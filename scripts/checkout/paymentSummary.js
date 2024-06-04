import {cart} from '../../cart/cart.js'
import { getProduct } from '../products-data.js';
import { getDeliveryOption } from '../../cart/deliveryOptions.js';





// We wrote this function to get the total amount of the items
// We first get the product by productId and then multiply the price and quantity of the product to get the total price of the product
export function renderPaymentSummary(){


    // Considering initial cost/amount as 0 Rs
    let productPrice = 0;
    let shippingPrice = 0;


    cart.forEach((cartItem) =>{
        const product = getProduct(cartItem.productId);
        productPrice += product.price * cartItem.quantity


        // Now we will calculate the shipping cost
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.price;

    });



    // Total amount before tax is productPrice + shippingPrice
    const totalBeforeTax = productPrice + shippingPrice ;

 // Total tax is 10% so 10/100 => 0.1, We can multiply by 0.1 to calculate the 10% tax
    let tax = totalBeforeTax * 0.1;
    tax = tax.toFixed(2); // limit the decimal places to 2

    // Total price of the cart will be totalBeforeTax + tax
    const totalPrice = parseFloat(totalBeforeTax) + parseFloat(tax); // limit the decimal places to 2 and convert back to number
    
    

    const paymentSummaryHTML =
    
    `
     <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">INR ${productPrice}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">INR ${shippingPrice}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">INR ${totalBeforeTax }</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">INR ${tax}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">INR ${totalPrice}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
            
            `;



     document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;


};




