import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver, ViewChild, AfterViewInit } from '@angular/core';
import { DailyPlanner } from '../../shared/models/daily-planner';
import { Recipe } from './../../recipes/recipe.model';
import { MealTypes } from '../_models/meal.types';
import { EmptyPlaceholderComponent } from './../empty-placeholder/empty-placeholder.component';


@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line: no-input-rename
  @Input('planner') dailyPlanner: DailyPlanner;
    // tslint:disable-next-line: no-input-rename
  @Input('recipes') dropdownRecipeList$: Recipe[];

  @Output() removeRecipe = new EventEmitter<{meal: string, recipe: Recipe}>();
  @Output() addRecipe = new EventEmitter<{recipe: Recipe, meal: string}>();

  @ViewChild('emptyPlaceholder', {read: ViewContainerRef, static: false})
  emptyPlaceholder: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {

  }

  ngAfterViewInit() { // TODO:
    // const resolver = this.componentFactoryResolver.resolveComponentFactory(EmptyPlaceholderComponent);
    // const componentFactory = this.emptyPlaceholder.createComponent(resolver);
    // componentFactory.instance.dropdownOptions = this.dropdownRecipeList$;
  }

  // TODO: object keys to helper module
  objectKeys(obj) {
    return Object.keys(obj);
  }

  onRemoveRecipe(meal: MealTypes, recipe: Recipe) {
    this.removeRecipe.emit({meal: meal, recipe: recipe});
  }

  onAddRecipe(recipe: Recipe, meal: MealTypes) {
    this.addRecipe.emit({recipe: recipe, meal: meal});
  }
}
