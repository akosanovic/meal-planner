import { Ingredient } from './../../shared/ingredient.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
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

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.url.pipe(map(segments => segments.join('/'))).subscribe(url => {
      console.log('url ', url.includes('edit'));
      this.isEditMode = url.includes('edit');
    })


    this.route.params.subscribe( (params: Params) => {
      const recipeId = Number(params['id']);
      console.log('param', recipeId)
      this.recipe = this.recipeService.getRecipeById(recipeId);
    })


    this.initForm();
  }

  onFormSubmit() {
    console.log('recipe form', this.recipeForm);

    const newRecipe: Recipe = {
      id         : Math.floor(Math.random() * 100),
      name       : this.recipeForm.value['name'],
      imagePath  : this.recipeForm.value['imageUrl'],
      description: this.recipeForm.value['instructions'],
      ingredients: [new Ingredient('asdf', 1)],
      meal       : 'dinner'
    }

    this.recipeService.addNewRecipe(newRecipe)
  }


  initForm() {
    let recipeName = '';
    let imageUrl = 'https://via.placeholder.com/1000x500';
    let instructions = '';
    let recipeIngredients = new FormArray([ new FormGroup({
      'ingredient-name'  : new FormControl(''),
      'ingredient-amount': new FormControl('0')
    })])

    if (this.isEditMode) {
      recipeName   = this.recipe.name;
      imageUrl     = this.recipe.imagePath;
      instructions = this.recipe.description;

      this.recipe.ingredients.forEach( (ingredient: Ingredient) => {
        console.log('recipe ingredients ', ingredient);


        recipeIngredients.push(new FormGroup({
          'ingredient-name': new FormControl(ingredient.name),
          'ingredient-amount': new FormControl(ingredient.amount)
        }))
      })
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imageUrl: new FormControl(imageUrl),
      instructions: new FormControl(instructions),
      ingredients: recipeIngredients,
    });

  }
}
