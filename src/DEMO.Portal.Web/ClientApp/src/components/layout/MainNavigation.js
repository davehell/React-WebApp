import { t } from "../../localization/i18n";
import { useAuth } from '../../contexts/auth';
import MainNavigationItem from './MainNavigationItem';

const MainNavigation = (props) => {
  const { loggedPerson } = useAuth();

  return (
    <ul className="nav ms-auto">
      {loggedPerson && (<MainNavigationItem to="/dashboard" icon="home" title={t("dashboard")} />)}
      {loggedPerson && (<MainNavigationItem to="/persons" icon="users" title={t("persons")} />)}
      {loggedPerson && (<MainNavigationItem to="/task2" icon="toolbox" title={t("task2")} /> )}
      {loggedPerson && (<MainNavigationItem to="/about" icon="info-circle" title={t("about")} />)}
      {loggedPerson &&  (<MainNavigationItem to="/profile" icon="user" title={loggedPerson.LastName} />)}
      {loggedPerson && (<MainNavigationItem to="/logout" icon="sign-out" title={t("logOut")} />)}
      {!loggedPerson && (<MainNavigationItem to="/login" icon="sign-in" title={t("loginTitle")} />)}
    </ul>
  );
};

export default MainNavigation;
