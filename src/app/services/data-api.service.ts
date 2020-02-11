import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataAPI {
  readonly url = 'https://chronoplanner.firebaseio.com/';
  readonly recipeUrl = this.url + 'recipes.json';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<{[key: string]: Recipe}> {
    return this.http.get<{[keyId: string]: Recipe}>(this.recipeUrl);
  }

  postRecipe(recipe: Recipe): void {
    this.http.post<Recipe>(this.recipeUrl, recipe).subscribe();
  }

}
