import { useState } from "react";
import PropTypes from "prop-types";
import SettingsListItem from "./SettingsListItem";
import ChangeUsernameForm from "./ChangeUsernameForm";
import useUser from "../../../hooks/useUser";

export default function Username({ onChangeSuccess }) {
  const [editing, setEditing] = useState(false);
  const {
    user: { username },
  } = useUser();

  const handleChangeSuccess = (successMessage) => {
    onChangeSuccess(successMessage);
    setEditing(false);
  };

  return (
    <SettingsListItem headerText="Username">
      {editing ? (
        <ChangeUsernameForm
          onSuccess={handleChangeSuccess}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="settings-list-item-content">
          <span>{username}</span>
          <button
            onClick={() => setEditing(true)}
            className="btn-link"
            type="button"
          >
            Change
          </button>
        </div>
      )}
    </SettingsListItem>
  );
}

Username.propTypes = {
  onChangeSuccess: PropTypes.func.isRequired,
};
