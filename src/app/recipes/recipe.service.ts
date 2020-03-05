import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { DataAPI } from '../services/data-api.service';

@Injectable()
export class RecipeService {

    recipes: Recipe[] = [
        new Recipe({
            name: 'Kuvana spelta sa sirom i sunkom',
            description: 'lorem ipsum dolorem',
            imagePath: 'https://hronokuhinja.rs/wp-content/uploads/2014/09/Spelta-sa-svapskim-sirom-i-slaninom.jpg',
            ingredients: [],
            meal: ['breakfast']
        }),

        new Recipe({
            name: 'Junetina dinstana sa povrćem',
            description: 'lorem ipsum dolorem',
            imagePath: 'https://hronokuhinja.rs/wp-content/uploads/2017/06/Vojvodjanski-gulas-s.jpg',
            ingredients: [],
            meal: ['lunch']
        }),

        new Recipe({
            name: 'Belo meso sa grilovanim tikvicam',
            description: 'lorem ipsum dolorem',
            imagePath: 'https://hronokuhinja.rs/wp-content/uploads/2018/11/Kotleti-2-s.jpg',
            ingredients: [],
            meal: ['dinner']
        }),

        new Recipe({
            name: 'Tasty Schnitzel',
            description: 'A super-tasty Schnitzel - just awesome!',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            ingredients: [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ],
            meal: ['lunch']
        }),

        new Recipe({
            name: 'Big Fat Burger',
            description: 'What else you need to say?',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            ingredients: [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ],
            meal: ['dinner']
        }),
    ];

    recipesUpdated: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(this.recipes.slice());

    constructor(private slService: ShoppingListService,
                private dataAPI: DataAPI,
                ) { }

    getRecipes(): Observable<Recipe[]> {
        return this.dataAPI.getRecipes();

    }

    getRecipeById(id: string) {
        return this.recipes.find((recipe) => {
            return recipe.id === id;
        });
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addNewRecipe(recipe: Recipe) {
        this.recipes.unshift( new Recipe(recipe));
        this.recipesUpdated.next(this.recipes);
        this.dataAPI.postRecipe(recipe);
    }

    updateRecipe( updatedRecipe: Recipe) {
        // TODO: Assign new recipes
        this.recipes.forEach((recipe, i) => {
            if (recipe.id === updatedRecipe.id) {
                this.recipes[i] = <Recipe>updatedRecipe;
            }
        });
        console.log('this.recipes', this.recipes);
    }

    deleteRecipe(id: string) {
        this.recipes = this.recipes.filter((recipe) => {
            return recipe.id !== id;
        });
        this.recipesUpdated.next(this.recipes);
    }
}
