import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from "../../cart/cart.js";


// Integrated Testing 
/* Here, We will test 

 1) How the page looks
 2) How the page behaves

*/


describe('test suite: renderOrderSummary', ()=>{


    const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';



    // This below code is called Hooks-> This ( 'beforeEach()' allows us to run the same code for each test before execution. 
    beforeEach(() => {


                // We mock this here too because it should not hamper our localStorage
                spyOn(localStorage, 'setItem');
        
                // This will take the HTML from orderSummary an will put in 'js-test-container' which is in 'orderSummaryTest.js'  
                document.querySelector('.js-test-container').innerHTML=`
                <div class="js-order-summary"></div>
                <div class="js-payment-summary"></div>
        
                `;
        
        
               //  As in the cart, everthing which is present in the localStorage by default, We need to mock the localStorage so that no error value should display
        
        
              
        
               spyOn(localStorage, 'getItem').and.callFake(() =>{
                   return JSON.stringify([{
                       productId:
                       productId1,
                       quantity:2,
                       deliveryOptionId:'1'
                   },{
                       productId:
                       productId2,
                       quantity:1,
                       deliveryOptionId:'2'
                   }]);
               });
        
               loadFromStorage();
               renderOrderSummary();

    });


    it('displays the cart', ()=>{

                expect(
                    document.querySelectorAll('.js-cart-item-container').length
                ).toEqual(2);

                // If there is many HTML inside and we want only specific content then this method of expect can be used.

                // Checked for productId1
                expect(
                    document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

                // Checked for productId2
                    expect(
                        document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');


                   
                        
                

                // We can write cleanUp code here too, But we wrote it in cleanUp code so not needed here
                // document.querySelector('.js-test-container').innerHTML='';


            
            
            });




    it('removes a product', ()=>{


                document.querySelector(`.js-delete-link-${productId1}`).click();

                expect(
                    document.querySelectorAll('.js-cart-item-container').length
                    ).toEqual(1);

                expect(
                    document.querySelector(`.js-cart-item-container-${productId1}`)
                    ).toEqual(null);

                expect(
                    document.querySelector(`.js-cart-item-container-${productId2}`)
                    ).not.toEqual(null);


                expect(cart.length).toEqual(1);

                expect(cart[0].productId).toEqual(productId2);

                // We can write cleanUp code here too, But we wrote it in cleanUp code so not needed here
                // document.querySelector('.js-test-container').innerHTML='';
            
        });


        // This is also a Hook -> This ( 'afterEach()' allows us to run the same code for each test after execution.
        // Say, This is a cleanUp code

         // We are giving this html as a empty string when we have completed the testing as when we render the orderSummary on the page its taking a lot of space above resulting it push the test results at the bottom so we are giving html as a empty string


       afterEach(()=>{
                   
                    document.querySelector('.js-test-container').innerHTML='';
        });

});