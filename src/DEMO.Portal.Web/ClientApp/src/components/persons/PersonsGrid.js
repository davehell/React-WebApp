import { Fragment, useCallback, useEffect, useState} from "react";
import { useAjax } from "../../contexts/ajax";
import useHttp from "../../hooks/use-http";
import DataGrid from 'devextreme-react/data-grid';
import { convertPersonFromOData } from "../../model/person";


export default  function PersonsGrid ( {onSelected} ) {
  const { ajaxAction } = useAjax();
  const [dataSource, setDataSource] = useState();

  const fetchData = useCallback(async () => {
    return await ajaxAction("Persons", null, "");
  }, [ajaxAction]);
  const { sendRequest: loadList, isHttpLoading, httpResponse} = useHttp(fetchData, true);

  //při startu načíst data
  useEffect(() => {
    loadList();
  }, [loadList]);

  //zpracování odpovědi
  useEffect(() => {
    if (isHttpLoading === false) {
      if(httpResponse?.value) {
        let ds = httpResponse.value.map(data => convertPersonFromOData(data));
        setDataSource(ds);
      }
    }
  }, [isHttpLoading, httpResponse]);

  const onRowClick = useCallback((e) => {
    if(onSelected) {
      onSelected(e.data.Id);
    }
  }, [onSelected]);

  return (
    <Fragment>
      <DataGrid
        dataSource={dataSource}
        onRowClick={onRowClick}
      >
      </DataGrid>
    </Fragment>
  )
}

