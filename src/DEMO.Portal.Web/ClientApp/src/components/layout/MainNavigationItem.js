import { NavLink } from 'react-router-dom';

const MainNavigationItem = (props) => {
  let iconClass = "fs-4 fa-solid fa-" + props.icon;
  return (
    <li>
      <NavLink to={props.to} className="nav-link text-center" title={props.hint}>
        <div className="bi d-block mx-auto mb-1">
            <i className={iconClass}></i>
            <span className="badge bg-danger float-end mt-1">{props.badge}</span>
        </div>
        <span data-cy={`MainNavigationItem-${props.icon}`}>{props.title}</span>
      </NavLink>
    </li>
  );
};

export default MainNavigationItem;
