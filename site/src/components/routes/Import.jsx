import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RecipeScrapingForm from "../common/RecipeScrapingForm";
import reaper from "../../assets/reaper.png";
import LoadingRecipeItem from "./Features/LoadingRecipeItem";
import "./Import.css";

export default function Import() {
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const navigate = useNavigate();

  return (
    <div id="import-page">
      {loadingRecipe && <LoadingRecipeItem />}
      <div className="form-wrapper" hidden={Boolean(loadingRecipe)}>
        <img className="mascot" src={reaper} alt="reaper" />
        <RecipeScrapingForm
          handleRecipeData={(data) =>
            navigate("/dashboard/import-recipe/search", {
              state: { data },
            })
          }
          loading={loadingRecipe}
          setLoading={setLoadingRecipe}
        />
      </div>
    </div>
  );
}
