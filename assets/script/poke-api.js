


//Objeto
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};






// offset = 0 e limit = 10, significa que caso ninguem passe nada como argumento, esses serão os valores.
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => console.log(jsonBody.results))
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((pokemonsDetails) => Promise.all(pokemonsDetails))
    .catch((error) => console.log(error));
};

/*
EXPLICAÇÃO DO CÓDIGO ACIMA:
1. buscamos, através do fetch, a URL
2. a resposta desse requesição, acessamos o json
3. do json, pegamos o resultado
4. para esses "results", que é uma lista, tivemos que fazer um requesição para cada, utilizando o Promisse.all(), que me garante que o código só será executado quando pegar todos os detalhes do pokemon
 */
