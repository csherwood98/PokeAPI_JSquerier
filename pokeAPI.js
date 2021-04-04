let cardCounter = 0;
const typeToColor = {
    "normal" : "#A8A77A",
    "fire" : "#EE8130",
    "water" : "#6390F0",
    "electric" : "#F7D02C",
    "grass" : "#7AC74C",
    "ice" : "#96D9D6",
    "fighting" : "#C22E28",
    "poison" : "#A33EA1",
    "ground" : "#E2BF65",
    "flying" : "#A98FF3",
    "psychic" : "#F95587",
    "bug" : "#A6B91A",
    "rock" : "#B6A136",
    "ghost" : "#735797",
    "dragon" : "#6F35FC",
    "dark" : "#705746",
    "steel" : "#B7B7CE",
    "fairy" : "#D685AD"
}

const form = document.querySelector('#selectForm');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const inputName = form.elements.inputText.value;
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputName}`)
    console.log(res.data);
    const pokedexres = await axios.get(`${res.data.species.url}`)
    console.log(pokedexres.data)
    populateCard(res.data, pokedexres.data);

})

function populateCard(pokemon, pokedex) {
    if (cardCounter % 4 === 0) {
        const row = document.createElement('DIV');
        row.className = "row justify-content-evenly";
        document.body.appendChild(row);
    }
    cardCounter += 1;
    const myCard = document.createElement('DIV');
    myCard.className = "card col-2";
    const pokemonMainType = pokemon.types[0].type.name;
    const typeColor = typeToColor[pokemonMainType];
    myCard.style.backgroundColor = typeColor;
    if (pokemon.types[1] != null) {
        const pokemonSecondaryType = pokemon.types[1].type.name;
        const secondaryTypeColor = typeToColor[pokemonSecondaryType];
        myCard.style.borderWidth = "5px";
        myCard.style.borderColor = secondaryTypeColor;
    }


    const mySprite = document.createElement('IMG');
    mySprite.className="card-img-top";
    mySprite.src = pokemon.sprites.front_default;
    mySprite.style.backgroundColor = "white";
    myCard.appendChild(mySprite);
    
    const myCardBody = document.createElement('DIV');
    myCardBody.className="card-body";
    myCard.appendChild(myCardBody);

    const myName = document.createElement('h5');
    myName.className = "card-title";
    const pokemonName = pokemon.species.name;
    const pokemonNameCap = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    myName.textContent = pokemonNameCap;
    myCardBody.appendChild(myName);

    const myDexEntry = document.createElement('p');
    myDexEntry.className = "card-text";
    myDexEntry.textContent = pokedex.flavor_text_entries[0].flavor_text;
    myCardBody.appendChild(myDexEntry);

    document.body.lastElementChild.appendChild(myCard);
}

