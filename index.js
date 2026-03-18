//DESARROLLA AQUI TUS SOLUCIONES

//Ejercicios Pokémon
/*Ejercicio 1.- Declara una función getRandomPokemon que retorne un pokemon aleatorio.*/
async function getRandomPokemon() {
    try {
        let randomId = Math.floor(Math.random() * 1025) + 1;

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

        if (!response.ok) {
            throw new Error("Error al obtener el pokemon");
        }

        let data = await response.json();

        return data;

    } catch (error) {
        console.error("Ocurrió un error:", error);
        return null;
    }
}

getRandomPokemon().then(pokemon => { console.log(pokemon.name); });

/*Ejercicio 2.- Declara una funcion getImageAndName que retorne el nombre y 
la URL de la imagen de un pokemon => (return {img, name}) */
async function getImageAndName() {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/25`);

        if (!response.ok) {
            throw new Error("Error al obtener el pokemon");
        }

        let data = await response.json();

        let name = data.name;
        let img = data.sprites.front_default;

        return { name, img }
    } catch (error) {
        console.log("Ocurrió un error:", error);
        return null;
    }
}

/* Mostrar resultado por consola */
getImageAndName().then(pokemon => {
    if (pokemon) {
        console.log("Nombre:", pokemon.name);
        console.log("Imagen:", pokemon.img);
    } else {
        console.log("No se pudo obtener el pokemon");
    }
});

/*async function getImageAndName(pokemon) {

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let data = await response.json();
    let name = data.name;
    let img = data.sprites.front_default;
    return { name, img }

}*/

/*Ejercicio 3.- Declara una funcion printImageAndName que retorne el string necesario para pintar la 
imagen y el nombre del pokemon en el DOM de la siguiente forma:

<section>
    <img src="url de imagen" alt="nombre del pokemon">
    <h1>Nombre del pokemon</h1>
</section>
 */
async function printImageAndName() {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/25`);

        if (!response.ok) {
            throw new Error("Error al obtener el pokemon");
        }

        let data = await response.json();

        let card = `
            <section>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <h1>${data.name}</h1>
            </section>
        `;

        return document.getElementById("contain-pokemon").innerHTML += card;

    } catch (error) {
        console.log("Ocurrió un error:", error);
        return null;
    }
}

//Ejercicios Batalla entre Pokemon y perritos
/*Ejercicio 4.- Declara una función getRandomDogImage que retorne la url de la imagen de un perro aleatorio */
async function getRandomDogImage() {
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/image/random`);

        if (!response.ok) {
            throw new Error("Error al obtener el perro");
        }

        const data = await response.json();

        return data.message;

    } catch (error) {
        console.log("Ocurrió un error:", error);
        return null;
    }

}

getRandomDogImage().then(perro => console.log(perro));

/*Ejercicio 5.- Declara una función getRandomPokemonImage que retorne la url de la imagen de un pokemon 
aleatorio.*/
async function getRandomPokemonImage() {
    try {
        let pokemonRandom = Math.floor(Math.random() * 1025) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonRandom}`);

        if (!response.ok) {
            throw new Error("Error al obtener el pokemon");
        }

        const data = await response.json();

        return data.sprites.front_default;

    } catch (error) {
        console.log("Ocurrió un error:", error);
        return null;
    }
}

getRandomPokemonImage().then(pokemon => console.log(pokemon));

/*Ejercicio 6.- Declara una función printPugVsPikachu que pinte la batalla entre "Pug" y "Pikachu" 
(no se testea) */
async function printPugVsPikachu() {
    try {
        const perroResponse = await fetch(`https://dog.ceo/api/breed/pug/images/random`);

        if (!perroResponse.ok) {
            throw new Error("Error al obtener el pug");
        }

        const perroData = await perroResponse.json();



        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${25}`);

        if (!pokemonResponse.ok) {
            throw new Error("Error al obtener el pokemon");
        }

        const pokemonData = await pokemonResponse.json();


        const html = `
            <section>
                <h1>Pug VS Pikachu</h1>
                <img src="${perroData.message}" alt="pug">
                <img src="${pokemonData.sprites.front_default}" alt="pikachu">
            </section>
        `;

        document.getElementById("contain-pelea").innerHTML = html;

    } catch (error) {
        console.log("Ocurrió un error:", error);
        return null;
    }
}

printPugVsPikachu();


//Ejercicios con Rick and Morty
/*Ejercicio 7.- Declara una función getRandomCharacter que retorne un personaje aleatorio. */
async function getRandomCharacter() {

    try {

        let idPersonajeAleatorio = Math.floor(Math.random() * 826) + 1;

        const response = await fetch(`https://rickandmortyapi.com/api/character/${idPersonajeAleatorio}`);

        if (!response.ok) {
            throw new Error("Error al obtener el personaje");
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.log("Ocurrió un error:", error);
        return null;
    }
}

getRandomCharacter().then(personaje => console.log(personaje.name));

/*Ejercicio 8.- Declara una función getRandomCharacterInfo que retorne de un personaje su imagen, nombre,
episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, 
tendrás que hacer otro fetch para llegar a los ultimos datos. 
Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode}) */
async function getRandomCharacterInfo() {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/1`);

        if (!response.ok) {
            throw new Error("Error al obtener el personaje");
        }

        const data = await response.json();

        const img = data.image;
        const name = data.name;
        const episodes = data.episode.length;

        //Al ser un array de urls sacamos el primer episodio del array
        const firstEpisodeUrl = data.episode[0];
        //Lo guardamos aqui
        const episodeResponse = await fetch(firstEpisodeUrl);
        if (!episodeResponse.ok) {
            throw new Error("Error al obtener el episodio del personaje");
        }
        const episodeData = await episodeResponse.json();

        //Guardamos el nombre del primer episodio
        const firstEpisode = episodeData.name;
        const dateEpisode = episodeData.air_date;

        return { img, name, episodes, firstEpisode, dateEpisode };

    } catch (error) {
        console.log("Ocurrió un error:", error);
        return null;
    }
}

getRandomCharacterInfo().then(character => console.log(character));

/*Ejercicio 9.- Pinta los anteriores datos en el DOM (no se testea)*/
async function getRandomCharacterInfo() {
    try {
        let idPersonajeAleatorio = Math.floor(Math.random() * 826) + 1;

        const response = await fetch(`https://rickandmortyapi.com/api/character/${idPersonajeAleatorio}`);


        if (!response.ok) {
            throw new Error("Error al obtener el personaje");
        }

        const responseData = await response.json();

        const img = responseData.image;
        const name = responseData.name;
        const episodes = responseData.episode.length;

        const firstEpisodeUrl = responseData.episode[0];

        const episodeResponse = await fetch(firstEpisodeUrl);
        if (!episodeResponse.ok) {
            throw new Error("Error al obtener el episodio del personaje");
        }

        const episodeData = await episodeResponse.json();

        const firstEpisode = episodeData.name;
        const dateEpisode = episodeData.air_date;

        const printData = `
                <img src="${img}" alt="${name}">
                <h1>${name}</h1>
                <p>Episodios: ${episodes}</p>
                <p>Primer episodio: ${firstEpisode}</p>
                <p>Fecha de estreno: ${dateEpisode}</p>
        `;

        document.getElementById("datos-personaje").innerHTML += printData;

        return { img, name, episodes, firstEpisode, dateEpisode };



    } catch (error) {
        console.log("Ocurrió un error:", error);
        return null;
    }

}