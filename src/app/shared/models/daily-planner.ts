import { Recipe } from './../../recipes/recipe.model';
export class DailyPlanner {
  public id?: string;
  public breakfast: Recipe[];
  public lunch: Recipe[];
  public dinner: Recipe[];
}
