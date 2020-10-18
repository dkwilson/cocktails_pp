// instantiate the classes
const ui = new UI(),
      cocktail = new CocktailsAPI(),
      cocktailDB = new CocktailDB();



//create the event listeners
function eventListeners(){
    //document ready
    document.addEventListener('DOMContentLoaded', documentReady)

    //add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }
    
    // the results div listeners
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv) {
        resultsDiv.addEventListener('click', resultsDelegation);
    }

}

eventListeners();


// get cocktails function
function getCocktails(e){
    e.preventDefault();

    const searchTerm = document.querySelector('#search').value;

    //check something is on the search input
    if(searchTerm === '') {
        ui.printMessage('Please add a cocktail name', 'danger');
    } else {

        //server response from promise 
        let serverResponse;

        // type of search (ingredients, cocktail, or name)
        const type = document.querySelector('#type').value;

        //evaluate the type of method and then execute the query

        switch(type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                break;
            case 'category':
                serverResponse = cocktail.getDrinksByCategory(searchTerm);
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol(searchTerm);
                break;

        }

        ui.clearResults();

        //query by the name of the drink
        serverResponse
            .then(cocktails => {
                if(cocktails.cocktails.drinks === null) {
                    ui.printMessage(`There are no results for this term. Pleast try another one.`, 'danger');
                } else {
                    if (type === 'name'){ 
                        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                    } else {
                        //display without ingredients (category, alcohol, ingredients)
                        ui.displayDrinks(cocktails.cocktails.drinks)
                    }
                }
            })
    }
    
}

function resultsDelegation(e){
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')) {
         cocktail.getSingleRecipe(e.target.dataset.id)
            .then(recipe => {
                ui.displaySingleRecipe(recipe.recipe.drinks[0]);
            })
    }

    // favoriate btn is clicked
    if (e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')) {
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            cocktailDB.removeFromDB(e.target.dataset.id);
        } else {
            //add the class
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            const cardBody = e.target.parentElement;

            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }

            // add to local storage  
            cocktailDB.saveIntoDB(drinkInfo);        
        }
    }

}

//document ready
function documentReady(){
    // display favorites on load
    ui.isFavorite();

    //select the search category select
    const searchCategory = document.querySelector('.search-category');

    if(searchCategory){
        ui.displayCategories();
    }


    // when favorites page opens
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable) {
        // get the drinks from storage and display them
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);

        // when view of delete are clicked
        favoritesTable.addEventListener('click', (e) => {
            e.preventDefault();

            if(e.target.classList.contains('get-recipe')) {
                cocktail.getSingleRecipe(e.target.dataset.id)
                    .then(recipe => {
                        ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                    })
            }

            if(e.target.classList.contains('remove-recipe')) {
                ui.removeFavorite(e.target.parentElement.parentElement);

                cocktailDB.removeFromDB(e.target.dataset.id);
            }
        })
    }
}