import { Button, Lookup, TextBox, Validator } from "devextreme-react";
import { RequiredRule, StringLengthRule } from "devextreme-react/data-grid";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useAjax } from "../../contexts/ajax";
import useHttp from "../../hooks/use-http";
import { useDxInput } from "../../hooks/useDxInput";
import { t } from "../../localization/i18n";
import { convertOrganizationUnitFromOData } from "../../model/organizationUnits";
import LoadingPanel from "../UI/LoadingPanel";

export default function AddFacilityForm({data, onSubmit}){
    const nameInput = useDxInput(data?.Name)
    const nameTextBox = useRef(null);
    const descriptionInput = useDxInput(data?.Description);
    const {ajaxAction} = useAjax();
    const [dataSource, setDataSource] = useState();
    const organizationUnitInput  = useDxInput(data?.OrganizationUnitRefId);

    useEffect(() => {
        if(nameTextBox && nameTextBox.current){
            nameTextBox.current.instance.focus();
        }
    }, [nameTextBox]);

    //Nahrani organizationUnit
    const fetchData = useCallback(async () => {
        return await ajaxAction("OrganizationUnits", null, "");
    }, [ajaxAction]);
    const {sendRequest: loadList, isHttpLoading, httpResponse} = useHttp(fetchData);

    useEffect(() => {
        loadList();
    }, [loadList]);

    useEffect(() => {
        if(isHttpLoading === false){
            if(httpResponse?.value){
                let ds = httpResponse.value.map(data => convertOrganizationUnitFromOData(data));
                setDataSource(ds);
            }
        }
    }, [isHttpLoading, httpResponse, data]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        
        let data = {
            Name: nameInput.value,
            Description: descriptionInput.value,
            OrganizationUnitRefId: organizationUnitInput.value
        };
        onSubmit(data);
    }, [nameInput, descriptionInput, organizationUnitInput, onSubmit]);


    return(
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label className="col-form-label col-lg-2">{t("name")}</label>
                    <div className="col-lg-10">
                    <TextBox 
                    {...nameInput}
                    ref={nameTextBox}
                    nameInput
                    placeholder={t("facilityNamePlaceholder")}>

                    <Validator>
                        <RequiredRule />
                        <StringLengthRule max={200} message={t("maxLengthValidatorMsg", 200)} />
                    </Validator>

                    </TextBox>    
                    </div>
                    <label className="col-form-label col-lg-2">{t("description")}</label>
                    <div className="col-lg-10">
                        <TextBox
                        {...descriptionInput}
                        descriptionInput
                        placeholder={t("facilityDescriptionPlaceholder")}>
                            
                            <Validator>
                                <StringLengthRule max={500} message={t("maxLengthValidatorMsg", 500)} />
                            </Validator>

                        </TextBox>
                    </div>  
                    <label className="col-form-label col-lg-2">{t("organizationUnit")}</label>
                    <div className="col-lg-10">
                        <Lookup 
                        {...organizationUnitInput}
                        dataSource={dataSource} 
                        organizationUnitInput
                        valueExpr={"Id"}
                        displayExpr={"Name"}

                        >
                            <Validator>
                                <RequiredRule />
                            </Validator>
                        </Lookup>
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
            <LoadingPanel isVisible={isHttpLoading} />
        </Fragment>
    )
}