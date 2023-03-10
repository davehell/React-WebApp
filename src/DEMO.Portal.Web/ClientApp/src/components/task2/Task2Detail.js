import { Fragment } from "react";
import { t } from "../../localization/i18n";
import Section from "../UI/Section";

export default function Task2Detail({data}) {

    if(!data){
        return null;
    }

    return(
        <Fragment>
        <Section title={data.Name}>
            <dl className="row">
          <dt className="col-lg-2">{t("id")}</dt>
          <dd className="col-lg-10">{data.Id}</dd>
          <dt className="col-lg-2">{t("name")}</dt>
          <dd className="col-lg-10">{data.Name}</dd>
          <dt className="col-lg-2">{t("description")}</dt>
          <dd className="col-lg-10">{data.Description}</dd>
        </dl>
        </Section>
        </Fragment>
    );
}