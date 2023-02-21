import { NavLink } from 'react-router-dom';
// import { ReactComponent as Logo } from "../../assets/logo-white.svg";
import logo from "../../assets/logo-white.png";
import MainNavigation from './MainNavigation';
import { Fragment } from 'react';

const Header = () => {
  return (
    <Fragment>
      <div id="header">
        <NavLink to='/' className="logo d-none d-md-block">
          {/* <Logo height="50px" /> */}
          <img src={logo} height="50px" alt="logo" />
        </NavLink>

        <MainNavigation />
      </div>
    </Fragment>
  );
};

export default Header;
