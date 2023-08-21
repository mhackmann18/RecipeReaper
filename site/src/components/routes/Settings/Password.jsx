import { useState } from "react";
import PropTypes from "prop-types";
import SettingsListItem from "./SettingsListItem";
import ChangePasswordForm from "./ChangePasswordForm";

export default function Password({ onChangeSuccess }) {
  const [editing, setEditing] = useState(false);

  const onSuccess = () => {
    onChangeSuccess("Password updated");
    setEditing(false);
  };

  return (
    <SettingsListItem headerText="Password">
      {editing ? (
        <ChangePasswordForm
          onCancel={() => setEditing(false)}
          onSuccessfulSubmit={onSuccess}
        />
      ) : (
        <div className="settings-list-item-content">
          <span>. . . . . . . .</span>
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

Password.propTypes = {
  onChangeSuccess: PropTypes.func.isRequired,
};
