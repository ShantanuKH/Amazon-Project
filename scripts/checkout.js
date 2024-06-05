import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../cart/cart-class.js';
// import '../backend/backend-practice.js';
import { loadProducts, loadProductFetch } from "./products-data.js";

import { loadCart } from "../cart/cart.js";




// We use 'async' so that we can use the function 'await' and by doing so we can reduce the size of the code and make our code look cleaner

/*
// Error handling in async
try{

}catch{

}
*/

async function loadPage(){
    try{

        // throw 'error1'; -> these are used to throw exception willingly/manually, It will skip the below code and directly go to catch block

        await loadProductFetch();

       const value =  await new Promise((resolve, reject)=>{        
            loadCart(()=>{                     
                resolve('value3');
                // reject('error2'); reject is used inside promises to throw error in the future, Wec can say that after the function runs
            });
        });
    } catch(error) {
        console.log('Unexpected Error. Please try again later');
    }

    renderOrderSummary();                 
    renderPaymentSummary();
}
loadPage();

















// Here we use Promises

/*

// We are using fetch() in product.js instead of call back, So modified version of the code in checkout.js is here

Promise.all([
    loadProductFetch(),   
        new Promise((resolve)=>{        
            loadCart(()=>{                     
                resolve();
            });
        })  
    ]).then(()=>{
        renderOrderSummary();                 
        renderPaymentSummary();
        // This renderOrderSummary(); and renderPaymentSummary(); will be stored in the parameter 'fun' of loadProduct which is in product-data.js file so that these function will be called after loading the response and we do not have to wait for the response

    });
    

*/





// To know more about Promises,Read the explaination given below why we used promise instead of callbacks 

/*

// To  run both (loadProducts() and loadCart() ) at the same time JavaScript Provides a function called 'Promise.all();' , This let us run multiple promises at a same time

Promise.all([
        
    new Promise((resolve)=>{
    
        // In this step we load the product and then we waits to finishing loading and then go to next step which is renderOrderSummary(); and renderPaymentSummary();
        loadProducts(()=>{                         //Step 1
                resolve();                         //resolve() wait for the response before going to the next step
            });
    
        }),
    
        new Promise((resolve)=>{        //Step 2
            loadCart(()=>{                     //resolve() wait for the response before going to the next step
                resolve();
            });
        })  
    ]).then(()=>{
        renderOrderSummary();                  //Step 3
        renderPaymentSummary();
        // This renderOrderSummary(); and renderPaymentSummary(); will be stored in the parameter 'fun' of loadProduct which is in product-data.js file so that these function will be called after loading the response and we do not have to wait for the response

    });
    
*/


// Here we use callbacks

/*

            // Given below shows how nesting occurs by not using promises, Better practice is to use promises instead of callbacks

            // These are callbacks
            loadProducts(()=>{
                loadCart(()=>{
                    renderOrderSummary();
                    renderPaymentSummary();
                });
            });

            
*/




// By using promises instead of callbacks, we can avoid nesting multiple functions inside each other. This nesting can get messy if we have lots of functions. Promises help us keep our code organized and tidy by flattening it out, like we did below




/*
        new Promise((resolve)=>{
        
            // In this step we load the product and then we waits to finishing loading and then go to next step which is renderOrderSummary(); and renderPaymentSummary();
            loadProducts(()=>{                         //Step 1
                    resolve();                         //resolve() wait for the response before going to the next step
                });

            }).then(()=>{
                // We cannot put resolve directly in the then function so we made new Product function and repeat the same step to write the functions
                return new Promise((resolve)=>{        //Step 2
                    loadCart(()=>{                     //resolve() wait for the response before going to the next step
                        resolve();
                    });
                })  

            }).then(()=>{
                renderOrderSummary();                  //Step 3
                renderPaymentSummary();
            });

        */







