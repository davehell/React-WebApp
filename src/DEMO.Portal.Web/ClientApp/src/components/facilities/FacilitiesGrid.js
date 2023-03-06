import { Fragment, useCallback, useEffect, useState} from "react";
import { useAjax } from "../../contexts/ajax";
import useHttp from "../../hooks/use-http";
import List from 'devextreme-react/list';
import { convertPersonFromOData } from "../../model/person";
import { convertFacilitiesFromOData } from "../../model/facilities";
import { DataGrid } from "devextreme-react";



export default function FacilitiesGrid({onSelected}){

    const {ajaxAction} = useAjax();
    const [dataSource, setDataSource] = useState();
    
    const fetchData = useCallback(async () => {
        return await ajaxAction("Facilities", null, "");
    }, [ajaxAction]);
    const {sendRequest: loadList, isHttpLoading, httpResponse} = useHttp(fetchData, true);

    useEffect(() => {
        loadList();
    }, [loadList]);

    useEffect(() => {
        if(isHttpLoading === false){
            if(httpResponse?.value){
                let ds = httpResponse.value.map(data => convertFacilitiesFromOData(data));
                setDataSource(ds);
            }
        }
    }, [isHttpLoading, httpResponse]);

    const onRowClick = useCallback((e) =>{
        if(onSelected) {
            onSelected(e.data.Id);
        }
    }, [onSelected]);

    return(
        <Fragment>
            <DataGrid dataSource={dataSource} onRowClick={onRowClick}/>
            
        </Fragment>
    )
}