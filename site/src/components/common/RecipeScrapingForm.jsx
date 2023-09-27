import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import getRecipeFromUrl from "../../utils/getRecipeFromUrl";
import { isValidHttpURL } from "../../utils/validation";
import "./RecipeScrapingForm.css";

export default function RecipeScrapingForm({
  onSubmit,
  onSuccess,
  onFailure,
  variant, // Optional property. Allowed values: "inline"
  startingErrorMessage,
}) {
  const [submitError, setSubmitError] = useState(startingErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors?.recipeUrl?.message) {
      setSubmitError(errors.recipeUrl.message);
    }
  }, [errors.recipeUrl]);

  async function onFormSubmit({ recipeUrl }) {
    setSubmitError("");
    onSubmit();

    const recipe = await getRecipeFromUrl(recipeUrl);

    if (typeof recipe === "string") {
      onFailure(recipe);
      setSubmitError(recipe);
    } else {
      onSuccess(recipe);
    }
  }

  return (
    <form
      id="recipe-scraping-form"
      className={variant}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <label htmlFor="recipe-url" hidden />
      <TextField
        id="recipe-url"
        // autoComplete="off"
        placeholder="Paste a recipe's URL"
        variant="outlined"
        size="small"
        fullWidth
        error={Boolean(submitError)}
        helperText={submitError}
        {...register("recipeUrl", {
          validate: isValidHttpURL,
        })}
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
