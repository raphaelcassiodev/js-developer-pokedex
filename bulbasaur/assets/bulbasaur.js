function getBulbasaurDatails(bulbasaurDatail) {
  const bulbasaur = new Bulbasaur();
  bulbasaur.name = bulbasaurDatail.name;
  const types = bulbasaurDatail.types.map((typeSlot) => {
    return typeSlot.type.name;
  });
  const [type] = types;
  bulbasaur.types = types;
  bulbasaur.type = type;
  bulbasaur.number = bulbasaurDatail.id;
  bulbasaur.height = bulbasaurDatail.height;
  bulbasaur.weight = bulbasaurDatail.weight;
  bulbasaur.photo = bulbasaurDatail.sprites.other.dream_world.front_default;
  bulbasaur.abilities = bulbasaurDatail.abilities.map((nameAbility) => {
    return nameAbility.ability.name;
  });
  console.log(bulbasaur.types);
  return bulbasaur;
}

function renderBulbasaurHTML(bulbasaur) {
  // Seleciona o container onde o HTML será inserido
  const container = document.querySelector(".conteiner");

  // Cria elementos HTML dinamicamente
  const bulbasaurHTML = `
     

      <header class="header">
      <span class="number">#${bulbasaur.number}</span>
      <h1>${bulbasaur.name}</h1>
      <ul>
       ${bulbasaur.types
         .map((type) => `<li class="type ${type}">${type}</li>`)
         .join("")}
      </ul>
      </header>

      <div class="div-img_bulbasaur">
        <img src="${bulbasaur.photo}" alt="${bulbasaur.name}">
      </div>



    <div class="content">
      <h2>About</h2>
      <ul class="aboutList">
        <li><span>Height:</span>${bulbasaur.height}</li>
        <li><span>Weight:</span>${bulbasaur.weight}</li>
        <li><span>Abilities:</span>${bulbasaur.abilities.join(", ")}</li>
      </ul>

    </div>
  
    `;

  // Insere o conteúdo no container
  container.innerHTML = bulbasaurHTML;
}

function getPokemonAbout() {
  const urlPokemon = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
  fetch(urlPokemon)
    .then((response) => response.json())
    .then((bulbasaurDatail) => {
      const bulbasaur = getBulbasaurDatails(bulbasaurDatail);
      renderBulbasaurHTML(bulbasaur);
    });
}

getPokemonAbout();
