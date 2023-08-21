import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import StandardModal from "../../common/StandardModal";
import MealPrepCalculatorForm from "./MealPrepCalculatorForm";
import "./OpenCalculatorButton.css";
import Recipe from "../../../utils/Recipe";

export default function OpenCalculatorButton({ recipe, updateRecipe }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        id="open-calculator-button"
        onClick={() => setModalOpen(true)}
        type="button"
        className="btn-default"
      >
        <FontAwesomeIcon
          className="button-panel-icon"
          icon={faCalculator}
          size="sm"
        />
        Prep
      </button>
      <StandardModal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <MealPrepCalculatorForm
          recipe={recipe}
          onCancelClick={() => setModalOpen(false)}
          updateRecipe={(newRecipe) => {
            updateRecipe(newRecipe);
            setModalOpen(false);
          }}
        />
      </StandardModal>
    </>
  );
}

OpenCalculatorButton.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  updateRecipe: PropTypes.func.isRequired,
};
