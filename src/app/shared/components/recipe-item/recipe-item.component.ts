import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../../../recipes/recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() removeRecipe = new EventEmitter();

  id: string = null;

  constructor() { }

  ngOnInit() {
    this.id = this.recipe.id;
  }

  removeButtonClicked() {
    this.removeRecipe.emit();
  }



}
