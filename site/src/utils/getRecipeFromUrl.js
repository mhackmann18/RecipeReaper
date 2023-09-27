/* eslint-disable camelcase */
import Recipe from "./Recipe";

/**
 * Makes an HTTP request to the scraper api with the provided url.
 * @param {string} url - A valid http url.
 * @returns A promise that resolves to an instance of the Recipe class or an error message string.
 */
export default async function getRecipeFromUrl(url) {
  // In the Safari browser, copying a link from google's search results does not copy the actual site url.
  // Instead the clipboard value is google.com's url with the site url passed as a query parameter.
  // Here, a regex is used to check if the url is in the aformentioned format, and if so, the url query param is extracted.
  const matches = url.match(/^https:\/\/www\.google\.com\/url\?.+/);

  let parsedUrl = url;

  if (matches) {
    const urlParamValue = getUrlQueryParamValue(url);

    // Url param value typically must be decoded
    parsedUrl = decodeURIComponent(urlParamValue);
  }

  let response;

  try {
    response = await fetch(
      `${process.env.REACT_APP_SCRAPER_ORIGIN}/recipe-data?url=${parsedUrl}`
    );
  } catch (error) {
    return error.message;
  }

  if (response.status === 200) {
    const data = await response.json();

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

    // Required properties
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

  const errText = await response.text();
  return errText;
}

function getUrlQueryParamValue(url) {
  // Match url variable name and value
  const matches = url.match(/url=https.+?(?=&)/);

  if (matches) {
    // Only return url variable's value
    const result = matches[0].replace(/url=/, "");
    return result;
  }

  return null;
}
