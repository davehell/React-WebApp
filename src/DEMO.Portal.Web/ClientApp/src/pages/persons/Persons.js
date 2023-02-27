import { Fragment, useCallback, useEffect } from 'react';
import { t } from "../../localization/i18n";
import Section from '../../components/UI/Section';
import { useNavigate } from 'react-router-dom';
import Button from 'devextreme-react/button';
import PersonsList from '../../components/persons/PersonsList';
import PersonsGrid from '../../components/persons/PersonsGrid';

export default function Persons() {
  let navigate = useNavigate();

  useEffect(() => {
    document.title = `${t("bands")}`;
  }, []);

  const onBandSelected = useCallback((id) => {
    let url = `/person/${id}`;
    navigate(url);
  }, [navigate]);

  const btnAddBandClick = useCallback((e) => {
    let url = `/person/add`;
    navigate(url);
  }, [navigate]);

  let actions = [
    <Button
      key="btnAddBand"
      onClick={btnAddBandClick}
      icon="fa-regular fa-plus"
      text={t("add")}
      hint={t("addBandHint")}
    />
  ];

  return (
    <Fragment>
      <Section title={"DxDataGrid"} actions={actions}>
        <PersonsGrid
          onSelected={onBandSelected}
        />
      </Section>

      <Section title={"DxList"} actions={actions}>
        <PersonsList
          onSelected={onBandSelected}
        />
      </Section>
    </Fragment>
  )
};
