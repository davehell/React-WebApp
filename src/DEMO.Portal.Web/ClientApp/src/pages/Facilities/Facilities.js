import { Fragment, useCallback, useEffect } from 'react';
import { t } from "../../localization/i18n";
import Section from '../../components/UI/Section';
import { useNavigate } from 'react-router-dom';
import FacilitiesGrid from '../../components/facilities/FacilitiesGrid';
import { Button } from 'devextreme-react';


export default function Facilities(){

    let navigate = useNavigate();

    useEffect(() => {
        document.title = `${t("facilities")}`;
    }, []);

    const onFacilitySelected = useCallback((id) =>{
        let url = `/facility/${id}`
        navigate(url);
    }, [navigate]);

    const btnAddFacilityClick = useCallback(() => {
        let url = `/facility/add`
        navigate(url)
    }, [navigate])
    
    let actions = [
        <Button 
        key="btnAddFacility"
        onClick={btnAddFacilityClick}
        icon="fa-regular fa-plus"
        text={t("add")}
        hint={t("addFacilityHint")} />
    ];

    return(
        <Fragment>
            <Section title={"Facilities"} actions={actions}>
                <FacilitiesGrid onSelected={onFacilitySelected} />
            </Section>
        </Fragment>
    )
}