import Button from 'devextreme-react/button';
import { Fragment, useCallback, useEffect } from 'react';
import { t } from '../../localization/i18n';
import { confirm, errorDialog, successDialog } from './Dialog';
import { useAjax } from "../../contexts/ajax";
import useHttp from "../../hooks/use-http";
import LoadingPanel from './LoadingPanel';
import { useNavigate } from 'react-router-dom';

export default function BtnDelete( { entity, id, url} ) {
  const { ajaxDelete } = useAjax();
  let navigate = useNavigate();

  //odeslání požadavku
  const fetchData = useCallback(async (params) => {
    return await ajaxDelete(params.entity, params.id);
  }, [ajaxDelete]);
  const { sendRequest, isHttpLoading, httpError, httpResponse } = useHttp(fetchData);

  //zpracování odpovědi
  useEffect(() => {
    if(httpError) {
      errorDialog(httpError);
    }
    else if(httpResponse) {
      successDialog(t("deleted"));
      navigate(url);
    }
  }, [httpResponse, httpError, navigate, url]);

  //klik na tlačítko
  const btnDeleteClick = useCallback(() => {
    confirm.fire({
      title: t("delete"),
      text: t("confirmDeleteItem")
    }).then(function(result) {
      if (result.value) {
        let params = {
          entity: entity,
          id: id
        }
        sendRequest(params);
      }
    });
  }, [sendRequest, entity, id]);

  if(!id || !entity) {
    return null;
  }

  return (
    <Fragment>
      <Button
        onClick={btnDeleteClick}
        icon="fa-solid fa-trash"
        text={t("delete")}
      />
      <LoadingPanel isVisible={isHttpLoading} />
    </Fragment>
  );
}
