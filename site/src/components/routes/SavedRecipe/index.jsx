/* eslint-disable camelcase */
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import SavedRecipeItem from "./Item";
import Recipe from "../../../utils/Recipe";
import User from "../../../utils/UserController";
// import Spinner from "../../common/Spinner";
import useToast from "../../../hooks/useToast";
import Toast from "../../common/Toast";
import NoContentMessage from "../../common/NoContentMessage";
import useRedirectOnAuthError from "../../../hooks/useRedirectOnAuthError";
// import LoadingRecipeItem from "../Features/LoadingRecipeItem";
import "./index.css";

export default function RecipePage({ edit }) {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const { id: recipeId } = useParams();
  const { toast, closeToast, addErrorToastMessage } = useToast();
  const redirectOnAuthError = useRedirectOnAuthError();

  // Load recipe
  useEffect(() => {
    if (recipeId) {
      User.getRecipe(recipeId).then(({ data, message, error }) => {
        redirectOnAuthError(error);

        if (data) {
          const { serving_size, prep_time, cook_time, original_url } = data;
          setRecipe(
            new Recipe({
              ...data,
              servingSize: serving_size,
              prepTime: prep_time,
              cookTime: cook_time,
              originalUrl: original_url,
            })
          );
        } else if (message) {
          addErrorToastMessage(
            `Unable to load recipe. ${message || "An unknown error occurred"}`
          );
        }

        setIsLoading(false);
      });
    }
  }, []);

  const content = recipe ? (
    <SavedRecipeItem
      startRecipe={recipe}
      startingDisplayType={state?.startAsForm || edit ? "form" : "div"}
    />
  ) : (
    <NoContentMessage
      headerText="There was a problem loading your recipe."
      subText="Please try refreshing the page."
    />
  );

  return (
    <>
      <div id="recipe-page">{isLoading ? false : content}</div>
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}

RecipePage.propTypes = {
  edit: PropTypes.bool,
};

RecipePage.defaultProps = {
  edit: false,
};
