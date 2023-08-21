import config from "../config";

const apiUrl = `https://api.spoonacular.com/recipes/random?number=100&apiKey=${config.API_KEY}`;

// Make an API request to get 100 random recipes
export default function getRandomRecipeUrls() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const recipeUrls = data.recipes.map((recipe) => recipe.sourceUrl);
      console.log(recipeUrls);
    })
    .catch((error) => {
      console.log("An error occurred:", error);
    });
}
