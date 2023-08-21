/* eslint-disable camelcase */
import { isValidHttpURL } from "./validation";
import Recipe from "./Recipe";
import config from "../config";

// Return Recipe or error string
export default async function getRecipeFromUrl(url) {
  if (!isValidHttpURL(url)) {
    return "Please paste a valid recipe URL";
  }

  let response;

  try {
    response = await fetch(
      `${config.API_SCRAPER_ORIGIN}/recipe-data?url=${url}`
    );
  } catch (error) {
    return error;
  }

  if (response.status === 200) {
    const data = await response.json();

    console.log(data);

    const {
      cook_time,
      ingredients,
      instructions_list,
      nutrients,
      prep_time,
      title,
      yields,
      canonical_url,
    } = data;

    // These three fields are required in recipe
    if (!yields || !title || !ingredients || !ingredients.length) {
      return "Unable to get recipe from url";
    }

    return new Recipe({
      title,
      ingredients,
      instructions: instructions_list,
      nutrients,
      servings: yields,
      prepTime: prep_time,
      cookTime: cook_time,
      originalUrl: canonical_url,
    });
  }

  if (response.status === 400) {
    const errText = await response.text();
    return errText;
  }

  const errText = await response.text();
  return errText;
}
