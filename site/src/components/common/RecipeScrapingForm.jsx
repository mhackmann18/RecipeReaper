import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import useSignalOnComponentUnmount from "../../hooks/useSignalOnComponentUnmount";
import getRecipeFromUrl from "../../utils/getRecipeFromUrl";
import { isValidHttpUrl } from "../../utils/validation";
import "./RecipeScrapingForm.css";

export default function RecipeScrapingForm({
  handleRecipeData,
  variant, // Optional. Valid values: "inline"
  loading,
  setLoading,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const signal = useSignalOnComponentUnmount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });

  // Keep errorMessage state in sync with useForm's error message prop
  useEffect(() => {
    if (errors?.recipeUrl?.message) {
      setErrorMessage(errors.recipeUrl.message);
    }
  }, [errors.recipeUrl]);

  async function handleFormSubmit({ recipeUrl }) {
    setLoading(true);
    const data = await getRecipeFromUrl(recipeUrl, signal);

    // The signal from useSignalOnComponentUnmount has aborted the request
    if (data === "The user aborted a request.") return;

    setLoading(false);
    if (typeof data === "string") {
      setErrorMessage(data);
    } else if (typeof data === "object" && data.title) {
      handleRecipeData(data);
    }
  }

  return (
    <form
      id="recipe-scraping-form"
      className={variant}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <label htmlFor="recipe-url" hidden />
      <TextField
        id="recipe-url"
        placeholder="Paste a recipe's URL"
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        fullWidth
        {...register("recipeUrl", {
          validate: isValidHttpUrl,
          onChange: () => setErrorMessage(""),
        })}
      />
      <div className="button-wrapper">
        <button
          className="btn-default"
          type="submit"
          disabled={Boolean(loading)}
        >
          Get recipe
        </button>
      </div>
    </form>
  );
}

RecipeScrapingForm.propTypes = {
  handleRecipeData: PropTypes.func.isRequired,
  variant: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

RecipeScrapingForm.defaultProps = {
  variant: "",
};
