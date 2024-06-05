//  XMLHttpRequest();  -> It is a built in class which is used to send HTML request to backend
const xhr = new XMLHttpRequest();



// We are putting this up of the request as first we have to set up the event listner and then trigger the event or say send the request



// xhr when send request it will need time to get the response as xhr is a asynchrounous code means it does not wait for the above code to complete and run the below code as soon as is typed and so we are giving an eventlistener to increase the waiting period
xhr.addEventListener('load', ()=> {
    console.log(xhr.response);
});   // First parameter is load means the response has loaded and the second parameter is the function that we want to run after the response is loaded



// To set up the request
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send(); // To send the response

// To get the response
// xhr.response



// To send request to different URL path
xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send();


xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send();


xhr.open('GET', 'https://supersimplebackend.dev/not-supported');
xhr.send();


xhr.open('GET', 'https://supersimplebackend.dev/documentation');
xhr.send();


xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
xhr.send();