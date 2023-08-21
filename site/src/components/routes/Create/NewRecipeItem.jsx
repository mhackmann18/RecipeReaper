import User from "../../../utils/UserController";
import RecipeForm from "../../RecipeItem/Form";
import Recipe from "../../../utils/Recipe";
import Ingredient from "../../../utils/Ingredient";
import useRedirectOnAuthError from "../../../hooks/useRedirectOnAuthError";
import useToast from "../../../hooks/useToast";
import Toast from "../../common/Toast";
import useUser from "../../../hooks/useUser";

export default function NewRecipeItem() {
  const recipe = new Recipe({
    title: "",
    ingredients: [new Ingredient({ name: "", unit: "", quantity: 0 })],
    instructions: [""],
    nutrients: null,
    servings: "",
    servingSize: { quantity: 0, unit: "" },
    prepTime: 0,
    cookTime: 0,
    url: "",
  });
  const redirectOnAuthError = useRedirectOnAuthError();
  const { toast, closeToast, addSuccessToastMessage, addErrorToastMessage } =
    useToast();
  const { user } = useUser();

  console.log(recipe);

  const createRecipe = async (recipeData) => {
    const { error, message } = await User.saveRecipe(recipeData, user);

    if (error) {
      redirectOnAuthError(error);
      addErrorToastMessage(
        `Unable to save recipe. ${message || "An unexpected error occurred"}`
      );
    }

    addSuccessToastMessage("New recipe added to library");
  };

  return (
    <>
      <RecipeForm
        rootRecipe={recipe}
        onSubmit={createRecipe}
        buttonSettings={{ createRecipe: { onClick: () => null } }}
      />
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}
