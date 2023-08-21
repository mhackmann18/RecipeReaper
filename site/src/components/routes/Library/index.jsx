import { useState, useEffect } from "react";
import LibraryItem from "./Item";
import Recipe from "../../../utils/Recipe";
import User from "../../../utils/UserController";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";
import Spinner from "../../common/Spinner";
import NoContentMessage from "../../common/NoContentMessage";
import useRedirectOnAuthError from "../../../hooks/useRedirectOnAuthError";
import "./index.css";

export default function Library() {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const redirectOnAuthError = useRedirectOnAuthError();
  const { addErrorToastMessage, addSuccessToastMessage, closeToast, toast } =
    useToast();

  // Load recipes
  useEffect(() => {
    User.getRecipes().then(({ data, message, error: fetchError }) => {
      redirectOnAuthError(fetchError);

      if (data?.length) {
        setRecipes(
          data.map(
            (r) =>
              new Recipe({
                ...r,
                servingSize: r.serving_size,
                prepTime: r.prep_time,
                cookTime: r.cook_time,
                originalUrl: r.original_url,
              })
          )
        );
      } else if (fetchError) {
        setError(true);
        addErrorToastMessage(
          `Unable to load recipes. ${message || "An unexpected error occurred"}`
        );
      }
      setIsLoading(false);
    });
  }, []);

  const handleRecipeDelete = (recipeId) => {
    const updatedRecipes = recipes.filter((r) => r.id !== recipeId);
    setRecipes(updatedRecipes.length ? updatedRecipes : null);
    addSuccessToastMessage("Recipe deleted");
  };

  const handleRecipeDuplicate = () => {
    // Refresh recipes
    User.getRecipes().then(({ data, message, error: fetchError }) => {
      redirectOnAuthError(fetchError);
      if (data.length) {
        setRecipes(data.map((r) => new Recipe({ ...r })));
        addSuccessToastMessage("Recipe duplicated");
      } else if (fetchError) {
        addErrorToastMessage(
          `Unable to refresh recipe list. ${
            message || "An unexpected error occurred"
          }`
        );
      }
    });
  };

  const content = recipes ? (
    recipes.map((recipe) => (
      <LibraryItem
        key={recipe.id}
        recipe={recipe}
        addErrorToastMessage={addErrorToastMessage}
        onDelete={handleRecipeDelete}
        onDuplicate={handleRecipeDuplicate}
      />
    ))
  ) : (
    <NoContentMessage
      headerText={
        error
          ? "There was a problem loading your recipes."
          : "You haven't added any recipes yet."
      }
      subText={
        error
          ? "Please try refreshing the page."
          : "Recipes that you import or create will show up here."
      }
    />
  );

  return (
    <>
      <div id="library-page">
        {isLoading ? (
          <div className="center-content">
            <Spinner />
          </div>
        ) : (
          content
        )}
      </div>
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}
