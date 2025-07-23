document.getElementById("searchBtn").addEventListener("click", fetchData);
document.getElementById("randomBtn").addEventListener("click", fetchRandom);
document.getElementById("pokemonName").addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchData();
});

async function fetchData() {
  const nameInput = document.getElementById("pokemonName").value.trim().toLowerCase();
  if (!nameInput) return;
  displayPokemon(nameInput);
}

async function fetchRandom() {
  const randomId = Math.floor(Math.random() * 898) + 1; // 898 is Gen 8 limit
  displayPokemon(randomId);
}

async function displayPokemon(pokemon) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!res.ok) throw new Error("Pokémon not found");
    const data = await res.json();

    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const speciesData = await speciesRes.json();

    const englishEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );

    document.getElementById("pokemonSprite").src = data.sprites.front_default;
    document.getElementById("pokemonTitle").textContent = capitalize(data.name);
    document.getElementById("pokemonId").textContent = data.id;
    document.getElementById("pokemonHeight").textContent = `${data.height / 10} m`;
    document.getElementById("pokemonWeight").textContent = `${data.weight / 10} kg`;
    document.getElementById("pokemonTypes").textContent = data.types
      .map((t) => capitalize(t.type.name))
      .join(", ");
    document.getElementById("pokemonDescription").textContent = englishEntry
      ? englishEntry.flavor_text.replace(/\f|\n|\r/g, " ")
      : "No description available.";

    document.getElementById("result").classList.remove("hidden");
  } catch (err) {
    alert("Pokémon not found. Please try a different name.");
    console.error(err);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
