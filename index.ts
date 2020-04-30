// Module import (ES6 import)
import axios from 'axios';

/*  Axios is a module for sending HTTP requests */

/* How to handle promises - Many async methods will return a promise
Promises are chained with handling operations. A successfully resolving promise
will execute logic provided in a .then() chained method.  A rejected promise 
will execute logic provided in a .catch() chained method.*/
axios
    .get(`https://pokeapi.co/api/v2/pokemon/pikachu`)
    .then(response => {
        // response data:
        // status code - (200 OK)
        // headers: key-value pairs
        // body (data): raw response data
        console.log(response);
    }).catch(rejection => {
        console.log(rejection.response.status);
    });