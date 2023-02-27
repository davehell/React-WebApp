import Button from 'devextreme-react/button';
import { t } from '../../localization/i18n';
import { Link } from 'react-router-dom';

export default function BtnEdit( { url } ) {
  return (
    <Link to={url}>
      <Button
        icon="fa-solid fa-edit"
        text={t("edit")}
      />
    </Link>
  );
}
