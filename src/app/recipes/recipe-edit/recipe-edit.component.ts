import { Ingredient } from './../../shared/ingredient.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  recipeForm: FormGroup;
  isEditMode: boolean;
  isFormSubmitted: boolean = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.url.pipe(map(segments => {
      console.log('segments', segments)
      return segments.join('/')
    })).subscribe(url => {
      this.isEditMode = url.includes('/edit'); // if '/edit' exists in the path
    });

    this.route.params.subscribe( (params: Params) => {
      const recipeId = Number(params['id']);
      console.log('param', recipeId)
      this.recipe = this.recipeService.getRecipeById(recipeId);
    });

    this.initForm();
  }

  onCancel() {
    alert('overview recipe on cancel, remove edit path')
  }

  onAddIngredient() {
    // Add new Form Control to the Ingredients Array  of Form Controls
    (<FormArray> this.recipeForm.get('ingredients')).push( new FormGroup({
      'ingredient-name': new FormControl(),
      'ingredient-amount': new FormControl()
    }) )
  }

  initForm() {
    let name = '';
    let imagePath = 'https://via.placeholder.com/1000x500';
    let description = '';
    let recipeIngredients = new FormArray([])

    if (this.isEditMode) {
      name   = this.recipe.name;
      imagePath     = this.recipe.imagePath;
      description = this.recipe.description;
      console.log('recipe ingredients', this.recipe);

      this.recipe.ingredients.forEach( (ingredient: Ingredient) => {
        console.log('recipe ingredients ', ingredient);

        recipeIngredients.push( new FormGroup({
          'ingredient-name': new FormControl(ingredient.name, Validators.required),
          'ingredient-amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*/)])
        }))
      })

    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients,
    });
  }


  onFormSubmit() {
    this.isFormSubmitted = true;
    console.log(this.recipeForm.value)


    // this.recipeService.addNewRecipe(newRecipe)
  }
}
