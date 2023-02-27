import { Fragment, useCallback, useEffect, useRef } from "react";
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import { t } from "../../localization/i18n";
import Validator, { RequiredRule, StringLengthRule } from 'devextreme-react/validator';
import { useDxInput } from "../../hooks/useDxInput";

export default  function AddPersonForm ( {data, onSubmit} ) {
  const nameInput = useDxInput(data?.Name);
  const nameTextBox = useRef(null);

  //focus do textového pole
  useEffect(() => {
    if(nameTextBox && nameTextBox.current) {
      nameTextBox.current.instance.focus();
    }
  }, [nameTextBox]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    let data = {
      Name: nameInput.value
    }

    onSubmit(data);
  }, [nameInput, onSubmit]);


  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-form-label col-lg-2">{t("name")}</label>
          <div className="col-lg-10">
            <TextBox
              {...nameInput}
              ref={nameTextBox}
              nameInput
              placeholder={t("personNamePlaceholder")}
            >
              <Validator>
                <RequiredRule />
                <StringLengthRule max={200} message={t("maxLengthValidatorMsg", 200)} />
              </Validator>
            </TextBox>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-10 offset-2">
            <Button
              className="btn btn-primary"
              useSubmitBehavior={true}
              text={data ? t("save") : t("add")}
            />
          </div>
        </div>
      </form>
      
    </Fragment>
  );
}

