// MARIA
// let app_id = "3a1d9b9d";
// let app_key = "ade5179ff305e4d120450c2e4c8ab99f";
//----------------------------------------------------------
// RICKY
let app_id = "6509142e";
let app_key = "b35d95159824854b9ec0a8b3c005bc9a";

//----------------------------------------------------------------------------------------

function displayPlates(data) {
    console.log(data);
    let plateArray = data.hits.map(hit => hit.recipe);

    plateArray = Shuffle(plateArray);

    let divContainer = document.querySelector("#results");
    divContainer.innerHTML = ' ';


    for (let i = 0; i < 12; i++) {
        let plates = plateArray[i];
        let card = document.createElement("div");
        card.classList.add(`card`);
        card.classList.add(`card${i + 1}`);

        let recipeName = document.createElement("h3");          // Name
        recipeName.textContent = plates.label;
        recipeName.classList.add("recipe-name");

        let recipeImg = document.createElement("img");          // Image
        recipeImg.src = plates.image;
        recipeImg.classList.add('recipe-image');

        let recipeIngr = document.createElement("ul");          // Ingredients
        plates.ingredientLines.forEach(ingr => {
            let li = document.createElement("li");
            li.textContent = ingr;
            recipeIngr.appendChild(li);
        });

        let recipeInter = document.createElement("div");        // Interactive (Link SbS & Fav)

        let recipeUrl = document.createElement("a");            // - SbS link
        recipeUrl.href = plates.url;
        recipeUrl.textContent = "Step by step 😋";
        recipeInter.appendChild(recipeUrl);

        let buttonFav = document.createElement("button");       // - Fav
        buttonFav.type = "button";
        buttonFav.id = plates.label;
        buttonFav.classList.add("fav-button");
        buttonFav.textContent = "Add to favorites";
        recipeInter.appendChild(buttonFav);

        //-------------------------- ADD & REMOVE FROM FAVORITES ----------------------------

        buttonFav.addEventListener("click", function () {
            let favoritePlates = [];

            if (localStorage.getItem("fav")) {
                favoritePlates = JSON.parse(localStorage.getItem("fav"));
            }

            if (favoritePlates.includes(this.id)) {
                favoritePlates = favoritePlates.filter(plate => plate !== this.id);
                this.textContent = "Add to favorites";
                alert(this.id + " has been removed from favorites!");
            } else {
                favoritePlates.push(this.id);
                alert(this.id + " has been added to favorites!");
                this.textContent = "Remove from favorites";
            }
            localStorage.setItem("fav", JSON.stringify(favoritePlates));

            let faves = document.querySelector("#favorites");
            faves.innerHTML = ' ';
            for (let i = 0; i < favoritePlates.length; i++) {
                let name = document.createElement("h3");
                name.textContent = favoritePlates[i];
                faves.appendChild(name);
            }
            
        })

        card.append(recipeName, recipeImg, recipeIngr, recipeInter);
        divContainer.appendChild(card);
    }
}

// -------------------------------------------------------------------------------------

function Shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j] = array[j], array[i]];
    }
    return array;
}

let button = document.querySelector("#btn");
button.addEventListener("click", function () {
    let query = document.querySelector("#ingredient").value;

    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`)
        .then(response => response.json())
        .then(data => displayPlates(data))
        .catch(error => {
            console.error("An error occurred:", error);
        });
});