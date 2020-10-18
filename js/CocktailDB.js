class CocktailDB {
    getFromDB() {
        let drinks;

        //return recipes form localstorage

        if(localStorage.getItem('drinks') === null) {
            drinks = [];
        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'))
        }
        return drinks;
    }

    //remove id from local storage
    removeFromDB(id) {
        const drinks = this.getFromDB();

        // loops
        drinks.forEach((drink, index) => {
            if(id === drink.id) {
                drinks.splice(index, 1);
            }
        });

        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    //save the recipes into local storage
    saveIntoDB(drink) {
        const drinks = this.getFromDB();

        drinks.push(drink);

        // add the new array into the localstorage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }
}