import { useState, Fragment, useEffect } from 'react';
import { t } from "../localization/i18n";
import LoadingPanel from '../components/UI/LoadingPanel';
import { alert } from "devextreme/ui/dialog";
import { useAuth } from '../contexts/auth';
import './Login.css';
import { addBodyClass, removeBodyClass } from '../lib/common';
import { useNavigate } from "react-router-dom";
import LoginForm from '../components/login/LoginForm';
import { useLocation } from 'react-router-dom';

const Login = (props) => {
  const USERNAME_KEY = "username";
  const { signIn, isAuthInProgress } = useAuth();
  const { state: locationState } = useLocation();
  let navigate = useNavigate();
  const [ formData, setFormData ] = useState();

  useEffect(() => {
    document.title = `${t("webName")}: ${t("loginTitle")}`;
    addBodyClass("Login"); //použití viz Login.css

    let data = { username: localStorage.getItem(USERNAME_KEY) || "" };
    setFormData(data);

    // Clean up
    return () => {
      removeBodyClass("Login");
    };
  }, []);

  const handleFormSubmit = async (data) => {
    let result = await signIn(data.username, data.password);
    if(result.isOk) {
      localStorage.setItem(USERNAME_KEY, data.username);

      if (locationState?.redirectTo) {
        const { redirectTo } = locationState;
        navigate(`${redirectTo.pathname}${redirectTo.search}`);
      }
      else {
        navigate("/");
      }
    }
    else {
      alert(result.msg, t("loginError") );
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="formWrapper">
          <LoginForm data={formData} onSubmit={handleFormSubmit} />
        </div>
      </div>
      <LoadingPanel visible={isAuthInProgress} />
    </Fragment>
  );
};

export default Login;
