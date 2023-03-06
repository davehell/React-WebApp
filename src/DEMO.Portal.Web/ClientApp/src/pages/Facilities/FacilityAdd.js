import { Fragment, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddFacilityForm from "../../components/facilities/AddFacilityForm";
import { errorDialog, successDialog } from "../../components/UI/Dialog";
import LoadingPanel from "../../components/UI/LoadingPanel";
import Section from "../../components/UI/Section";
import { useAjax } from "../../contexts/ajax";
import useHttp from "../../hooks/use-http";
import { t } from "../../localization/i18n";


export default function FacilityAdd(){
    const {locale} = useParams();
    const { ajaxCreate } = useAjax();
    let navigate = useNavigate();

    useEffect(() => {
        document.title = `${t("newFacility")}`
    }, []);

    const fetchData = useCallback(async (data) => {
        return await ajaxCreate("Facilities", data);
    }, [ajaxCreate]);
    const {sendRequest: createItem, isHttpLoading, httpError, httpResponse} = useHttp(fetchData);

    useEffect(() => {
        if(httpError){
            errorDialog(httpError);
        }
        if(httpResponse){
            successDialog(t("saved"));
            if(httpResponse.Id){
            let url = `/facility/${httpResponse.Id}`
            navigate(url);
        }
    }
    }, [httpResponse, httpError, navigate, locale]);

    const handleFormSubmit = async(data) => {
        createItem(data);
    }

    return (
        <Fragment>
            <Section title={t("newFacility")}>
                <AddFacilityForm onSubmit={handleFormSubmit} />
            </Section>
            <LoadingPanel isVisible={isHttpLoading} />
        </Fragment>
    )
}
