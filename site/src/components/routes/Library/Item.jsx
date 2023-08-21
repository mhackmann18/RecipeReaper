import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
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

export default function LibraryItem({
  recipe,
  onDelete,
  onDuplicate,
  addErrorToastMessage,
}) {
  const { id, title, servings } = recipe;
  const caloriesPerRecipeServing = recipe.nutrients?.calories?.quantity;
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const redirectOnAuthError = useRedirectOnAuthError();
  const { user } = useUser();

  const handleDeleteRecipe = () => {
    User.deleteRecipe(id).then(({ data, message, error }) => {
      redirectOnAuthError(error);

      // Success
      if (data) {
        onDelete(id);

        // Failure
      } else if (message) {
        addErrorToastMessage(
          `Unable to delete recipe. ${
            message || "An unexpected error occurred"
          }`
        );
      }
    });
  };

  const handleDuplicateRecipe = () => {
    User.saveRecipe(recipe, user).then(({ data, message, error }) => {
      redirectOnAuthError(error);

      if (data) {
        onDuplicate(data);
      } else if (error) {
        addErrorToastMessage(
          `Unable to duplicate recipe. ${
            message || "An unexpected error occurred"
          }`
        );
      }
    });
  };

  return (
    <>
      <div
        className="library-item"
        onClick={() => navigate(`/dashboard/recipe-library/${id}`)}
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
        <div className="right">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="option-btn btn"
            title="Delete"
            size="1x"
            onClick={(e) => {
              setModalOpen(true);
              e.stopPropagation();
            }}
          />
          <FontAwesomeIcon
            icon={faClone}
            className="option-btn btn"
            title="Duplicate"
            size="1x"
            onClick={(e) => {
              handleDuplicateRecipe();
              e.stopPropagation();
            }}
          />
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="option-btn btn"
            title="Edit"
            size="1x"
            onClick={(e) => {
              navigate(`/dashboard/recipe-library/${id}`, {
                state: { startAsForm: true },
              });
              e.stopPropagation();
            }}
          />
        </div>
      </div>
      <StandardModal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <ConfirmationDisplay
          headerText="Delete Recipe"
          messageText={`Are you sure you want to delete the recipe '${title}'?`}
          cancelBtnText="Cancel"
          confirmBtnText="Delete"
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDeleteRecipe}
        />
      </StandardModal>
    </>
  );
}

LibraryItem.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  addErrorToastMessage: PropTypes.func.isRequired,
};
