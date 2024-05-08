
fetchData();
async function fetchData(){
    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch new resource.");
        }
        const data = await response.json();
        const pokomonSprite = data.sprites.front_default;
        const imgElemenet = document.getElementById("pokomonSprite");
        
        imgElemenet.src = pokomonSprite;
        imgElemenet.style.display = "block";
    }

    catch(error){
        console.error(error);
    }
}