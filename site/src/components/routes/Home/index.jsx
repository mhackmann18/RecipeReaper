import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Fade } from "@mui/material";
import RecipeScrapingForm from "../../common/RecipeScrapingForm";
import reaper from "../../../assets/reaper.png";
import reaperReading from "../../../assets/reaper-reading.png";
import reaperCooking from "../../../assets/reaper-cooking.png";
import mouseScroll from "../../../assets/mouse-scroll.gif";
import SignupForm from "../Signup/Form";
import HomeRecipeItem from "./RecipeItem";
import Recipe from "../../../utils/Recipe";
import "./index.css";

export default function Home() {
  const [mouseScrollActive, setMouseScrollActive] = useState(true);
  const [recipe, setRecipe] = useState(null);

  const navigate = useNavigate();

  const handleScroll = (e) => {
    setMouseScrollActive(e.target.scrollingElement.scrollTop === 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const handleRSFSubmit = (data) => {
    setRecipe(new Recipe({ ...data }));
  };

  return (
    <div id="home-page">
      <div id="home-window-1" className="home-window">
        <div className="h-box">
          <div className="left-content">
            <img className="mascot" src={reaper} alt="mascot" />
          </div>
          <div className="right-content text-box">
            <div>
              <h2 className="title">
                Harvest recipes from <br />
                across the web
              </h2>
              <p>
                No need to scroll through ads and walls of text to reach a
                recipe. <br />
                RecipeReaper will find it for you.
              </p>
              <RecipeScrapingForm
                variant="inline"
                handleResponse={handleRSFSubmit}
              />
            </div>
          </div>
        </div>
        <img
          className={`mouse-scroll-gif${mouseScrollActive ? "" : " hidden"}`}
          src={mouseScroll}
          alt="mouse-gif"
        />
      </div>
      <div id="home-window-2" className="home-window">
        <div className="h-box">
          <div className="left-content text-box">
            <div>
              <h2 className="title">
                Start building your
                <br /> online cookbook
              </h2>
              <p>Save recipes to your personal library.</p>
              <ul>
                <li>
                  <FontAwesomeIcon className="icon" icon={faCircle} />
                  Save imported recipes and custom recipes
                </li>
                <li>
                  <FontAwesomeIcon className="icon" icon={faCircle} />
                  Access saved recipes across devices
                </li>
                <li>
                  <FontAwesomeIcon className="icon" icon={faCircle} />
                  Export recipe pdfs for printing and sharing
                </li>
              </ul>
            </div>
          </div>
          <div className="right-content">
            <img className="mascot" src={reaperReading} alt="" />
          </div>
        </div>
      </div>
      <div id="home-window-3" className="home-window">
        <div className="h-box">
          <div className="left-content">
            <img className="mascot" src={reaperCooking} alt="reaper-cooking" />
          </div>
          <div className="right-content text-box">
            <div>
              <h2 className="title">Create and customize</h2>
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
            </div>
          </div>
        </div>
      </div>
      <div className="form-wrapper">
        <SignupForm
          headerText="Get started"
          headerElement={
            <p id="signup-msg">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          }
          onSubmitSuccess={() => navigate("/dashboard")}
          formId="footer-signup-form"
        />
      </div>
      <Modal id="recipe-modal" open={!!recipe} onClose={() => setRecipe(null)}>
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
