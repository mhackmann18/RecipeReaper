import Spinner from "./Spinner";
// import crookImage from "../../assets/crook.jpg";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div id="loading-page">
      <div className="container">
        {/* <img className="crook-img" src={crookImage} />
        <h3>Preparing to pillage recipes . . .</h3> */}
        <Spinner />
      </div>
    </div>
  );
}
