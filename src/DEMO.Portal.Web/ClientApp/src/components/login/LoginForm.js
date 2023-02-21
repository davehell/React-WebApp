import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import logo from "../../assets/logo.png";
import { t } from "../../localization/i18n";
import Panel from "../UI/Panel";

const LoginForm = (props) => {
  const { onSubmit, data } = props;
  const { state: locationState } = useLocation();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const usernameTextBox = useRef(null);

  useEffect(() => {
    if(data?.username) {
      setUsername(data.username);
    }
  }, [data]);

  //focus do username pole
  useEffect(() => {
    if(usernameTextBox && usernameTextBox.current) {
      usernameTextBox.current.instance.focus();
    }
  }, [usernameTextBox]);

  const onInputChange = useCallback((e) => {
    if (e.element.getAttribute("name") === "username") {
      setUsername(e.value);
    }
    if (e.element.getAttribute("name") === "password") {
      setPassword(e.value);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: username,
      password: password
    }
    onSubmit(data);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <img src={logo} height="50px" alt="logo" />

        {locationState?.redirectTo && (
          <Panel icon="circle-info" type="info" text={t("loginRequired")} />
        )}

        <div className="mb-2">
          <TextBox
            ref={usernameTextBox}
            value={username}
            elementAttr={{name: "username"}}
            inputAttr={{id: "username"}}
            placeholder={t("username")}
            onValueChanged={onInputChange} />
        </div>

        <div className="mb-4">
          <TextBox
            value={password}
            mode={"password"}
            elementAttr={{name: "password"}}
            inputAttr={{id: "password"}}
            placeholder={t("password")}
            onValueChanged={onInputChange} />
        </div>

        <div className="mb-4">
          <Button
            className="btn btn-primary"
            useSubmitBehavior={true}
            text={t("loginBtn")}
          />
        </div>

        <small id="version">{window.Configs && window.Configs.VersionApp ? window.Configs.VersionApp : ""}</small>
      </form>
      
    </Fragment>
  );
}

export default LoginForm;
