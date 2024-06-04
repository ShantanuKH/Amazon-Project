
// Writing our code in object oriented programming




// In OOP we use PascalCase -> Start every word with a capital letter
// This copying will lead to alot of code so we will make function

function Cart(localStorageKey){
    // We gave parameter so that if we duplicate the object we should be able to give different data to operate on
    const cart = {
    

        // export let cart = undefined; 
        // // Shortcut -> let cart ; 
         cartItems: undefined,   // same as 'let cart = undefined;' in procedural programming 
    
    
         
     //'loadFromStorage: function()', given below is the Shorthand Method Syntax
    
    //  'this' gives us the object htat contains the function so instead of writing cart.cartItems we can write this.cartItems, So no matter whatever the variable name is of the object this code will always run even if we change the name of the variable, Here object name is 'cart'
    
    
     loadFromStorage(){
                this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));
                // If cart doesnt exist, We are giving the default value
                if(!this.cartItems){
                    this.cartItems=[{
                    // Here we are using a technique called normalizing the data,means with the peoductId itself we can get other information about the product
                    productId:
                    'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity:2,
                    deliveryOptionId:'1'
                },{
                    productId:
                    '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity:1,
                    deliveryOptionId:'2'
                }];
    
            }
        },
    
    
    
                //We created the function to store the data in the local storage so that every time we refresh or reopen the page then the idems we deleted should not come again as a default
                // localStorage can only store string so to convert the data to string we use JSON.stringify  
                // Name of first string whatever we want to save and the second string is the data we want to save
                saveToStorage(){
                    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    
        },
    
    
    
    
                    
                // Here, we are exporting the variable that we want to get out
    
                addToCart(productId){
                    // To see if the item is already present in the cart..if item is already present then it will increment by one and if not the item will be added to the cart
                    let matchingItem;
                    
                    this.cartItems.forEach((cartItem)=>{
                        if(productId===cartItem.productId){
                            matchingItem=cartItem;
                        }
                    });
    
                    if(matchingItem){
                        matchingItem.quantity +=1;
                    }else{
                        this.cartItems.push({
                            productId: productId,
                            quantity: 1,
                            deliveryOptionsId:'1'
                        });
    
                    }
    
                    this.saveToStorage();
                },
    
    
    
    
                    // This is a function in which we will remove all the id's which does not match our selected Id.
    
                    removeFromCart(productId){
                        const newCart =[];
    
                        this.cartItems.forEach((cartItem)=>{
                            if(cartItem.productId!== productId){
                                newCart.push(cartItem);
                            }
                        });
    
    
                        this.cartItems = newCart;
                        this.saveToStorage();
    
                    },
    
    
    
    
            // To update the deliveryOptionId and to update the page so that it should match the date on the top with the selected deliveryOptionId
    
            updateDeliveryOption(productId, deliveryOptionId ){
                let matchingItem;
    
                this.cartItems.forEach((cartItem)=>{
                    if(productId===cartItem.productId){
                        matchingItem=cartItem;
                    }
                });
    
                matchingItem.deliveryOptionId = deliveryOptionId;
    
                this.saveToStorage();
            }    
    
    
    };
    
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

//Local storage give string so we want to convert it to get the array of data, So we used JSON.parse
cart.loadFromStorage();

// We use OOP because it is easy to create multiple objects
// Given below is the example

// const businessCart = {
    

//     // export let cart = undefined; 
//     // // Shortcut -> let cart ; 
//      cartItems: undefined,   // same as 'let cart = undefined;' in procedural programming 


     
//  //'loadFromStorage: function()', given below is the Shorthand Method Syntax

// //  'this' gives us the object htat contains the function so instead of writing cart.cartItems we can write this.cartItems, So no matter whatever the variable name is of the object this code will always run even if we change the name of the variable, Here object name is 'cart'


//  loadFromStorage(){
//             this.cartItems=JSON.parse(localStorage.getItem('cart-business'));
//             // If cart doesnt exist, We are giving the default value
//             if(!this.cartItems){
//                 this.cartItems=[{
//                 // Here we are using a technique called normalizing the data,means with the peoductId itself we can get other information about the product
//                 productId:
//                 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//                 quantity:2,
//                 deliveryOptionId:'1'
//             },{
//                 productId:
//                 '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//                 quantity:1,
//                 deliveryOptionId:'2'
//             }];

//         }
//     },



//             //We created the function to store the data in the local storage so that every time we refresh or reopen the page then the idems we deleted should not come again as a default
//             // localStorage can only store string so to convert the data to string we use JSON.stringify  
//             // Name of first string whatever we want to save and the second string is the data we want to save
//             saveToStorage(){
//                 localStorage.setItem('cart-business', JSON.stringify(this.cartItems));

//     },




                
//             // Here, we are exporting the variable that we want to get out

//             addToCart(productId){
//                 // To see if the item is already present in the cart..if item is already present then it will increment by one and if not the item will be added to the cart
//                 let matchingItem;
                
//                 this.cartItems.forEach((cartItem)=>{
//                     if(productId===cartItem.productId){
//                         matchingItem=cartItem;
//                     }
//                 });

//                 if(matchingItem){
//                     matchingItem.quantity +=1;
//                 }else{
//                     this.cartItems.push({
//                         productId: productId,
//                         quantity: 1,
//                         deliveryOptionsId:'1'
//                     });

//                 }

//                 this.saveToStorage();
//             },




//                 // This is a function in which we will remove all the id's which does not match our selected Id.

//                 removeFromCart(productId){
//                     const newCart =[];

//                     this.cartItems.forEach((cartItem)=>{
//                         if(cartItem.productId!== productId){
//                             newCart.push(cartItem);
//                         }
//                     });


//                     this.cartItems = newCart;
//                     this.saveToStorage();

//                 },




//         // To update the deliveryOptionId and to update the page so that it should match the date on the top with the selected deliveryOptionId

//         updateDeliveryOption(productId, deliveryOptionId ){
//             let matchingItem;

//             this.cartItems.forEach((cartItem)=>{
//                 if(productId===cartItem.productId){
//                     matchingItem=cartItem;
//                 }
//             });

//             matchingItem.deliveryOptionId = deliveryOptionId;

//             this.saveToStorage();
//         }    


// };

// This copying will lead to alot of code so we will make function

//Local storage give string so we want to convert it to get the array of data, So we used JSON.parse
// cart.loadFromStorage();

// here we have created the fully seperate cart just by copying
businessCart.loadFromStorage();

// This is the basic idea about Object Oriented Programming, This is how the function is stored inside the object
// We use OOP because it is easy to create multiple objects
//OOP tries to represent the real world
console.log(cart);
console.log(businessCart);










