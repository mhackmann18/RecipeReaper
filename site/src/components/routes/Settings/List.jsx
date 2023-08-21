import Theme from "./Theme";
import Username from "./Username";
import Password from "./Password";
import "./List.css";
import useToast from "../../../hooks/useToast";
import Toast from "../../common/Toast";

export default function SettingsList() {
  const { closeToast, toast, addSuccessToastMessage } = useToast();

  return (
    <>
      <ul id="settings-list">
        <Theme />
        <Username onChangeSuccess={addSuccessToastMessage} />
        <Password onChangeSuccess={addSuccessToastMessage} />
      </ul>
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}
