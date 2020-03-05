import { Component, OnInit, ViewContainerRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DailyPlanner } from './../shared/models/daily-planner';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { PlannerService } from './_services/planner.service';
import { DataAPI } from '../services/data-api.service';

@Component({
    selector: 'app-planner',
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.scss']
})
export class PlannerComponent implements OnInit, OnDestroy {
    unsubscribe$ = new Subject();
    date: number = Date.now();
    dropdownRecipeList$: Observable<Recipe[]>;
    dailyPlanner: DailyPlanner = null;

    selectedLayout = 0;
    plannerLayoutList = [
      {name: 'Daily'},
      {name: 'Weekly'},
      {name: 'Monthly'}
    ];

    @ViewChildren('placeholderRef', { read: ViewContainerRef }) placeholderRefs: QueryList<ViewContainerRef>;

	constructor(private recipeService: RecipeService,
				private plannerService: PlannerService,
				private api: DataAPI,
    ) { }


    ngOnInit() {

        this.api.getDailyPlanner().subscribe( planner => {
          this.dailyPlanner =  planner;
        } );

        this.dropdownRecipeList$ = this.recipeService.getRecipes();

        // this.subscription = this.plannerService.plannerChange.subscribe((planner: DailyPlanner) => {
        //     this.dailyPlanner = planner;
        // });
    }

    objectKeys(obj) {
        return Object.keys(obj);
    }

    // Ingredients from planner to Shopping List
    addToShoppingList() {
      this.plannerService.addIngredientsToShoppingList();
    }

    saveChangesToDailyPlanner() {
      console.log('save planner');
      this.plannerService.savePlanner();
    }

    removeRecipe(meal: string, recipe: Recipe) {
        this.plannerService.removeRecipe(meal, recipe);
    }

    addRecipe(recipe: Recipe, meal: string) {
      this.plannerService.addRecipe(meal, recipe);
	}

    ngOnDestroy() {
		this.unsubscribe$.next();
      	this.unsubscribe$.complete();
    }
}
