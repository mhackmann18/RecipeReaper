/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import RecipeContainer from "../RecipeContainer";
import TitleInput from "./TitleInput";
import ServingsInput from "./ServingsInput";
import TimeInput from "./TimeInput";
import AddButton from "./AddButton";
import InstructionsList from "./InstructionsList";
import IngredientInputsList from "./IngredientsList";
import ServingSizeInput from "./ServingSizeInput";
import NutrientsList from "./NutrientsList";
import Recipe from "../../../utils/Recipe";
import RecipeValidator from "../../../utils/RecipeValidator";
import StandardModal from "../../common/StandardModal";
import ConfirmationDisplay from "../../common/ConfirmationDisplay";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";
import Buttons from "../Buttons";

export default function RecipeForm({
  rootRecipe,
  buttonSettings,
  closeForm,
  onSubmit,
}) {
  const [recipe, setRecipe] = useState(new Recipe({ ...rootRecipe }));
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
    servingSize,
    originalUrl,
    id,
  } = recipe;

  const [closeFormModalOpen, setCloseFormModalOpen] = useState(false);
  const { toast, addSuccessToastMessage, addErrorToastMessage, closeToast } =
    useToast();
  const {
    handleSubmit,
    register,
    unregister,
    watch,
    formState: { errors },
  } = useForm();

  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    const recipeData = Recipe.parseFormData(watch(), id);
    if (!rootRecipe.isEquivalent(recipeData) && !isFormDirty) {
      setIsFormDirty(true);
    }
    if (rootRecipe.isEquivalent(recipeData) && isFormDirty) {
      setIsFormDirty(false);
    }
  }, [watch()]);

  const handleBackButtonClick = () => {
    const recipeData = Recipe.parseFormData(watch(), id);

    if (!rootRecipe.isEquivalent(recipeData)) {
      setCloseFormModalOpen(true);
    } else {
      closeForm();
    }
  };

  const onFormSubmit = (formData) => {
    if (isFormDirty) {
      const recipeData = Recipe.parseFormData(formData, id);

      if (recipeData.error) {
        addErrorToastMessage(recipeData.error);
        return false;
      }

      onSubmit(recipeData);
    }
  };

  return (
    <form
      id="recipe"
      className="form-style"
      onSubmit={handleSubmit(onFormSubmit)}
      noValidate
    >
      <RecipeContainer
        titleComponent={
          <TitleInput
            errorMessage={errors.title?.message}
            startValue={title}
            {...register("title", {
              validate: RecipeValidator.getTitleErrMsg,
            })}
          />
        }
        subHeadingComponent={
          <>
            <ServingsInput
              startValue={servings}
              errorMessage={errors.servings?.message}
              {...register("servings", {
                validate: RecipeValidator.getServingsErrMsg,
              })}
            />
            <TimeInput
              labelText="Prep Time"
              startValue={prepTime}
              errorMessage={errors.prepTime?.message}
              {...register("prepTime", {
                validate: RecipeValidator.getTimeErrMsg,
                required: false,
              })}
            />
            <TimeInput
              labelText="Cook Time"
              startValue={cookTime}
              errorMessage={errors.cookTime?.message}
              {...register("cookTime", {
                validate: RecipeValidator.getTimeErrMsg,
                required: false,
              })}
            />
          </>
        }
        buttonsComponent={
          <Buttons
            buttonSettings={
              buttonSettings || {
                back: { onClick: handleBackButtonClick },
                saveChanges: {
                  onClick: () => null,
                  ...(!isFormDirty && { variant: "inactive" }),
                },
              }
            }
          />
        }
        ingredientsHeaderButtonComponent={
          <AddButton
            text="Add Ingredient"
            onClick={() => {
              recipe.addIngredient("", "", 0);
              setRecipe(new Recipe({ ...recipe }));
            }}
          />
        }
        ingredientsComponent={
          <IngredientInputsList
            ingredients={ingredients}
            onDeleteIngredient={(ingredientId, successMessage) => {
              unregister(`ingredients.${ingredientId}`);
              recipe.removeIngredientById(ingredientId);
              setRecipe(new Recipe({ ...recipe }));
              addSuccessToastMessage(successMessage);
            }}
            register={register}
            watch={watch}
            ingredientsErrors={errors.ingredients}
          />
        }
        instructionsHeaderButtonComponent={
          <AddButton
            text="Add Step"
            onClick={() => {
              recipe.addInstruction("");
              setRecipe(new Recipe({ ...recipe }));
            }}
          />
        }
        instructionsComponent={
          <InstructionsList
            instructions={instructions}
            onInstructionRemoveClick={(instructionId) => {
              unregister(`instructions.${instructionId}`);
              recipe.removeInstructionById(instructionId);
              setRecipe(new Recipe({ ...recipe }));
              addSuccessToastMessage("Instructions step deleted");
            }}
            register={register}
            watch={watch}
            errors={errors.instructions}
          />
        }
        nutrientsComponent={
          <>
            <ServingSizeInput
              servingSize={servingSize}
              register={register}
              servingSizeErrors={errors.servingSize}
            />
            <NutrientsList
              nutrients={nutrients}
              register={register}
              errors={errors}
            />
          </>
        }
        originalRecipeUrl={originalUrl}
      />
      <StandardModal
        open={closeFormModalOpen}
        handleClose={() => setCloseFormModalOpen(false)}
      >
        <ConfirmationDisplay
          headerText="Unsaved Changes"
          messageText="Are you sure you want to leave this page? Changes you made will not be saved."
          cancelBtnText="Cancel"
          onCancel={() => setCloseFormModalOpen(false)}
          confirmBtnText="Leave Page"
          onConfirm={() => {
            closeForm();
          }}
        />
      </StandardModal>
      <Toast state={toast} onClose={closeToast} />
    </form>
  );
}

RecipeForm.propTypes = {
  rootRecipe: PropTypes.instanceOf(Recipe).isRequired,
  closeForm: PropTypes.func,
  buttonSettings: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

RecipeForm.defaultProps = {
  closeForm: () => null,
  buttonSettings: null,
};
