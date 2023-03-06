import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LayoutBlank from "../components/layout/LayoutBlank";
import LayoutHeader from "../components/layout/LayoutHeader";
import Persons from "../pages/persons/Persons";
import PersonDetail from "../pages/persons/PersonDetail";
import PersonAdd from "../pages/persons/PersonAdd";
import PersonEdit from "../pages/persons/PersonEdit";
import FacilityDetail from "../pages/Facilities/FacilityDetail";
import FacilityAdd from "../pages/Facilities/FacilityAdd";
import FacilityEdit from "../pages/Facilities/FacilityEdit";
const routes = [
    {
        path: "/*",
        component: <NotFound />,
        layout: LayoutHeader
    },
    {
        path: "/dashboard",
        component: <Dashboard />
    },
    {
        path: "/login",
        component: <Login />,
        isPrivate: false,
        layout: LayoutBlank
    },
    {
        path: "/logout",
        component: <Logout />,
        isPrivate: false
    },
    {
        path: "/about",
        component: <About />,
        isPrivate: false,
        layout: LayoutHeader
    },
    {
        path: "/persons",
        component: <Persons />
    },
    {
        path: "/person/add",
        component: <PersonAdd />
    },
    {
        path: "/person/edit/:id",
        component: <PersonEdit />
    },
    {
        //routa musí být až poslední ze všech "person", aby názvy akcí (add, edit) měly přednost před parametrem id
        path: "/person/:id",
        component: <PersonDetail />
    },
    {
        path: "/facility/add",
        component: <FacilityAdd />
    },
    {
        path:"/facility/edit/:id",
        component: <FacilityEdit />
    },
    {   path: "/facility/:id",
        component: <FacilityDetail />
    },
  ];
   
  export default routes;
