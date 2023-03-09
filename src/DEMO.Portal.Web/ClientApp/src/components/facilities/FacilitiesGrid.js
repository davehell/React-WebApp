import { Fragment, useCallback, useEffect, useState} from "react";
import { convertFacilitiesFromOData } from "../../model/facilities";
//import { DataGrid } from "devextreme-react";
import DataGrid from 'devextreme-react/data-grid';
import DataSource from "devextreme/data/data_source";
import { useAuth } from '../../contexts/auth';

export default function FacilitiesGrid({onSelected}){
    const { OData } = useAuth();
    const [dataSource, setDataSource] = useState();
    
    const getDataSource = useCallback(() => {
        const ds = new DataSource({
          store: OData.Facilities,
          select: ["Id", "Name"],
          sort: [ "Name" ],
          paginate: false,
          map: function (facility) {
            let model = convertFacilitiesFromOData(facility);
            return model;
          }
        });
        return ds;
      }, [OData]);

      //při startu načíst data
      useEffect(() => {
        const ds = getDataSource();
        setDataSource(ds);
      }, [ getDataSource]);

    const onRowClick = useCallback((e) =>{
        if(onSelected) {
            onSelected(e.data.Id);
        }
    }, [onSelected]);

    return(
        <Fragment>
            <DataGrid
                dataSource={dataSource}
                onRowClick={onRowClick}
                />
            
        </Fragment>
    )
}