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
import { convertPersonFromOData } from '../../model/person';

export default function PersonDetail( ) {
  const { id } = useParams();
  const { ajaxAction } = useAjax();
  const [person, setPerson] = useState();

  useEffect(() => {
    document.title = `${t("person")} ${person ? ": " + person.Name : ""}`;
  }, [person]);

  //dotaz na detail kapely
  const fetchData = useCallback(async (id) => {
    return await ajaxAction("Persons", id, "?$select=Id,Name,DateInsert,FirstName,LastName");
  }, [ajaxAction]);
  const { sendRequest: loadDetail, isHttpLoading, httpError, httpResponse} = useHttp(fetchData, true);

  //podle ID v parametrech načíst informace o kapele
  useEffect(() => {
    if(id) {
      loadDetail(id);
    }
  }, [id, loadDetail]);

  //zpracování odpovědi
  useEffect(() => {
    if (isHttpLoading) {
      setPerson(null);
    }
    if(httpResponse) {
      let model = convertPersonFromOData(httpResponse);
      setPerson(model);
    }
  }, [isHttpLoading, httpResponse]);

  let actions = [
    <BtnEdit
      key="btnEdit"
      url={`/person/edit/${id}`}
    />
    ,<BtnDelete
      key="btnDelete"
      entity="Persons"
      id={id}
      url={`/persons`}
    />
  ];

   if(isHttpLoading) {
    return <LoadingPanel visible={true} />;
  }

  if(httpError) {
    return <NotFoundPage />;
  }

  if(!person) {
    return null;
  }

  return (
    <Fragment>
      <Section title={person?.Name} actions={actions}>
        <dl className="row">
          <dt className="col-lg-2">{t("id")}</dt>
          <dd className="col-lg-10">{person.Id}</dd>
          <dt className="col-lg-2">{t("name")}</dt>
          <dd className="col-lg-10">{person.Name}</dd>
          <dt className="col-lg-2">{t("dateInsert")}</dt>
          <dd className="col-lg-10">{formatDate(person.DateInsert, "shortDate")}</dd>
        </dl>
      </Section>
    </Fragment>
  )
};
