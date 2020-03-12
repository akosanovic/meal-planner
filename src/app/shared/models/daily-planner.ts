import { Recipe } from '../../recipes/recipe.model';

export class DailyPlanner {
  id?: string;
  breakfast: Recipe[] = [];
  lunch: Recipe[] = [];
  dinner: Recipe[] = [];

  constructor(dp?) {
    if (!dp) { return; }

    for (const meal of Object.keys(dp)) {
      if (dp.hasOwnProperty(meal)) {
        const recipes: {[key: string]: Recipe} = dp[meal];

        for (const recipeKey of Object.keys(recipes)) {
          if (recipes.hasOwnProperty(recipeKey)) {

            const recipe = new Recipe({id: recipeKey, ...recipes[recipeKey]});

            if (meal === 'breakfast') {
              this.breakfast.push(recipe);
            } else if (meal === 'lunch') {
              this.lunch.push(recipe);
            } else {
              this.dinner.push(recipe);
            }

          }
        }

      }
    }
  }
}
