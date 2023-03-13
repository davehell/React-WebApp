import { Fragment, useCallback, useEffect, useState } from "react";
import Task2Detail from "../components/task2/Task2Detail";
import Task2EditForm from "../components/task2/Task2EditForm";
import Task2Grid from "../components/task2/Task2Grid";
import { errorDialog, successDialog } from "../components/UI/Dialog";
import Section from "../components/UI/Section"
import { useAjax } from "../contexts/ajax";
import useHttp from "../hooks/use-http";
import { t } from "../localization/i18n";

export default function Task2() {
  const [selectedFacility, setSelectedFacility] = useState();
  const { ajaxUpdate } = useAjax();
  const [refreshGrid, setRefreshGrid] = useState();

  const onRowClick = useCallback((e) => {
    setSelectedFacility(e.data);
  }, [setSelectedFacility]);

  const fetchData = useCallback(async (data) => {
    return await ajaxUpdate("Facilities", selectedFacility.Id, data);
  }, [ajaxUpdate, selectedFacility]);
  const { sendRequest: postItem, httpError, httpResponse } = useHttp(fetchData);

  useEffect(() => {
    if (httpError) {
      errorDialog(httpResponse);
    }
    if (httpResponse) {
      successDialog(t('saved'))
    }
  }, [httpError, httpResponse]);

  const onSubmit = useCallback(async (data) => {
    if (data.Description) {
      postItem(data);
      let model = {
        Id: selectedFacility.Id,
        Name: selectedFacility.Name,
        Description: data.Description
      };
      setRefreshGrid(Date.now());
      setSelectedFacility(model);
    }
  }, [postItem, setRefreshGrid, setSelectedFacility, selectedFacility]);

  return (
    <Fragment>
      <Section title={t("task2")}>
        <div className="row">
          <div className="col-lg-4"> 
            <Task2Grid onRowClick={onRowClick} refresh={refreshGrid} />
          </div>
          <div className="col-lg-5">
            <Task2Detail data={selectedFacility} />
            <Task2EditForm data={selectedFacility} onSubmit={onSubmit} />
          </div>
        </div>
      </Section>
    </Fragment>
  );
}