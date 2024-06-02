export const cart=[];
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


