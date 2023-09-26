import { useState } from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import getRecipeFromUrl from "../../utils/getRecipeFromUrl";
import "./RecipeScrapingForm.css";

export default function RecipeScrapingForm({
  onSubmit,
  onSuccess,
  onFailure,
  variant, // Optional, allowed values = "inline"
  startingErrorMessage,
}) {
  const [submitError, setSubmitError] = useState(startingErrorMessage);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    document.activeElement.blur();
    const urlInput = e.target.querySelector("input").value;

    onSubmit();

    const recipe = await getRecipeFromUrl(urlInput);

    if (typeof recipe === "string") {
      onFailure(recipe);
      setSubmitError(recipe);
    } else {
      onSuccess(recipe);
    }
  }

  return (
    <form id="recipe-scraping-form" className={variant} onSubmit={handleSubmit}>
      <label htmlFor="recipe-url" hidden />
      <TextField
        id="recipe-url"
        name="recipe-url"
        // autoComplete="off"
        placeholder="Paste a recipe's URL"
        variant="outlined"
        size="small"
        fullWidth
        error={Boolean(submitError)}
        helperText={submitError}
      />
      <div className="button-wrapper">
        <button className="btn-default" type="submit">
          Get Recipe
        </button>
      </div>
    </form>
  );
}

RecipeScrapingForm.propTypes = {
  onSubmit: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func,
  variant: PropTypes.string,
  startingErrorMessage: PropTypes.string,
};

RecipeScrapingForm.defaultProps = {
  onSubmit: () => false,
  onFailure: () => false,
  variant: "",
  startingErrorMessage: "",
};
