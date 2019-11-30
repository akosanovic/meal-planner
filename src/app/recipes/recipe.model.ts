import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public meal: String[] | string;

  constructor(id: number, name: string, desc: string, imagePath: string, ingredients: Ingredient[], meal: String[] | string) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.meal = meal;
  }
}
