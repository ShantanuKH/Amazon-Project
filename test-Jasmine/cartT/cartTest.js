import { addToCart,  cart, loadFromStorage} from "../../cart/cart.js";

// To create a test suite in Jasminw we use describe
// Test Suite -> Group of tests
describe('test suite: addtoCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

         // We are taking one of the product id and when we add the product to the cart the cart length will obvisiously increase by one so we are checking this test case here
         addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
         expect(cart.length).toEqual(1);
 
 
         // This checks how many times the localstorage.setItem is called in the code above
         // This method only works if the method(localStorage.setItem) is marked with spyOn
         // localStoage.SetItem is called only once
         expect(localStorage.setItem).toHaveBeenCalledTimes(1);
 
 
         // Checks that the first product is equal to the same productId or not
         expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
 
 
         // Checks that the first product we add to the cart the the quantity in the cart is 1 or not
         expect(cart[0].quantity).toEqual(2);
        

    });

    it('adds a new product to a cart', () => {

        // We are mocking the local storage so that the mocked value (the value we took for testing) should not affect the real working
        spyOn(localStorage, 'setItem');



        // Here we are using Mock feature of Jasmine, Mock handles Flaky test, Flaky test is a test that sometime passes and sometime not, mock let us make fake version and we can do anything that we want with the fake version
        
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([]);
        });

        loadFromStorage();

        // We are taking one of the product id and when we add the product to the cart the cart length will obvisiously increase by one so we are checking this test case here
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);


        // This checks how many times the localstorage.setItem is called in the code above
        // This method only works if the method(localStorage.setItem) is marked with spyOn
        // localStoage.SetItem is called only once
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);


        // Checks that the first product is equal to the same productId or not
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');


        // Checks that the first product we add to the cart the the quantity in the cart is 1 or not
        expect(cart[0].quantity).toEqual(1);
       
    });
}); 


 // To test this we have to make the html so that we can display it on html, but Jasmine provides us with the html so we just have to put "<script src="cartT/cartTest.js" type="module"></script>" in the html file (SpecsOrTestRunner.html file) provide by Jasmine