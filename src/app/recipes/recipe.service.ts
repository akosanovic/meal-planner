import { DailyPlanner } from './../shared/models/daily-planner';
import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe(
      0,
      'Kuvana spelta sa sirom i sunkom',
      'lorem ipsum dolorem',
      'https://hronokuhinja.rs/wp-content/uploads/2014/09/Spelta-sa-svapskim-sirom-i-slaninom.jpg',
      [],
      'breakfast'
    ),
    new Recipe(
      1,
      'Junetina dinstana sa povrćem',
      'lorem ipsum',
      'https://hronokuhinja.rs/wp-content/uploads/2017/06/Vojvodjanski-gulas-s.jpg',
      [],
      'lunch'
    ),
    new Recipe(
      3,
      'Belo meso sa grilovanim tikvicam',
      'lorem ipsum,...',
      'https://hronokuhinja.rs/wp-content/uploads/2018/11/Kotleti-2-s.jpg',
      [],
      'dinner'
    ),
    new Recipe(
      5,
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ],
      'lunch'
      ),
    new Recipe(
      2,
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ],
      'dinner')
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.find( (recipe) => {
      return recipe.id === id;
    })
  }

  getDailyPlanner(): DailyPlanner {
    const dailyPlanner = {
      breakfast: [ this.recipes[0]],
      lunch: [],
      dinner: []
    };
    return dailyPlanner;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes = this.recipes.concat(recipe);
    console.log('recipes updated', this.recipes);
  }

  deleteRecipe(recipeToDelete: Recipe) {
    this.recipes = this.recipes.filter( (recipe) => {
      console.log(recipe.id !== recipe.id);

      return recipe.id !== recipeToDelete.id;
    });
    console.log('recipes ', this.recipes);
  }
}
