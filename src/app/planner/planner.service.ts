import { Injectable, OnInit } from '@angular/core';
import { DailyPlanner } from '../shared/models/daily-planner';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  plannerChange = new BehaviorSubject<DailyPlanner>({} as DailyPlanner);
  dailyPlanner: DailyPlanner = {} as DailyPlanner;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService
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
    console.log(this.dailyPlanner);
    this.plannerChange.next(this.dailyPlanner);
  }

  removeRecipe(meal: string, i: number) {
    //  Not The best practice but it works
    this.dailyPlanner[meal].splice(i, 1);
    this.plannerChange.next(this.dailyPlanner);
  }

  addRecipe(meal: string, recipe: Recipe) {
    this.dailyPlanner[meal].push(recipe);
    console.log('add recipe ', recipe)
    this.plannerChange.next(this.dailyPlanner);
  }

  /**
   * getPlanner( date, numOfDays ) {
   *    if (numOfDays == 1  && date == today() ) { return dailyPlanner for today }
   * }
   */
}
