import { Component, OnInit, ViewContainerRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { DailyPlanner } from './../shared/models/daily-planner';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { PlannerService } from './_services/planner.service';

@Component({
    selector: 'app-planner',
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.scss']
})
export class PlannerComponent implements OnInit, OnDestroy {
    date: number = Date.now();
    subscription: Subscription;
    dropdownRecipeList$: Observable<Recipe[]>;
    dailyPlanner: DailyPlanner;

    dBreakfast: Recipe[];
    dLunch: Recipe[];
    dDinner: Recipe[];

    @ViewChildren('placeholderRef', { read: ViewContainerRef }) placeholderRefs: QueryList<ViewContainerRef>;

    constructor(private recipeService: RecipeService,
                private plannerService: PlannerService,

    ) { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.dropdownRecipeList$ = this.recipeService.getRecipes();

        this.subscription = this.plannerService.plannerChange.subscribe((planner: DailyPlanner) => {
            this.dailyPlanner = planner;
        });
    }

    objectKeys(obj) {
        return Object.keys(obj);
    }

    // Ingredients from planner to Shopping List
    addToShoppingList() {
      this.plannerService.addIngredientsToShoppingList();
    }
    saveChangesToDailyPlanner() {
    }

    removeRecipe(meal: string, recipe: Recipe) {
        this.plannerService.removeRecipe(meal, recipe);
    }

    addRecipe(recipe: Recipe, meal: string) {
      this.plannerService.addRecipe(meal, recipe);
    }
}
