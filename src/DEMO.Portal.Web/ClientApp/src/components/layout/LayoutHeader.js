import { Fragment } from 'react';
import Header from './Header';
import './LayoutSidebar.css';

const LayoutHeader = (props) => {
  return (
    <Fragment>
      <Header />
      <div className="content">
        <div id="pageWithoutSidebar">
          <div className="container-fluid">
            {props.children}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LayoutHeader;
