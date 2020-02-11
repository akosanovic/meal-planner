import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from './../recipes/recipe.model';
import { DailyPlanner } from '../shared/models/daily-planner';



@Injectable()
export class DataAPI {
  readonly url = 'https://chronoplanner.firebaseio.com/';
  readonly recipeUrl = this.url + 'recipes.json';
  readonly plannerUrl = this.url + 'planner.json';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<{[key: string]: Recipe}> {
    return this.http.get<{[keyId: string]: Recipe}>(this.recipeUrl);
  }

  postRecipe(recipe: Recipe): void {
    this.http.post<Recipe>(this.recipeUrl, recipe).subscribe();
  }

  postDailyPlanner(dailyPlanner) {
    this.http.post(this.plannerUrl, dailyPlanner).pipe(tap(resp => {
      console.log('post daily planner resp ', dailyPlanner);
    }));
  }

  getDailyPlanner(): Observable<DailyPlanner> {
    return this.http.get<{[key: string]: DailyPlanner}>(this.plannerUrl).pipe(map(resp => {
      console.log('getDailyPlanner', resp);
      for (const key in resp) {
        if (resp.hasOwnProperty(key)) {
          return {...resp[key], id: key };
        }
      }
    }));
  }
}
