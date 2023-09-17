import { useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import getRecipeFromUrl from "../../utils/getRecipeFromUrl";
import "./RecipeScrapingForm.css";

export default function RecipeScrapingForm({
  onSubmit,
  handleResponse,
  onFailure,
  variant,
}) {
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    document.activeElement.blur();
    const urlInput = e.target.querySelector("input").value;

    onSubmit();

    const recipe = await getRecipeFromUrl(urlInput);

    if (typeof recipe === "string") {
      setSubmitError(recipe);
      onFailure();
    } else {
      handleResponse(recipe);
    }
  }

  return (
    <form id="recipe-scraping-form" className={variant} onSubmit={handleSubmit}>
      <div className="main">
        <input
          type="text"
          id="url-input"
          placeholder="Paste a recipe's URL"
          onFocus={() => {
            setSubmitError("");
          }}
        />
        <button className="btn-default" type="submit">
          Get Recipe
        </button>
      </div>
      {submitError && (
        <Alert id="rsf-submit-error" severity="error">
          {submitError}
        </Alert>
      )}{" "}
    </form>
  );
}

RecipeScrapingForm.propTypes = {
  handleResponse: PropTypes.func.isRequired,
  variant: PropTypes.string,
  onSubmit: PropTypes.func,
  onFailure: PropTypes.func,
};

RecipeScrapingForm.defaultProps = {
  variant: "",
  onSubmit: () => false,
  onFailure: () => false,
};
