import { Fragment, useEffect } from 'react';
import { t } from "../localization/i18n";
import Section from '../components/UI/Section';
import { DataGrid, List } from 'devextreme-react';
import Facilities from './Facilities/Facilities';

const Dashboard = () => {
  useEffect(() => {
    document.title = `${t("dashboard")}`;
  }, []);

  return (
    <Fragment>
        <Facilities />
    </Fragment>
  )
};

export default Dashboard;
