import DataGrid, { Column } from 'devextreme-react/data-grid';
import { FilterRow, HeaderFilter, Sorting } from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { t } from '../../localization/i18n';
import { convertFacilitiesFromOData } from "../../model/facilities";

export default function Task2Grid({ onRowClick, refresh }) {
  const { OData } = useAuth();
  const [dataSource, setDataSource] = useState();
  const dataGrid = useRef(null);

  const getDataSource = useCallback(() => {
    const ds = new DataSource({
      store: OData.Facilities,
      select: ["Id", "Name", "Description"],
      sort: ["Name"],
      paginate: false,
      map: function (facility) {
        let model = convertFacilitiesFromOData(facility);
        return model;
      }
    });
    return ds;
  }, [OData]);

  useEffect(() => {
    let ds = getDataSource();
    setDataSource(ds);
  }, [getDataSource]);

  useEffect(() => {
    if (dataGrid?.current) {
      let ds = dataGrid.current.instance.getDataSource();
      if (ds) {
        ds.reload();
      }
    }
  }, [refresh]);

  const handleRowClick = useCallback((e) => {
    onRowClick(e);
  }, [onRowClick]);

  //Pokus o rowRender
  const gridRowRender = (rowData) => {
    return (
      <tr>
        <td colSpan={1}>
        <dl className='row'>
          <dt className="col-6">Id</dt>
          <dd className="col-6">{rowData.data.Id}</dd>
          <dt className="col-6">Name</dt>
          <dd className="col-6">{rowData.data.Name}</dd>
          <dt className="col-6">Description</dt>
          <dd className="col-6">{rowData.data.Description}</dd>
        </dl>
        </td>
      </tr>
    );
  };


  return (
    <Fragment>
      <DataGrid
        id="gridContainer"
        dataSource={dataSource}
        onRowClick={handleRowClick}
        focusedRowEnabled={true}
        showBorders={true}
        ref={dataGrid}
        dataRowRender={gridRowRender}
        columnWidth={200}
      >
        <HeaderFilter visible={false} />
        <FilterRow visible={false} />
        <Sorting mode="none" />
        <Column dataField="Id" visible={false} />
{/* 
        <Column dataField="Id" data />
        <Column dataField="Name" caption={t("name")} allowSorting={true} />
 */}
      </DataGrid>
    </Fragment>
  );
}
