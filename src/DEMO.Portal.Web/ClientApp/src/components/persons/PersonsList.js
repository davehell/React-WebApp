import { Fragment, useCallback, useEffect, useState} from "react";
import { useAjax } from "../../contexts/ajax";
import useHttp from "../../hooks/use-http";
import List from 'devextreme-react/list';
import { convertPersonFromOData } from "../../model/person";


export default  function PersonsList ( {onSelected} ) {
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

  const onItemClick = useCallback((e) => {
    if(onSelected) {
      onSelected(e.itemData.Id);
    }
  }, [onSelected]);

  return (
    <Fragment>
      <List
        dataSource={dataSource}
        displayExpr="Name"
        keyExpr="Id"
        searchExpr="Name"
        searchEnabled={true}
        focusStateEnabled={false}
        onItemClick={onItemClick}
      />
    </Fragment>
  )
}

