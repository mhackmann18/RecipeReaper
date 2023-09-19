import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPenToSquare,
  faBook,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function RecipeItemButtons({ buttonSettings }) {
  if (!Object.keys(buttonSettings).length) {
    return null;
  }

  const { back, edit, save, saveChanges, createRecipe } = buttonSettings;

  const buttons = [];

  if (back) {
    buttons.push(
      <button
        className={`btn-default${back.variant ? ` ${back.variant}` : ""}`}
        onClick={back.onClick}
        type="button"
        key="Back"
      >
        <FontAwesomeIcon
          className="button-panel-icon"
          icon={faArrowLeft}
          size="sm"
        />
        Back
      </button>
    );
  }

  if (edit) {
    buttons.push(
      <button
        className={`btn-default${edit.variant ? ` ${edit.variant}` : ""}`}
        onClick={edit.onClick}
        type="button"
        key="Edit"
      >
        <FontAwesomeIcon
          className="button-panel-icon"
          icon={faPenToSquare}
          size="sm"
        />
        Edit
      </button>
    );
  }

  if (save) {
    buttons.push(
      <button
        type="button"
        onClick={save.onClick}
        className={`btn-default${save.variant ? ` ${save.variant}` : ""}`}
        key="Save"
      >
        <FontAwesomeIcon
          className="button-panel-icon"
          icon={faBook}
          size="sm"
        />
        Save
      </button>
    );
  }

  if (saveChanges) {
    buttons.push(
      <button
        type="submit"
        // eslint-disable-next-line prettier/prettier
        className={`btn-default${saveChanges.variant ? ` ${saveChanges.variant}` : ""}`}
        onClick={saveChanges.onClick}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(saveChanges.variant === "inactive" && { disabled: true })}
        key="Save Changes"
      >
        <FontAwesomeIcon
          icon={faCheck}
          className="button-panel-icon"
          size="sm"
        />
        Save Changes
      </button>
    );
  }

  if (createRecipe) {
    buttons.push(
      <button
        type="submit"
        // eslint-disable-next-line prettier/prettier
        className={`btn-default${createRecipe.variant ? ` ${createRecipe.variant}` : ""}`}
        onClick={createRecipe.onClick}
        key="Create Recipe"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="button-panel-icon"
          size="sm"
        />
        Create Recipe
      </button>
    );
  }

  return buttons;
}

const button = PropTypes.exact({
  onClick: PropTypes.func,
  variant: PropTypes.string,
});

RecipeItemButtons.propTypes = {
  buttonSettings: PropTypes.exact({
    back: button,
    edit: button,
    save: button,
    saveChanges: button,
    createRecipe: button,
  }).isRequired,
};
