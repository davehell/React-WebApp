import { t } from "../../localization/i18n";
import ErrorSection from "./ErrorSection";

const NotFound = (props) => {
  let title = t("recordNotFoundTitle");
  let msg = t("recordNotFound");

  if(props.type === "page") {
    title = t("pageNotFoundTitle");
    msg = t("pageNotFound");
  }

  return (
    <ErrorSection
      title={title}
      msg={msg}
      type="warning" />
  );
}

export default NotFound;
