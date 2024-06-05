import {cart} from '../../cart/cart.js'
import { getProduct } from '../products-data.js';
import { getDeliveryOption } from '../../cart/deliveryOptions.js';
import { addOrder } from '../../cart/orders.js';





// We wrote this function to get the total amount of the items
// We first get the product by productId and then multiply the priceCents and quantity of the product to get the total priceCents of the product
export function renderPaymentSummary(){


    // Considering initial cost/amount as 0 Rs
    let productpriceCents = 0;
    let shippingpriceCents = 0;


    cart.forEach((cartItem) =>{
        const product = getProduct(cartItem.productId);
        productpriceCents += product.priceCents * cartItem.quantity


        // Now we will calculate the shipping cost
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingpriceCents += deliveryOption.priceCents;

    });



    // Total amount before tax is productpriceCents + shippingpriceCents
    const totalBeforeTax = productpriceCents + shippingpriceCents ;

 // Total tax is 10% so 10/100 => 0.1, We can multiply by 0.1 to calculate the 10% tax
    let tax = totalBeforeTax * 0.1;
    tax = tax.toFixed(2); // limit the decimal places to 2

    // Total priceCents of the cart will be totalBeforeTax + tax
    const totalpriceCents = parseFloat(totalBeforeTax) + parseFloat(tax); // limit the decimal places to 2 and convert back to number
    
    

    const paymentSummaryHTML =
    
    `
     <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Total price:</div>
            <div class="payment-summary-money">INR ${productpriceCents}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">INR ${shippingpriceCents}</div>
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
            <div class="payment-summary-money">INR ${totalpriceCents}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
            
            `;



     document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;






    //  Important to understand to know how real website works

    //  On clicking 'Place your order'    
    //  By implementing the below code, We will get the order object from the backend

    // This will send the request to the backend to create the and then backend will send the data to our computer
     document.querySelector('.js-place-order').addEventListener('click', async()=>{

        try{

            const response = await fetch('https://supersimplebackend.dev/orders', {
                method:'POST',
                headers: //headers give backend more information about our request
                {                
                    'Content-Type': 'application/json' 
                },
    
                // We have to convert the object into string as we are sending data to the server, So we used JSON.stringify
                body: JSON.stringify(
                {
                    cart: cart
                })
            });
    
            // To get the data which is attach to the response we need to use response.json(), response.json() is also a promise so we can use await 
            const order = await response.json();
            addOrder(order);

        }
        catch(error){
            console.log('Unexpected Error. Try again later')
        }

        window.location.href = 'orders.html'  // This changes the URL of the page to 'order.html' whenever we click on the 'Place your order' Button

     });


};




