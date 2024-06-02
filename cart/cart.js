export let cart=[{
    // Here we are using a technique called normalizing the data means with the peoductId itself we can get other information abot the product
    productId:
    'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
},{
    productId:
    '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
}



];
// Here, we are exporting the variable that we want to get out



export function addToCart(productId){
    // To see if the item is already present in the cart..if item is already present then it will increment by one and if not the item will be added to the cart
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
            matchingItem=cartItem;
        }
    });

    if(matchingItem){
        matchingItem.quantity +=1;
    }else{
        cart.push({
            productId: productId,
            quantity: 1
        });

          }
}




// This is a function in which we will remove all the id's which does not match our selected Id.

export function removeFromCart(productId){
    const newCart =[];

    cart.forEach((cartItem)=>{
        if(cartItem.productId!== productId){
            newCart.push(cartItem);
        }
    });


    cart = newCart;

};