import { EmptyPlaceholderComponent } from './empty-placeholder/empty-placeholder.component';
import { DailyPlanner } from './../shared/models/daily-planner';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit, AfterViewInit {
  recipes: Recipe[]
  dailyPlanner: DailyPlanner;

  dBreakfast: Recipe[];
  dLunch: Recipe[];
  dDinner: Recipe[];

  @ViewChildren('placeholderRef', {read: ViewContainerRef}) placeholderRefs:  QueryList<ViewContainerRef>;

  constructor( private recipeService: RecipeService,
                private CFR: ComponentFactoryResolver ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.dailyPlanner =  this.recipeService.getDailyPlanner();

    this.dBreakfast = this.dailyPlanner.breakfast;
    this.dLunch = this.dailyPlanner.lunch;
    this.dDinner = this.dailyPlanner.dinner;

  }
  ngAfterViewInit() {
    this.injectDynamicComponent();
  }

  injectDynamicComponent() {
    // Object that knows how to create a new component
    const EmptyPlaceholderFactory =  this.CFR.resolveComponentFactory( EmptyPlaceholderComponent );


    // All The places Component will be render
    this.placeholderRefs.forEach(hostRef => {
      console.log('view container ref', hostRef);

      // Clear anything that might be stored there earlier
      hostRef.clear();

      // Create dynamic component in the reference place
      const placeholderCompRef = hostRef.createComponent(EmptyPlaceholderFactory);

      // Property binding
      placeholderCompRef.instance.dropdownOptions = this.recipes;
      placeholderCompRef.instance.meal = 'dinner';

      // Event emitting
      placeholderCompRef.instance.optionSelected.subscribe(
        (dish) => {
          // TODO: type of  meal (lunch, dinner);
          // TODO: instead of pushing directly, update the state
          this.dailyPlanner[dish.meal].push(dish.recipe);
        }
      )
    })
  }
}
