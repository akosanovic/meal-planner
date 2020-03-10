import { Recipe } from '../../recipes/recipe.model';

export class DailyPlanner {
  id?: string;
  breakfast: Recipe[] = [];
  lunch: Recipe[] = [];
  dinner: Recipe[] = [];

  constructor(obj?: DailyPlanner) {
    if (!obj) { return; }
    this.breakfast = obj.breakfast ? obj.breakfast : this.breakfast;
    this.lunch     = obj.lunch ? obj.lunch : this.lunch;
    this.dinner    = obj.dinner ? obj.dinner : this.dinner;
  }
}
