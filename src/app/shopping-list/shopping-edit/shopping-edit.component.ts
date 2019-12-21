import { NgForm } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm', {static: false}) ShoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editingIngredient: Ingredient;
  editingIngredientIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientSelected.subscribe((index: number) => {
      this.editMode = true;
      this.editingIngredientIndex = index;

      // Get Selected Ingredients Detials
      this.editingIngredient = this.shoppingListService.getIngredientById(index);
      // Display value in the Shopping List Form
      this.ShoppingListForm.setValue({
        'name': this.editingIngredient.name,
        'amount': this.editingIngredient.amount
      })
    })
  }

  onAddItem(form: NgForm) {
    const controls = form.value;
    const newIngredient = new Ingredient(controls.name, controls.amount);

    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editingIngredientIndex, newIngredient);
    }
    else {
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

}
