const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.querySelector("#loadMore");
const maxRecord = 151
const limit = 10;
let offset = 0;



// Os códigos abaixo, transforma as informações do pokemon em um HTML
// Caso nao venha nenhum pokemon, a lista virá vazia
// OBS.: join é um método de array, que transforma todos os elementos na array em uma string

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(
        (pokemon) => `
            <li class="pokemon ${pokemon.type}">
                  <span class="number">#${pokemon.number}</span>
                  <span class="name">${pokemon.name}</span>

                  <div class="datail">
                    <ol class="types">
                          ${pokemon.types
                            .map(
                              (type) => `<li class="type ${type}">${type}</li>`
                            )
                            .join("")}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                  </div>
            </li>

        `
      ).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);
loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit

  if(qtdRecordNextPage >= maxRecord){
    const newLimit = maxRecord - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
