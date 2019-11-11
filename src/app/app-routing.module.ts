import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { EmptyHolderComponent } from './recipes/empty-holder/empty-holder.component';
import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
	{path: '', redirectTo: 'shopping-list', pathMatch: 'full'},
	{path: 'recipes', component: RecipesComponent, children: [
		{path: '', component: EmptyHolderComponent},
		{path: ':id', component: RecipeDetailComponent}
	]},
	{path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {

}
