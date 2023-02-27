import { Fragment, useCallback, useEffect, useState } from 'react';
import { t } from "../../localization/i18n";
import Section from '../../components/UI/Section';
import useHttp from '../../hooks/use-http';
import { useAjax } from "../../contexts/ajax";
import { errorDialog, successDialog } from '../../components/UI/Dialog';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPanel from '../../components/UI/LoadingPanel';
import NotFoundPage from '../NotFound';
import AddPersonForm from '../../components/persons/AddPersonForm';
import { convertPersonFromOData } from '../../model/person';

export default function PersonEdit( ) {
  const { id, locale } = useParams();
    const { ajaxUpdate, ajaxAction } = useAjax();
  let navigate = useNavigate();
  const [person, setPerson] = useState();

  useEffect(() => {
    document.title = `${t("editPerson")}`;
  }, []);

  //dotaz na detail osoby
  const fetchData = useCallback(async (id) => {
    return await ajaxAction("Persons", id, "?$select=Id,Name,DateInsert");
  }, [ajaxAction]);
  const { sendRequest: loadDetail, isHttpLoading, httpResponse, httpError} = useHttp(fetchData, true);
  
  //odeslání formuláře
  const postData = useCallback(async (data) => {
    return await ajaxUpdate("Persons", id, data);
  }, [ajaxUpdate, id]);
  const { sendRequest: updateItem, httpError: postHttpError, httpResponse: postHttpResponse} = useHttp(postData);

  //podle ID v parametrech načíst informace o skladbě
  useEffect(() => {
    if(id) {
      loadDetail(id);  
    }
  }, [id, loadDetail]);

  //zpracování odpovědi - detail
  useEffect(() => {
    if (isHttpLoading) {
      setPerson(null);
    }
    if(httpResponse) {
      let model = convertPersonFromOData(httpResponse);
      setPerson(model);
    }
  }, [isHttpLoading, httpResponse]);

  //zpracování odpovědi - post
  useEffect(() => {
    if(postHttpError) {
      errorDialog(postHttpError);
    }
    if(postHttpResponse) {
      successDialog(t("saved"));
      let url = `/person/${postHttpResponse.Id}`;
      navigate(url);
    }
  }, [postHttpResponse, postHttpError, navigate, locale]);

  const handleFormSubmit = async (data) => {
    updateItem(data);
  };

  if(httpError) {
    return <NotFoundPage />;
  }

  if(!person) {
    return null;
  }

  return (
    <Fragment>
      <Section title={t("editPerson")}>
        <AddPersonForm data={person} onSubmit={handleFormSubmit} />
      </Section>
      <LoadingPanel isVisible={isHttpLoading} />
    </Fragment>
  )
};

