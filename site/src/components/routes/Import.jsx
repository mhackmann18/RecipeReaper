import { useNavigate } from "react-router-dom";
import RecipeScrapingForm from "../common/RecipeScrapingForm";
import reaper from "../../assets/reaper.png";
import "./Import.css";

export default function Import() {
  const navigate = useNavigate();

  const handleSubmit = (res) =>
    navigate("/dashboard/import-recipe/search", { state: { data: res } });

  return (
    <div id="import-page">
      <div className="center-content">
        <img className="mascot" src={reaper} alt="reaper" />
      </div>
      <RecipeScrapingForm handleResponse={handleSubmit} />
    </div>
  );
}
