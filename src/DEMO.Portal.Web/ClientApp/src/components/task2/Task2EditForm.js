import { Button, TextBox, Validator } from "devextreme-react"
import { RequiredRule } from "devextreme-react/data-grid";
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { t } from "../../localization/i18n"
import Section from "../UI/Section";

export default function Task2EditForm({ data, onSubmit }) {
  const descriptionTextBox = useRef(null);
  const [description, setDescription] = useState();

  useEffect(() => {
    setDescription(data?.Description);
  }, [data]);
  
  useEffect(() => {
    if (descriptionTextBox && descriptionTextBox.current) {
      descriptionTextBox.current.instance.focus();
    }

  }, [descriptionTextBox]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    let model = {
      Description: description
    };
    onSubmit(model);
  }, [onSubmit, description]);

  const onValueChanged = useCallback((e) => {
    setDescription(e.value);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Fragment>
      <Section title={t("edit")}>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-form-label col-lg-5">{t("description")}</label>
            <TextBox
              value={description}
              onValueChanged={onValueChanged}
              ref={descriptionTextBox}
            >
              <Validator>
                <RequiredRule />
              </Validator>
            </TextBox>
          </div>
          <div className="form-group row">
            <div className="col-10">
              <Button
                className="btn btn-primary"
                useSubmitBehavior={true}
                text={t("save")}
                disabled={!description ? true : false}
              />
            </div>
          </div>
        </form>
      </Section>
    </Fragment>
  );
}