import { Injectable, OnInit } from '@angular/core';
import { DailyPlanner } from '../shared/models/daily-planner';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  plannerChange = new BehaviorSubject<DailyPlanner>({} as DailyPlanner);
  dailyPlanner: DailyPlanner = {} as DailyPlanner;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private slService: ShoppingListService
  ) {

    this.recipeService.recipesUpdated.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.dailyPlanner = {
        breakfast: [recipes[0], recipes[1]],
        lunch: [recipes[1]],
        dinner: [recipes[2]]
      };
      this.plannerChange.next(this.dailyPlanner);
    });
  }


  getDailyPlanner() {
    this.plannerChange.next(this.dailyPlanner);
  }

  removeRecipe(meal: string, i: number) {
    //  Not The best practice but it works
    this.dailyPlanner[meal].splice(i, 1);
    this.plannerChange.next(this.dailyPlanner);
  }

  addRecipe(meal: string, recipe: Recipe) {
    this.dailyPlanner[meal].push(recipe);
    this.plannerChange.next(this.dailyPlanner);
  }

  // Pass all ingredients from current planner to Shopping List
  addIngredientsToShoppingList() {
    const ingredients: Ingredient[] = [];

    //  TODO: make a flat list of daily planner
    for (const meal of Object.keys(this.dailyPlanner)) {
      if (this.dailyPlanner.hasOwnProperty(meal)) {
        const recipes: Recipe[] = this.dailyPlanner[meal];

        for (const recipe of recipes) {
          console.log('ayoo', recipe);

          ingredients.push(...recipe.ingredients);
        }
      }
    }
    this.slService.addIngredients( ingredients );
  }
  /**
   * getPlanner( date, numOfDays ) {
   *    if (numOfDays == 1  && date == today() ) { return dailyPlanner for today }
   * }
   */
}
