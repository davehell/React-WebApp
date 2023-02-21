import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.softblue.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import React, { useEffect } from 'react';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import AppRoute from './components/AppRoute';
import routes from './config/routes.js';
import { AuthProvider } from './contexts/auth';
import { AjaxProvider } from './contexts/ajax';

import { loadMessages, locale } from 'devextreme/localization';
import localization_dx_cs from "devextreme/localization/messages/cs.json";
import localization_dx_en from "devextreme/localization/messages/en.json";
import { messages_cs } from "./localization/messages.cs";
import { t } from "./localization/i18n";

import dxDataGrid from "devextreme/ui/data_grid";
import dxSelectBox from "devextreme/ui/select_box";
import dxLookup from "devextreme/ui/lookup";
import dxPopup from "devextreme/ui/popup";

function App() {
  const initLocalization = (lang) => {
    //original DX překlady
    loadMessages(localization_dx_cs);
    loadMessages(localization_dx_en);
    //naše vlastní překlady, které mohou případně i přepsat originály od DX
    loadMessages({"cs": messages_cs});
    //nastavení jazyka
    locale(lang);
  };

  useEffect(() => {
    initLocalization("cs");
    document.title = t("webName");
  }, []);

  dxDataGrid.defaultOptions({
    options: {
      hoverStateEnabled: true,
      filterRow: { visible: true },
      headerFilter: { visible: true },
      pager: { showInfo: true, showPageSizeSelector: true, visible: true },
      paging: { pageSize: 10 },
      filterSyncEnabled: true,
      allowColumnResizing : true,
      columnResizingMode: "widget",
      showRowLines: true,
      showColumnLines: false
    }
  })

  dxSelectBox.defaultOptions({
    options: {
      displayExpr: "Name"
    }
  })

  dxLookup.defaultOptions({
    options: {
      displayExpr: "Name",
      showCancelButton: false,
      dropDownOptions: {
        hideOnOutsideClick: true,
        showTitle: false
      }
    }
  })

  dxPopup.defaultOptions({
    options: {
      hideOnOutsideClick: true,
      dragEnabled: true,
      dragOutsideBoundary: true,
      showCloseButton: true,
      showTitle: true,
      width: "800px"
    }
  })

  return (
    <React.StrictMode>
      <AuthProvider>
        <AjaxProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {routes.map((route) => (
                <Route
                  exact={true}
                  key={route.path}
                  path={route.path}
                  element={ <AppRoute component={route.component} isPrivate={route.isPrivate} layout={route.layout} /> }
                />
              ))}
            </Routes>
          </HashRouter>
        </AjaxProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
