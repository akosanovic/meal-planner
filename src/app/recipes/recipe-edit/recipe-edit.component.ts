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
    let recipeName = '';
    let imageUrl = 'https://via.placeholder.com/1000x500';
    let instructions = '';
    let recipeIngredients = new FormArray([])

    if (this.isEditMode) {
      recipeName   = this.recipe.name;
      imageUrl     = this.recipe.imagePath;
      instructions = this.recipe.description;
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
      name: new FormControl(recipeName, Validators.required),
      imageUrl: new FormControl(imageUrl, Validators.required),
      instructions: new FormControl(instructions, Validators.required),
      ingredients: recipeIngredients,
    });
  }


  onFormSubmit() {
    console.log('recipe form', this.recipeForm);
    this.isFormSubmitted = true;

    const newRecipe: Recipe = {
      id         : Math.floor(Math.random() * 100),
      name       : this.recipeForm.value['name'],
      imagePath  : this.recipeForm.value['imageUrl'],
      description: this.recipeForm.value['instructions'],
      ingredients: [], // TODO
      meal       : 'dinner' // TODO
    }

    alert('add new recipe' + newRecipe);
    console.log('new recipe or save changes to the existing recipe');

    // this.recipeService.addNewRecipe(newRecipe)
  }
}
