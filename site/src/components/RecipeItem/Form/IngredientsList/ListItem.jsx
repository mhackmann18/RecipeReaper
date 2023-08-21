/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import QuantityInput from "./QuantityInput";
import UnitInput from "./UnitInput";
import NameInput from "./NameInput";
import Ingredient from "../../../../utils/Ingredient";
import "./ListItem.css";
import RecipeValidator from "../../../../utils/RecipeValidator";
import ConfirmationDisplay from "../../../common/ConfirmationDisplay";
import StandardModal from "../../../common/StandardModal";

export default function IngredientsListItem({
  ingredient,
  onDeleteIngredient,
  ingredientErrors,
  register,
  watch,
}) {
  const { quantity, unit, name, id } = ingredient;

  const [removeIngredientModalOpen, setRemoveIngredientModalOpen] =
    useState(false);

  const ingredientDeletedMessage = "Ingredient deleted";

  const handleRemoveClick = () => {
    if (watch(`ingredients.${id}.name`)) {
      setRemoveIngredientModalOpen(true);
    } else {
      onDeleteIngredient(id, ingredientDeletedMessage);
    }
  };

  return (
    <li>
      <div className="sub-ingredient">
        <div className="inputs-container">
          <QuantityInput
            ingredientQuantity={quantity}
            errorMessage={ingredientErrors?.quantity?.message}
            {...register(`ingredients.${id}.quantity`, {
              validate: RecipeValidator.getIngredientQuantityErrMsg,
            })}
          />
          <UnitInput
            ingredientUnit={unit}
            {...register(`ingredients.${id}.unit`)}
          />
          <NameInput
            ingredientName={name}
            errorMessage={ingredientErrors?.name?.message}
            {...register(`ingredients.${id}.name`, {
              validate: RecipeValidator.getIngredientNameErrMsg,
            })}
          />
          {}
          <div className="buttons-container">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={handleRemoveClick}
              size="lg"
              className="btn remove"
              title="Remove Ingredient"
            />
          </div>
        </div>
      </div>
      <StandardModal
        open={removeIngredientModalOpen}
        handleClose={() => setRemoveIngredientModalOpen(false)}
      >
        <ConfirmationDisplay
          headerText="Delete Ingredient"
          messageText={`Are you sure you want to delete the ingredient '${ingredient.getString()}'?`}
          cancelBtnText="Cancel"
          confirmBtnText="Delete"
          onCancel={() => setRemoveIngredientModalOpen(false)}
          onConfirm={() => {
            onDeleteIngredient(id, ingredientDeletedMessage);
          }}
        />
      </StandardModal>
    </li>
  );
}

IngredientsListItem.propTypes = {
  ingredient: PropTypes.instanceOf(Ingredient),
  onDeleteIngredient: PropTypes.func.isRequired,
  ingredientErrors: PropTypes.object,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};

IngredientsListItem.defaultProps = {
  ingredient: new Ingredient({ name: "", quantity: null, unit: null }),
  ingredientErrors: null,
};
