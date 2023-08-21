/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import StandardModal from "../../../common/StandardModal";
import ConfirmationDisplay from "../../../common/ConfirmationDisplay";
import RecipeValidator from "../../../../utils/RecipeValidator";
import "./index.css";

function DeleteStepButton({ instructionId, onClick, watch }) {
  const [deleteInstructionModalOpen, setDeleteInstructionModalOpen] =
    useState(false);

  const handleClick = () => {
    if (watch(`instructions.${instructionId}`)) {
      setDeleteInstructionModalOpen(true);
    } else {
      onClick(instructionId);
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faTrashCan}
        onClick={handleClick}
        size="lg"
        className="btn remove"
        title="Remove Step"
      />
      <StandardModal
        open={deleteInstructionModalOpen}
        handleClose={() => setDeleteInstructionModalOpen(false)}
      >
        <ConfirmationDisplay
          headerText="Delete Step"
          messageText="Are you sure you want to delete this step?"
          cancelBtnText="Cancel"
          confirmBtnText="Delete"
          onCancel={() => setDeleteInstructionModalOpen(false)}
          onConfirm={() => {
            onClick(instructionId);
          }}
        />
      </StandardModal>
    </>
  );
}

DeleteStepButton.propTypes = {
  instructionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onClick: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};

export default function InstructionsList({
  instructions,
  onInstructionRemoveClick,
  register,
  watch,
  errors,
}) {
  return (
    <ul id="instructions-list">
      {instructions.length
        ? instructions.map((el, index) => (
            <li key={el.id}>
              <div className="instruction-input-wrapper">
                <TextField
                  {...register(`instructions.${el.id}`, {
                    validate: RecipeValidator.getInstructionErrMsg,
                  })}
                  defaultValue={el.text}
                  label={`Step ${index + 1}`}
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  required
                  helperText={errors && errors[el.id] && errors[el.id].message}
                  error={Boolean(errors && errors[el.id])}
                  minRows={1}
                  maxRows={4}
                />
              </div>
              <DeleteStepButton
                instructionId={el.id}
                onClick={onInstructionRemoveClick}
                watch={watch}
              />
            </li>
          ))
        : false}
    </ul>
  );
}

InstructionsList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInstructionRemoveClick: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

InstructionsList.defaultProps = {
  errors: null,
};
