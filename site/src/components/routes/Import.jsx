import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RecipeScrapingForm from "../common/RecipeScrapingForm";
import reaper from "../../assets/reaper.png";
import LoadingRecipeItem from "./Features/LoadingRecipeItem";
import "./Import.css";

export default function Import() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (res) =>
    navigate("/dashboard/import-recipe/search", { state: { data: res } });

  return (
    <div id="import-page">
      {loading ? (
        <LoadingRecipeItem />
      ) : (
        <>
          <div className="center-content">
            <img className="mascot" src={reaper} alt="reaper" />
          </div>
          <RecipeScrapingForm
            onSubmit={() => setLoading(true)}
            onSuccess={handleSubmit}
            onFailure={(error) => {
              setLoading(false);
              setErrorMessage(error);
            }}
            errorMessage={errorMessage}
          />
        </>
      )}
    </div>
  );
}
