import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DailyPlanner } from '../../shared/models/daily-planner';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { DataAPI } from '../../services/data-api.service';


@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  plannerChange = new BehaviorSubject<DailyPlanner>(null);
  dailyPlanner: Observable<DailyPlanner> = this.plannerChange.asObservable();
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private slService: ShoppingListService,
              private api: DataAPI,

  ) {

    this.api.getDailyPlanner().subscribe( (planner: DailyPlanner) => {
      console.log('on init', planner);
      this.plannerChange.next(planner);
    });

    // this.recipeService.recipesUpdated.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;

    //   this.plannerChange.next(initPlannerStore);
    // });
  }

  savePlanner() {
    const currentPlanner = this.plannerChange.getValue();
    this.api.saveDailyPlanner(currentPlanner);
  }


  removeRecipe(meal: string, deletedRecipe: Recipe) {
    const currentValue: DailyPlanner = this.plannerChange.getValue();

    return this.plannerChange.next(
      Object.assign( {}, currentValue,
        {[meal]: currentValue[meal].filter( (recipe: Recipe) => {
          return recipe.id !== deletedRecipe.id;
        })
      })
    );
  }


  addRecipe(meal: string, recipe: Recipe): void {
    const currentValue = this.plannerChange.getValue();
    currentValue[meal].push(recipe);
    this.plannerChange.next( currentValue );
  }

  // Pass all ingredients from current planner to Shopping List
  addIngredientsToShoppingList(): void {
    const ingredients: Ingredient[] = [];

    for (const recipe of this._dailyPlannerFlatList()) {
      ingredients.push(...recipe.ingredients);
    }

    this.slService.addIngredients( ingredients );
  }

  // Get current Planner flat list
  _dailyPlannerFlatList(): Recipe[] {
    const currentPlanner = this.plannerChange.getValue();
    const flatList: Recipe[] = [];

    for (const meal of Object.keys(currentPlanner)) {
      if (currentPlanner.hasOwnProperty(meal)) {
        flatList.push(...currentPlanner[meal]);
      }
    }
    return flatList;
  }
}
