import { Fragment, useCallback, useEffect, useState } from 'react';
import { t } from "../../localization/i18n";
import Section from '../../components/UI/Section';
import useHttp from '../../hooks/use-http';
import { useAjax } from "../../contexts/ajax";
import { useParams } from 'react-router-dom';
import LoadingPanel from '../../components/UI/LoadingPanel';
import BtnDelete from '../../components/UI/BtnDelete';
import BtnEdit from '../../components/UI/BtnEdit';
import { formatDate } from 'devextreme/localization';
import NotFoundPage from '../NotFound';
import model, { convertFacilitiesFromOData } from '../../model/facilities';

export default function FacilityDetail(){
    const {id} = useParams();
    const {ajaxAction} = useAjax();
    const [facility, setFacility] = useState();

    useEffect(() =>{
        document.title = `${t("facility")} ${facility ? ": " + facility.Name : ""}`;
    }, [facility])

    const fetchData = useCallback(async (id) => {
        return await ajaxAction("Facilities", id, "?$expand=OrganizationUnit");
    }, [ajaxAction]);
    const {sendRequest: loadDetail, isHttpLoading, httpError, httpResponse} = useHttp(fetchData, true);

    useEffect(() => {
        if(id){
            loadDetail(id);
        }
    }, [id, loadDetail]);

    useEffect(() => {
        if(httpResponse){
            let model = convertFacilitiesFromOData(httpResponse);
            setFacility(model);
        }
    }, [isHttpLoading, httpResponse]);

    let actions = [
        <BtnEdit
        key="btnEdit"
        url={`/facility/edit/${id}`} 
        />,
        
        <BtnDelete
        key="btnDelete"
        entity="Facilities"
        id={id}
        url={`/dashboard`}
        />
    ]

    if(isHttpLoading){
        return <LoadingPanel visible={true} />
    }

    if(httpError){
        console.log("httpError")
        return <NotFoundPage />
    }

    if(!facility){
        return null;
    }

    return(
        <Fragment>
            <Section title={facility.Name} actions={actions}>
            <dl className="row">
          <dt className="col-lg-2">{t("id")}</dt>
          <dd className="col-lg-10">{facility.Id}</dd>
          <dt className="col-lg-2">{t("name")}</dt>
          <dd className="col-lg-10">{facility.Name}</dd>
          <dt className="col-lg-2">{t("description")}</dt>
          <dd className="col-lg-10">{facility.Description}</dd>
        </dl>
        </Section>
        </Fragment>
    )
}