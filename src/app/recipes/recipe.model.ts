import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public meal: String[] | string;

  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.description = recipe.description;
    this.imagePath = recipe.imagePath;
    this.ingredients = recipe.ingredients;
    this.meal = recipe.meal;
  }
}
