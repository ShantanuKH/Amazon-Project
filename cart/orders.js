export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order){

    orders.unshift(order);  //Using unshift will save the new order in front of array instead of back
    saveToStorage();
}


// To store the order in the local storage
function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}