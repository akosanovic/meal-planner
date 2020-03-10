import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from './../recipes/recipe.model';
import { DailyPlanner } from '../shared/models/daily-planner';
import { AngularFireDatabase } from '@angular/fire/database';



@Injectable()
export class DataAPI {

  readonly currentDate = new Date();
  readonly todayKey = String(this.currentDate.getDate()) + // Day
    String(this.currentDate.getMonth() + 1) + // Month: jan == 0
    String(this.currentDate.getFullYear()); // FullYear: 2020

  constructor(private http: HttpClient,
    private db: AngularFireDatabase) {}

  getRecipes(): Observable<Recipe[]> {
    return this.db.list<Recipe>('recipes').valueChanges()
    // .pipe(tap(rec => console.log('get recipes ', rec)));
  }

  postRecipe(recipe: Recipe): void {
    this.db.list<Recipe>('recipes').push(recipe);
  }

  saveDailyPlanner(dailyPlanner: DailyPlanner, date = this.todayKey) {
    this.db.list('planner').set(date, dailyPlanner);
  }

  addRecipeToPlanner(recipe: Recipe, meal: 'breakfast' | 'lunch' | 'dinner', date = this.todayKey) {
    this.db.list(`planner/${date}/${meal}`).push(recipe);
  }

  getDailyPlanner(): Observable<DailyPlanner> {
    return this.db.object(`planner/${this.todayKey}`).valueChanges().pipe(map((payload) => {
      return new DailyPlanner(payload);
    }));
  }
}
