import ToggleTheme from "../../common/ToggleTheme";
import SettingsListItem from "./SettingsListItem";
import useUser from "../../../hooks/useUser";

export default function Theme() {
  const {
    user: { theme },
  } = useUser();

  return (
    <SettingsListItem headerText="Theme">
      <div className="settings-list-item-content">
        <span>{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</span>
        <ToggleTheme variant="small" />
      </div>
    </SettingsListItem>
  );
}
