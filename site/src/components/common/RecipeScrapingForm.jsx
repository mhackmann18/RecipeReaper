import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import getRecipeFromUrl from "../../utils/getRecipeFromUrl";
import { isValidHttpUrl } from "../../utils/validation";
import "./RecipeScrapingForm.css";

export default function RecipeScrapingForm({
  onSubmit,
  onSuccess,
  onFailure,
  variant, // Optional prop. Allowed values: "inline"
  startingErrorMessage,
}) {
  const [errorMessage, setErrorMessage] = useState(startingErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Keep errorMessage in sync with useForm's error message
  useEffect(() => {
    if (errors?.recipeUrl?.message) {
      setErrorMessage(errors.recipeUrl.message);
    }
  }, [errors.recipeUrl]);

  async function onFormSubmit({ recipeUrl }) {
    onSubmit();

    const data = await getRecipeFromUrl(recipeUrl);

    if (typeof data === "string") {
      onFailure(data);
      setErrorMessage(data);
    } else {
      onSuccess(data);
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
        placeholder="Paste a recipe's URL"
        fullWidth
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        {...register("recipeUrl", {
          validate: isValidHttpUrl,
          onChange: () => setErrorMessage(""),
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
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func,
  variant: PropTypes.string,
  startingErrorMessage: PropTypes.string,
};

RecipeScrapingForm.defaultProps = {
  onFailure: () => null,
  variant: "",
  startingErrorMessage: "",
};
