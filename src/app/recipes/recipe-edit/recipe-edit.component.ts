import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';

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
        private recipeService: RecipeService,
        private location: Location) { }

    ngOnInit() {
        this.route.url.pipe(map(segments => {
            return segments.join('/')
        })).subscribe(url => {
            this.isEditMode = url.includes('/edit'); // if '/edit' exists in the path
        });

        this.route.params.subscribe((params: Params) => {
            const recipeId = Number(params['id']);
            this.recipe = this.recipeService.getRecipeById(recipeId);
        });

        this.initForm();
    }

    onCancel() {
        this.recipeForm.reset();
        this.location.back();
    }

    initForm() {
        let name = '';
        let imagePath = 'https://via.placeholder.com/1000x500';
        let description = '';
        const recipeIngredients = new FormArray([]);

        if (this.isEditMode) {
            name = this.recipe.name;
            imagePath = this.recipe.imagePath;
            description = this.recipe.description;

            this.recipe.ingredients.forEach((ingredient: Ingredient) => {
                console.log('recipe ingredients ', ingredient);

                recipeIngredients.push(new FormGroup({
                    'name': new FormControl(ingredient.name, Validators.required),
                    'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*/)])
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
        const newRecipe = this.recipeForm.value;
        if (this.isEditMode) {
            const updatedRecipe = Object.assign({}, this.recipe, newRecipe);
            this.recipeService.updateRecipe(updatedRecipe);
        } else {
            this.recipeService.addNewRecipe(newRecipe);
        }
        // this.onCancel();
    }

    onAddIngredient() {
        // Add new Form Control to the Ingredients Array  of Form Controls
        (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
            'name': new FormControl(),
            'amount': new FormControl()
        }))
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
}
