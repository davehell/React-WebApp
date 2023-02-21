import { t } from "../../localization/i18n";
import ErrorSection from "./ErrorSection";

const Unauthorized = (props) => {
  return (
    <ErrorSection
      title={t("unathorizedTitle")}
      msg={t("unathorized")}
      type="warning" />
  );
}

export default Unauthorized;
