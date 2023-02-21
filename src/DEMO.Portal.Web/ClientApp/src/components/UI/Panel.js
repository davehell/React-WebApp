import { Fragment } from "react";

const Panel = (props) => {
  const {type, icon, text} = props
  return (
    <Fragment>
      <div className={`${type ? "alert alert-" + type : "" }`}>
        {icon && <i className={`fa-solid fa-${icon}`} />}&nbsp;
        <span>{text}</span>
      </div>
    </Fragment>
  );
}

export default Panel;
