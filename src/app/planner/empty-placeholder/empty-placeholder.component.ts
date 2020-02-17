import { Recipe } from './../../recipes/recipe.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatSelectChange, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.scss']
})
export class EmptyPlaceholderComponent implements OnInit {

  @Input() dropdownOptions: Recipe[] = [];
  @Output() recipeSelected = new EventEmitter<Recipe>();
  @ViewChild('addRecipe', {static: false}) addRecipeTemplate: MatSelect;

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.addRecipeTemplate.toggle();
  }

  selectedOption(selectChange: MatSelectChange) {
    console.log('index', selectChange, this.dropdownOptions[selectChange.value]);
    this.recipeSelected.emit(this.dropdownOptions[selectChange.value]);
  }
}
