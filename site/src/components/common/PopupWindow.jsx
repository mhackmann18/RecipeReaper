import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./PopupWindow.css";

export default function PopupWindow({
  isOpening,
  setIsOpening,
  onClose,
  children,
}) {
  const popupRef = useRef(null);

  function closePopup() {
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.style.opacity = 0;
    // Fade out time should be the same as the transition duration in css file
    setTimeout(() => {
      popupContainer.style.display = "none";
      if (onClose) {
        onClose();
      }
    }, 500);
  }

  function openPopup() {
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.style.display = "block";

    setTimeout(() => {
      popupContainer.style.opacity = 1;
    }, 100);
  }

  function getPopupMargins() {
    if (!popupRef.current) {
      return {};
    }

    const popupHeight = popupRef.current.offsetHeight;
    const viewportHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    const marginTop =
      popupHeight > viewportHeight - 40
        ? 20
        : (viewportHeight - popupHeight) / 2;
    const marginBottom = popupHeight > viewportHeight - 40 ? 20 : 0;

    return { marginTop, marginBottom };
  }

  useEffect(() => {
    if (isOpening) {
      setIsOpening(false);
      openPopup();
    }
  });

  return (
    <div className="popup-container" onClick={() => closePopup(onClose)}>
      <div
        className="popup"
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        style={getPopupMargins(popupRef)}
      >
        <FontAwesomeIcon
          icon={faXmark}
          size="xl"
          className="btn"
          id="close-popup-btn"
          onClick={() => closePopup(onClose)}
        />
        {children}
      </div>
    </div>
  );
}

PopupWindow.propTypes = {
  isOpening: PropTypes.bool.isRequired,
  setIsOpening: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

PopupWindow.defaultProps = {
  onClose: () => null,
};
