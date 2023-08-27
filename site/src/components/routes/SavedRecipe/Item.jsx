import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeDisplay from "../../RecipeItem/Display";
import User from "../../../utils/UserController";
import RecipeForm from "../../RecipeItem/Form";
import Recipe from "../../../utils/Recipe";
import useRedirectOnAuthError from "../../../hooks/useRedirectOnAuthError";
import useToast from "../../../hooks/useToast";
import Toast from "../../common/Toast";

export default function SavedRecipeItem({ startRecipe, startingDisplayType }) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const [displayType, setDisplayType] = useState(startingDisplayType);
  const navigate = useNavigate();
  const redirectOnAuthError = useRedirectOnAuthError();
  const { addErrorToastMessage, toast, closeToast, addSuccessToastMessage } =
    useToast();

  const closeForm = () => {
    if (startingDisplayType === "form") {
      navigate(-1);
    } else {
      setDisplayType("div");
    }
  };

  const updateRecipe = async (newRecipe) => {
    const { error, message } = await User.updateRecipe(newRecipe, recipe.id);

    if (error) {
      redirectOnAuthError(error);
      addErrorToastMessage(
        `Unable to update recipe. ${message || "An unexpected error occurred"}`
      );
      return;
    }

    setRecipe(new Recipe({ ...newRecipe }));
  };

  const handleFormSubmit = async (recipeData) => {
    const { data, error, message } = await User.updateRecipe(
      recipeData,
      recipe.id
    );

    if (data) {
      addSuccessToastMessage("Recipe updated");
      setRecipe(new Recipe({ ...recipeData }));
    } else if (error) {
      redirectOnAuthError(error);
      addErrorToastMessage(
        `Unable to update recipe. ${message || "An unexpected error occurred"}`
      );
    }
  };

  return (
    <>
      {displayType === "div" ? (
        <RecipeDisplay
          rootRecipe={recipe}
          setRootRecipe={updateRecipe}
          buttonSettings={{
            back: { onClick: () => navigate(-1) },
            edit: { onClick: () => setDisplayType("form") },
          }}
        />
      ) : (
        <RecipeForm
          rootRecipe={recipe}
          closeForm={closeForm}
          onSubmit={handleFormSubmit}
        />
      )}
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}

SavedRecipeItem.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  startingDisplayType: PropTypes.oneOf(["form", "div"]),
};

SavedRecipeItem.defaultProps = {
  startingDisplayType: "div",
};
