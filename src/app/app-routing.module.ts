import { NotFound404Component } from './not-found-404/not-found-404.component';
import { PlannerComponent } from './planner/planner.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
	{ path: 'planner', component: PlannerComponent },

	{	path: 'recipes', component: RecipesComponent, children: [
			{ path: ':id', component: RecipeDetailComponent },
			{ path: ':id/edit', component: RecipeEditComponent },
		]
	},
	{ path: 'recipe', children: [
			{ path: '', pathMatch: 'full', redirectTo: 'recipes' },
			{ path: 'new', component: RecipeEditComponent },
			{ path: ':id', component: RecipeDetailComponent },
			{ path: ':id/edit', component: RecipeEditComponent }
		]
	},
	{ path: 'shopping-list', component: ShoppingListComponent },
	{ path: 'auth', component: AuthComponent },
	{ path: '', redirectTo: 'planner', pathMatch: 'full' },
	{ path: '**', component: NotFound404Component }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {

}
