import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LayoutBlank from "../components/layout/LayoutBlank";
import LayoutHeader from "../components/layout/LayoutHeader";

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

  ];
   
  export default routes;
