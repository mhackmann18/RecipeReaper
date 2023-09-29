import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClone,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import StandardModal from "../../common/StandardModal";
import ConfirmationDisplay from "../../common/ConfirmationDisplay";
import useUser from "../../../hooks/useUser";
import Recipe from "../../../utils/Recipe";
import User from "../../../utils/UserController";
import useRedirectOnAuthError from "../../../hooks/useRedirectOnAuthError";
import "./Item.css";

export default function RecipeLibraryItem({
  recipe,
  onClick,
  onDeleteSuccess,
  onDuplicateSuccess,
  onEditBtnClick,
  handleError,
}) {
  const { id, title, servings } = recipe;
  const caloriesPerRecipeServing = recipe.nutrients?.calories?.quantity;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const redirectOnAuthError = useRedirectOnAuthError();
  const { user } = useUser();

  const deleteRecipe = () => {
    User.deleteRecipe(id).then(({ data, message, error }) => {
      redirectOnAuthError(error);

      // Success
      if (data) {
        onDeleteSuccess(id);

        // Failure
      } else if (error) {
        handleError(
          `Unable to delete recipe. ${
            message || "An unexpected error occurred"
          }`
        );
      }
    });
  };

  const handleDeleteBtnClick = (e) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  const handleDuplicateBtnClick = (e) => {
    e.stopPropagation();
    User.saveRecipe(recipe, user).then(({ data, message, error }) => {
      redirectOnAuthError(error);

      if (data) {
        onDuplicateSuccess(data);
      } else if (error) {
        handleError(
          `Unable to duplicate recipe. ${
            message || "An unexpected error occurred"
          }`
        );
      }
    });
  };

  const handleEditBtnClick = (e) => {
    e.stopPropagation();
    onEditBtnClick();
  };

  return (
    <>
      <div
        className="library-item"
        onClick={onClick}
        role="button"
        aria-label={recipe.title}
      >
        <div className="left">
          <h2>{title}</h2>
          <div className="row">
            <span>Servings: {servings}</span>
            {caloriesPerRecipeServing ? (
              <span>Calories per Serving: {caloriesPerRecipeServing}</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="buttons">
          <button
            title="Edit recipe"
            aria-label="Edit recipe"
            type="button"
            onClick={handleEditBtnClick}
          >
            <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          </button>
          <button
            title="Duplicate recipe"
            aria-label="Duplicate recipe"
            type="button"
            onClick={handleDuplicateBtnClick}
          >
            <FontAwesomeIcon icon={faClone} size="lg" />
          </button>
          <button
            title="Delete recipe"
            aria-label="Delete recipe"
            type="button"
            onClick={handleDeleteBtnClick}
          >
            <FontAwesomeIcon icon={faTrashCan} size="lg" />
          </button>
        </div>
      </div>
      <StandardModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
      >
        <ConfirmationDisplay
          headerText="Delete Recipe"
          messageText={`Are you sure you want to delete the recipe '${title}'?`}
          cancelBtnText="Cancel"
          confirmBtnText="Delete"
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            deleteRecipe();
            setDeleteModalOpen(false);
          }}
        />
      </StandardModal>
    </>
  );
}

RecipeLibraryItem.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  onClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onDuplicateSuccess: PropTypes.func.isRequired,
  onEditBtnClick: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};
