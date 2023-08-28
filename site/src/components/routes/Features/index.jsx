import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Fade } from "@mui/material";
import RecipeScrapingForm from "../../common/RecipeScrapingForm";
import reaper from "../../../assets/reaper.png";
import reaperReading from "../../../assets/reaper-reading.png";
import reaperCooking from "../../../assets/reaper-cooking.png";
import SignupForm from "../Signup/Form";
import HomeRecipeItem from "./RecipeItem";
import Recipe from "../../../utils/Recipe";
import "./index.css";

export default function Features() {
  const [recipe, setRecipe] = useState(null);

  const navigate = useNavigate();

  const handleRSFSubmit = (data) => {
    setRecipe(new Recipe({ ...data }));
  };

  return (
    <div id="home-page">
      <div className="view">
        <img className="the-recipe-reaper" src={reaper} alt="" />
        <section>
          <h2>
            Harvest recipes from <br />
            across the web
          </h2>
          <p>
            No need to scroll through ads and walls of text to reach a recipe.{" "}
            <br />
            RecipeReaper will find it for you.
          </p>
          <RecipeScrapingForm
            variant="inline"
            handleResponse={handleRSFSubmit}
          />
        </section>
      </div>
      <div className="view">
        <img className="the-recipe-reaper" src={reaperReading} alt="" />
        <section>
          <h2>
            Start building your <br /> online cookbook
          </h2>
          <p>Save recipes to your personal library.</p>
          <ul>
            <li>
              <FontAwesomeIcon className="icon" icon={faCircle} />
              <p>Save imported recipes and custom recipes</p>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faCircle} />
              <p>Access saved recipes across devices</p>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faCircle} />
              <p>Export recipe pdfs for printing and sharing</p>
            </li>
          </ul>
        </section>
      </div>
      <div className="view">
        <img className="the-recipe-reaper" src={reaperCooking} alt="" />
        <section>
          <h2>Create and customize</h2>
          <p>Add a personal touch to classic recipes.</p>
          <ul>
            <li>
              <FontAwesomeIcon className="icon" icon={faCircle} />
              Edit ingredients, instructions, and more
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faCircle} />
              Adjust recipe yields
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faCircle} />
              Create new recipes from scratch
            </li>
          </ul>
        </section>
      </div>
      <div className="form-wrapper">
        <SignupForm
          headerText="Get started"
          headerElement={
            <p className="signup-msg">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          }
          onSubmitSuccess={() => navigate("/dashboard")}
          formId="footer-signup-form"
        />
      </div>
      <Modal
        className="recipe-popup-modal"
        open={!!recipe}
        onClose={() => setRecipe(null)}
      >
        <Fade in={!!recipe}>
          <div className="modal-box">
            {recipe && (
              <HomeRecipeItem
                recipe={recipe}
                onBackClick={() => setRecipe(null)}
              />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
