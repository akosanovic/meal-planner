import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';

// Shared Components
import { RecipeItemComponent } from './shared/components/recipe-item/recipe-item.component';
import { DropdownDirective } from './shared/dropdown.directive';

// Recipe Module
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeService } from './recipes/recipe.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

// Shopping List Module
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';

//  Planner Module
import { PlannerComponent } from './planner/planner.component';
import { WeeklyComponent } from './planner/weekly/weekly.component';
import { EmptyPlaceholderComponent } from './planner/empty-placeholder/empty-placeholder.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeEditComponent,
    PlannerComponent,
    WeeklyComponent,
    EmptyPlaceholderComponent,
    NotFound404Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EmptyPlaceholderComponent]
})
export class AppModule { }
