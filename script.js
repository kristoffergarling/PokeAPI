const form = document.getElementById('pokemon-form');
const userInput = document.getElementById('user-input');
const pokemonImage = document.getElementById('pokemon-img');

const def = document.getElementById('default');
const shiny = document.getElementById('shiny');
const reverse = document.getElementById('reverse');

const url = 'https://pokeapi.co/api/v2/pokemon/';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url + userInput.value.toLowerCase())
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setValues(data);
        setButtonListeners(data);
        enableReverse(data);
    })
});

const setValues = (pokemon) => {
    pokemonImage.src = pokemon.sprites.front_default;
    document.getElementById('name').innerHTML = `${capitalizeFirstLetter(pokemon.name)} (${pokemon.id})`;
    document.getElementById('height').innerHTML = `${pokemon.height}`;
    document.getElementById('weight').innerHTML = `${pokemon.weight}`;
    document.getElementById('hp').innerHTML = `${pokemon.stats[5].base_stat}`;
    document.getElementById('attack').innerHTML = `${pokemon.stats[4].base_stat}`;
    document.getElementById('defense').innerHTML = `${pokemon.stats[3].base_stat}`;
    document.getElementById('base-experience').innerHTML = `${pokemon.base_experience}`;
}

const setButtonListeners = (pokemon) => {
    def.addEventListener('click', () => {
        pokemonImage.src = pokemon.sprites.front_default;
    });

    shiny.addEventListener('click', () => {
        pokemonImage.src = pokemon.sprites.front_shiny;
    });
}

const enableReverse = (pokemon) => {
    reverse.addEventListener('click', () => {
        //Following two if statements control the Default Image
       if (pokemonImage.src === pokemon.sprites.front_default) {
           pokemonImage.src = pokemon.sprites.back_default;
           return;
       }
       if (pokemonImage.src === pokemon.sprites.back_default) {
        pokemonImage.src = pokemon.sprites.front_default;
        return;
       }

        //Following two if statements control the Shiny Image
        if (pokemonImage.src === pokemon.sprites.front_shiny) {
            pokemonImage.src = pokemon.sprites.back_shiny;
            return;
        }
        if (pokemonImage.src === pokemon.sprites.back_shiny) {
         pokemonImage.src = pokemon.sprites.front_shiny;
         return;
        }
    });
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}