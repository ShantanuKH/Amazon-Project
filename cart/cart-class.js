
// Writing our code in object oriented programming, Now with class for even better understanding




// In OOP we use PascalCase -> Start every word with a capital letter
// This copying will lead to alot of code so we will make function

// class is basically the object generator

// Class contains properties and methods
class Cart {


    // This is how we add property to the class
    cartItems;
    localStorageKey;

    constructor(localStorageKey){

        // 'this' points to the object that we generate
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }



    loadFromStorage(){
            this.cartItems=JSON.parse(localStorage.getItem(this.localStorageKey));
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
        }

    saveToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));

}


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
        }


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

    }


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

}


// As we have defined localStorageKey as undefined we are using the same string 
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


//This below is the setup code, Instead of putting the code outside, just put it inside the constrctor so that whenever we made a new object it will run automatically

                // cart.loadFromStorage();
                // businessCart.loadFromStorage();

                // cart.localStorageKey = 'cart-oop';
                // businessCart.localStorageKey = 'cart-business';


// Each object that is created from a class is called as a instance of a class for example 'const cart', 'const businessCart'.



// Same as we did for OOP Object

console.log(cart);
console.log(businessCart);

// We can check if a object is a instance of a class

// Class is basically an object generator

console.log(businessCart instanceof Cart);










