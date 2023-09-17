import { Skeleton } from "@mui/material";
import "./LoadingRecipeItem.css";

export default function LoadingRecipeItem() {
  return (
    <div className="recipe-container loading-recipe-item">
      <header id="recipe-header">
        <div className="left">
          <div className="loading-recipe-title">
            <Skeleton height="100%" variant="rounded" />
          </div>
          <Skeleton className="loading-recipe-sub-heading" variant="rounded" />
        </div>
        <div className="right">
          <div className="loading-recipe-buttons">
            <Skeleton height="100%" variant="rounded" />
          </div>
        </div>
      </header>
      <div id="recipe-content" className="two-col">
        <div className="left">
          <div
            id="ingredients-container"
            className="loading-recipe-ingredients"
          >
            <Skeleton variant="rounded" height="100%" />
          </div>
        </div>
        <div className="right">
          <div
            id="instructions-container"
            className="loading-recipe-instructions"
          >
            <Skeleton height="100%" variant="rounded" />
          </div>
          <div className="nutrients-container loading-recipe-nutrients">
            <Skeleton height="100%" variant="rounded" />
          </div>
        </div>
      </div>
      <div className="loading-recipe-url">
        <Skeleton variant="rounded" width="16rem" />
      </div>
    </div>
  );
}
