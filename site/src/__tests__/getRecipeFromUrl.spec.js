import getRecipeFromUrl from "../utils/getRecipeFromUrl";
import recipeUrls from "../assets/urls.json";
import Recipe from "../utils/Recipe";

describe("getRecipeFromUrl", () => {
  test.each(recipeUrls)(
    "Returns a recipe instance for url %j",
    async (fixture) => {
      const data = await getRecipeFromUrl(fixture);
      expect(data).toBeInstanceOf(Recipe);
    }
  );
});
