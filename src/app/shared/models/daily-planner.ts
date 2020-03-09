import { Recipe } from './../../recipes/recipe.model';

export class DailyPlanner {
  public id?: string;
  public breakfast: Recipe[];
  public lunch: Recipe[];
  public dinner: Recipe[];

  constructor(obj?: DailyPlanner) {
    this.breakfast = obj ? obj.breakfast : [];
    this.lunch = obj ? obj.lunch : [];
    this.dinner = obj ? obj.dinner : [];
  }
}
