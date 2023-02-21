import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/auth';
import LayoutHeader from "./layout/LayoutHeader";
import LoadingPanel from './UI/LoadingPanel';
import { useLocation } from 'react-router-dom';
 
export default function AppRoute({ component, isPrivate = true, layout }) {
  let location = useLocation();
  const { isAuthInProgress, loggedPerson } = useAuth();
  
  let page = null;
  if(layout) {
    page = layout({children: component}); //pro routu je zadán konkrétní layout
  }
  else {
    page = LayoutHeader({children: component}); //layout není specifikován, použije se tedy výchozí
  }

  if(isPrivate && isAuthInProgress) {
    return (
      <LoadingPanel visible={true} />
    );
  }

  if(isPrivate && !loggedPerson) {
    return <Navigate to="/login" state={{ redirectTo: location }} />;
  }

  return page;
}
 