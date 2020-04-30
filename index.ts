// Module import (ES6 import)
import axios from 'axios';
const fs = require('fs');

/*  Axios is a module for sending HTTP requests */

/* How to handle promises - Many async methods will return a promise
Promises are chained with handling operations. A successfully resolving promise
will execute logic provided in a .then() chained method.  A rejected promise 
will execute logic provided in a .catch() chained method.*/

interface Pokemon {
    name: string;
    id: number;
    types: [{
        type: {
            name: string
        }
    }];
    sprites: {
        front_default: string
    }
}

axios
    .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/25`)
    .then(response => {
        // response data:
        // status code - (200 OK)
        // headers: key-value pairs
        // body (data): raw response data
        
        // extract data from response object
        const payload: Pokemon = response.data;
        
        // Copy data we are interested in to a new object
        const pokemonData: Pokemon = {
            id: payload.id,
            name: payload.name,
            sprites: {
                front_default: payload.sprites.front_default
            },
            types: payload.types
        }

        // Get pokemon name so we can easily interpolate in the template literals
        const name = payload.name;

        const json = JSON.stringify(pokemonData);

        // Write pokemon data to a file
        fs.writeFile(`./pokemon/${name}.json`, json, () => {
            console.log(`${name} data written to file!`);
        });

    }).catch(rejection => {
        console.log(rejection.response.status);
    });