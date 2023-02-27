import { Fragment, useCallback, useEffect } from 'react';
import { t } from "../../localization/i18n";
import Section from '../../components/UI/Section';
import useHttp from '../../hooks/use-http';
import { useAjax } from "../../contexts/ajax";
import { errorDialog, successDialog } from '../../components/UI/Dialog';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPanel from '../../components/UI/LoadingPanel';
import AddPersonForm from '../../components/persons/AddPersonForm';

export default function PersonAdd( ) {
  const { locale } = useParams();
  const { ajaxCreate } = useAjax();
  let navigate = useNavigate();

  useEffect(() => {
    document.title = `${t("newPerson")}`;
  }, []);

  const fetchData = useCallback(async (data) => {
    return await ajaxCreate("Persons", data);
  }, [ajaxCreate]);
  const { sendRequest: createItem, isHttpLoading, httpError, httpResponse} = useHttp(fetchData);

  //zpracování odpovědi
  useEffect(() => {
    if(httpError) {
      errorDialog(httpError);
    }
    if(httpResponse) {
      successDialog(t("saved"));
      if(httpResponse.Id) {
        let url = `/person/${httpResponse.Id}`;
        navigate(url);
      }
    }
  }, [httpResponse, httpError, navigate, locale]);

  const handleFormSubmit = async (data) => {
    createItem(data);
  };

  return (
    <Fragment>
      <Section title={t("newPerson")}>
        <AddPersonForm onSubmit={handleFormSubmit} />
      </Section>
      <LoadingPanel isVisible={isHttpLoading} />
    </Fragment>
  )
};
