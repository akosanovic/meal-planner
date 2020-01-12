import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './../../../recipes/recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  id: number = 0;

  constructor() { }

  ngOnInit() {
    this.id = this.recipe.id;
  }



}
