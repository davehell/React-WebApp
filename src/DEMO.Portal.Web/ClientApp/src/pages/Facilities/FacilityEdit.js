import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddFacilityForm from "../../components/facilities/AddFacilityForm";
import { errorDialog, successDialog } from "../../components/UI/Dialog";
import LoadingPanel from "../../components/UI/LoadingPanel";
import Section from "../../components/UI/Section";
import { useAjax } from "../../contexts/ajax";
import useHttp from "../../hooks/use-http";
import { t } from "../../localization/i18n";
import { convertFacilitiesFromOData } from "../../model/facilities";
import NotFoundPage from "../NotFound";

export default function FacilityEdit(){
    const {id, locale} = useParams();
    const {ajaxUpdate, ajaxAction} = useAjax();
    let navigate = useNavigate();
    const [facility, setFacility] = useState();
    
    useEffect(() => {
        document.title = `${t("editFacility")}`;
    },[]);

    const fetchData = useCallback(async (id) => {
        return await ajaxAction("Facilities", id, "?$select=Id,Name,Description,OrganizationUnitRefId");
    }, [ajaxAction]);
    const {sendRequest: loadDetail, isHttpLoading, httpResponse, httpError} = useHttp(fetchData);

    const postData = useCallback(async (data) => {
        return await ajaxUpdate("Facilities", id, data);
    }, [ajaxUpdate, id]);
    const {sendRequest: updateItem, httpError : postHttperror, httpResponse: postHttpResponse} = useHttp(postData);

    useEffect(() => {
        if(id){
            loadDetail(id);
        }
    }, [id, loadDetail]);

    useEffect(() => {
        if(isHttpLoading){
            setFacility(null);
        }
        if(httpResponse){
            let model = convertFacilitiesFromOData(httpResponse);
            setFacility(model);
        }
    }, [isHttpLoading, httpResponse]);

    useEffect(() => {
        if(postHttperror){
            errorDialog(postHttperror);
        }
        if(postHttpResponse){
            successDialog(t("saved"));
            let url = `/facility/${postHttpResponse.Id}`;
            navigate(url);
        }
    }, [postHttpResponse, postHttperror, navigate, locale]);

    const handleFormSubmit = async (data) => {
        updateItem(data);
    };

    if(httpError){
        return <NotFoundPage />;
    }

    if(!facility){
        return null;
    }

    return (
        <Fragment>
            <Section title={t("editFacility")}>
                <AddFacilityForm onSubmit={handleFormSubmit} data={facility} />
            </Section>
            <LoadingPanel isVisible={isHttpLoading} />
        </Fragment>
    )
}