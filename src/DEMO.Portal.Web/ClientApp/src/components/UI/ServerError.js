import { t } from "../../localization/i18n";
import ErrorSection from "./ErrorSection";

const ServerError = (props) => {
  let title = t("serverErrorTitle");
  let msg = t("serverError");

  return (
    <ErrorSection
      title={title}
      msg={msg}
      type="error" />
  );
}

export default ServerError;
