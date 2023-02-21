import { Fragment, useEffect } from 'react';
import { t } from "../localization/i18n";
import Section from '../components/UI/Section';

const Dashboard = () => {
  useEffect(() => {
    document.title = `${t("dashboard")}`;
  }, []);

  return (
    <Fragment>
      <Section title={t("dashboard")}>

      </Section>
    </Fragment>
  )
};

export default Dashboard;
