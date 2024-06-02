import{cart} from '../cart/cart.js';
// We are importing the cart.js file here
// ../cart/cart.js, Here, '..' is used to get out from the current folder and then (/cart/cart.js)write the path were the actual file is there which we want to import





// Storing the information of the product in an object
// This structures the data or say organizes the data , We can call it as data structure, Here we can call it as Data Structure which represents the list of data

// By generating HTML with JavaScript we do not need to write code again and again, We just need to add new data in the object and it will be added to our webpage


// We can add data like given below
/*
const products = [
    
    {
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
        stars:4.5,
        count: 87 
    },
    price: 915
    }, {
        image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
        stars:4,
        count: 127 
    },
    price: 1953
    }, {
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
        stars:4.5,
        count: 56 
    },
    price: 1495
    },
    {
        image: 'images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster - Black',
    rating: {
        stars:5,
        count: 1996
    },
    price: 2549.
    }

    ];
*/


// We can add the product one by one like we did in the above code but it will increase the size of the code, so to make code look clean , I made a seperate file "(product.js)" where all the details of products or say all the data is stored so we can import that file to get the objects 




// Consider we are having a lot of data so writing it again and again will not be appropriate and not feasible so we will loop through the array 
// Basically we are generalizing


    let productsHTML ='';
    products.forEach((products) => {
        // productsHTML = productsHTML + 
        // This is called Accumulator pattern
        productsHTML +=`
            <div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image"
                        src="${products.image}">
                    </div>

                    <div class="product-name limit-text-to-2-lines">
                       ${products.name}
                    </div>

                    <div class="product-rating-container">
                        <img class="product-rating-stars"
                        src="images/ratings/rating-${products.rating.stars * 10}.png">
                        <div class="product-rating-count link-primary">
                        ${products.rating.count}
                        </div>
                    </div>

                    <div class="product-price">
                        INR ${products.price}
                    </div>

                    <div class="product-quantity-container">
                        <select>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        </select>
                    </div>

                    <div class="product-spacer"></div>

                    <div class="added-to-cart">
                        <img src="images/icons/checkmark.png">
                        Added
                    </div>


                
                    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${products.id}">
                        Add to Cart
                    </button>
            </div>`;
           
    });

    // data-product-name="${products.name}, We wrote this to add data attribute....To add data attirbute just add 'data-' in front of any name


    // Data attribute is used to attch any information to an element

    // Here we attach the information of the product name so that whenever we click on 'Add to Cart'  button we will get the name and will know which product should be added to cart

    document.querySelector('.js-products-grid').innerHTML = productsHTML;


    // To add items to the Cart whenever we click on 'Add to Cart' button
    // To keep code clean all cart related code is written in 'cart.js' file
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () =>{
            // dataset attribute give all the data that is attach to the button
            // It will act like a object so to access it will can use object property
            const productId=button.dataset.productId;
            // Keep in mind that whenever we want to use data attribute, Here in this step word will chnage from kebeb-case to camel-case means  products-id -> productId



            // To see if the item is already present in the cart..if item is already present then it will increment by one and if not the item will be added to the cart
            let matchingItem;
            cart.forEach((item)=>{
                if(productId===item.productId){
                    matchingItem=item;
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
 


            let cartQuantity = 0;
            cart.forEach((item)=>{
                cartQuantity += item.quantity;
            });




            // Calculate total number of item and diplay in HTML cart whenever item is added to cart
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        } );
    });