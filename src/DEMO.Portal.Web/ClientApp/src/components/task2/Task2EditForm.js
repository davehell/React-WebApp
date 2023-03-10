import { Button, TextBox, Validator } from "devextreme-react"
import { RequiredRule } from "devextreme-react/data-grid";
import { Fragment, useCallback, useEffect, useRef} from "react"
import { useDxInput } from "../../hooks/useDxInput"
import { t } from "../../localization/i18n"
import Section from "../UI/Section";


export default function Task2EditForm({data, onSubmit}){
    const descriptionInput = useDxInput(data?.Description);
    const descriptionTextBox = useRef(null);

    useEffect(() => {
        if(descriptionTextBox && descriptionTextBox.current){
            descriptionTextBox.current.instance.focus();
        }
        if(data){
            descriptionInput.setInputValue(data.Description);
        }
    }, [descriptionTextBox, data, descriptionInput.setInputValue]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        let model = {
            Description: descriptionInput.value
        };
        onSubmit(model);
      }, [onSubmit, descriptionInput]);

    if(!data){
        return null;
    }

    return(
        <Fragment>
            <Section title={t("edit")}>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                <label className="col-form-label col-lg-5">{t("description")}</label>
                   <TextBox
                   {...descriptionInput}
                   descriptionInput
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
                        disabled={!descriptionInput.value || descriptionInput.value === data?.Description}
                        />
                    </div>
                </div>
            </form>
            </Section>
        </Fragment>
    )

}