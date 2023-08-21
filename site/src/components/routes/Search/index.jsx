import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import ImportedRecipeItem from "./RecipeItem";
import Recipe from "../../../utils/Recipe";
import "../Import.css";
import "./index.css";

export default function ImportedRecipe({ redirectTo }) {
  const { state } = useLocation();

  return (
    <div id="import-recipe">
      {state && state.data ? (
        <ImportedRecipeItem startRecipe={new Recipe(state.data)} />
      ) : (
        <Navigate to={redirectTo} />
      )}
    </div>
  );
}

ImportedRecipe.propTypes = {
  redirectTo: PropTypes.string.isRequired,
};
