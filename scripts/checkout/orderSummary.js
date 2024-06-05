import {cart, removeFromCart, updateDeliveryOption } from '../../cart/cart.js';
import{products, getProduct} from '../../scripts/products-data.js';
// Here we are importing ESM DayJS external library
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../cart/deliveryOptions.js'
import {renderPaymentSummary} from './paymentSummary.js';



// We wrote this function so that we can use it to update the page as soon as any event happend, There should not be any need of refreshing the page
export function renderOrderSummary(){

    let cartSummaryHTML ='';

    cart.forEach((cartItem) => {

        const productId=cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

                const today = dayjs();
                const deliveryDate = today.add(
                    deliveryOption.deliveryDays,
                    'days'
                );
                const dateString =  deliveryDate.format(
                    'dddd, MMMM D'
                );



    cartSummaryHTML+=

    `
    <div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${matchingProduct.id}" >
    <div class="delivery-date">
        Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-priceCents">
            INR ${matchingProduct.getpriceCents()} 
        </div>
        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
            Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}"
             data-product-id="${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
        </div>
    </div>
    </div>
    `;

    });


    function deliveryOptionsHTML(matchingProduct, cartItem){

        let html='';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString =  deliveryDate.format(
                'dddd, MMMM D'
            );

            const priceCentsString = deliveryOption.priceCents === 0 ? 'FREE' : `INR ${deliveryOption.priceCents} - `;


            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html+=

            `<div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked': '' }
                    class="delivery-option-input"
                    name="${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-priceCents">
                        ${priceCentsString} Shipping
                    </div>
                </div>
            </div> `
        });

        return html;
    }

    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{

            link.addEventListener('click', ()=>{
                const productId = link.dataset.productId;
                removeFromCart (productId);
                

            const container =  document.querySelector(`.js-cart-item-container-${productId}`
            );
            
            container.remove();
            renderPaymentSummary();
            
           
            
            });

    });
    

    

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click', ()=>{
            const{productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            

                // When function calls itself it is called as recursion and here we are using recursion   
                renderOrderSummary();

                
                renderPaymentSummary();
                
        }); 
    });

}    

