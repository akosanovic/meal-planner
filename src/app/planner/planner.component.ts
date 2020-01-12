import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EmptyPlaceholderComponent } from './empty-placeholder/empty-placeholder.component';
import { DailyPlanner } from './../shared/models/daily-planner';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { PlannerService } from './planner.service';

@Component({
    selector: 'app-planner',
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit, OnDestroy {
    date: number = Date.now();
    subscription: Subscription;
    recipes: Recipe[];
    dailyPlanner: DailyPlanner;

    dBreakfast: Recipe[];
    dLunch: Recipe[];
    dDinner: Recipe[];

    @ViewChildren('placeholderRef', { read: ViewContainerRef }) placeholderRefs: QueryList<ViewContainerRef>;

    constructor(private recipeService: RecipeService,
                private plannerService: PlannerService,
                private CFR: ComponentFactoryResolver,
    ) { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();

        this.subscription = this.plannerService.plannerChange.subscribe((planner: DailyPlanner) => {
            this.dailyPlanner = planner;
        });
    }

    objectKeys(obj) {
        return Object.keys(obj);
    }

    removeRecipe(meal: string, index: number) {
        console.log('remove recipe ')
        this.plannerService.removeRecipe(meal, index);
    }

    addRecipe(recipe: Recipe, meal: string) {
      console.log('recipe added', recipe );
      this.plannerService.addRecipe(meal, recipe);
    }
}
