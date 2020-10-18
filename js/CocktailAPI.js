class CocktailsAPI {
    async getDrinksByName(name){
        //search by name 
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        //returns response
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }

    // get recipes by ingredient

    async getDrinksByIngredient(ingredient){

        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const cocktails = await apiResponse.json();

        return {cocktails};
    }

    // get single recipe
    async getSingleRecipe(id){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const recipe = await apiResponse.json();

        return {recipe};
    }

    // retrieves all categories from the REST
    async getCategories(){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

        const categories = await apiResponse.json();

        return {categories};
    }

    // get drinks by category
    async getDrinksByCategory(category){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        const cocktails = await apiResponse.json();

        return {cocktails};
    }

    // get alcoholic or non-alcoholic drinks
    async getDrinksByAlcohol(term){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);

        const cocktails = await apiResponse.json();

        return {
            cocktails
        };
    }


}