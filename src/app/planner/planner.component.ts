import { Component, OnInit, ViewContainerRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DailyPlanner } from './../shared/models/daily-planner';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { PlannerService } from './_services/planner.service';
import { DataAPI } from '../services/data-api.service';
import { MealTypes } from './_models/meal.types';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss']
})
export class PlannerComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  date: number = Date.now();
  dropdownRecipeList$: Observable<Recipe[]>;
  planner: DailyPlanner = null;

  selectedLayout = 0;
  plannerLayoutList = [
    { name: 'Daily' },
    { name: 'Weekly' },
    { name: 'Monthly' }
  ];

  @ViewChildren('placeholderRef', { read: ViewContainerRef }) placeholderRefs: QueryList<ViewContainerRef>;

  constructor(private recipeService: RecipeService,
    private plannerService: PlannerService,
    private api: DataAPI,
  ) { }


  ngOnInit() {
    this.dropdownRecipeList$ = this.recipeService.getRecipes();

    this.plannerService.plannerChange.pipe(takeUntil(this.unsubscribe$)).subscribe((planner: DailyPlanner) => {
      this.planner = planner;
    });
  }



  // Ingredients from planner to Shopping List
  addToShoppingList() {
    this.plannerService.addIngredientsToShoppingList();
  }

  removeRecipe( recipe: Recipe, meal: MealTypes) {
    this.api.removeRecipeFromPlanner(recipe, meal).then(resp => {
      console.log('remove recipe resp', resp);
    });
  }

  addRecipe(addedRecipe: {recipe: Recipe, meal: MealTypes}) {
    this.plannerService.addRecipe(addedRecipe.meal, addedRecipe.recipe);
    this.api.addRecipeToPlanner(addedRecipe.recipe, addedRecipe.meal);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
