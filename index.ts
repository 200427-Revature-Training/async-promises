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


/*  Promises
 * A promise is really just a object that accepts a callback function when created.
 * The callback function takes two arguments which are functions which can be invoked
 * to determine whether the asynchronous action succeeds or fails.  We can put any
 * kind of async task within this callback function.
 */

function writeFilePromise(name: string, data: string): Promise<string> {
    // Create a promise
    const promise = new Promise<string>((resolve, reject) => {

        // Asynchronous action
        fs.writeFile(`./pokemon/${name}.json`, data, (err) => {
            if (err) {
                reject();
            } else {
                resolve(name);
            }
        })
    });

    // Promise is returned
    return promise;
}

function processPokeApiResponse(response): Promise<string> {
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
            return writeFilePromise(name, json);
}


function getPokemon(pokemonName: string) {
    axios
    .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
        return processPokeApiResponse(response)
    }).then(result => {
        console.log('Successful wrote record for ' + result);
    }).catch(rejection => {
        if (rejection.response) {
            console.log(rejection.response.status);
        } else {
            console.log('Write file failure');
        }
    });
}


getPokemon('bulbasaur')