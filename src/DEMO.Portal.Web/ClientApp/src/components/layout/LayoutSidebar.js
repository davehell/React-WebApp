import SecondaryNavigation from './SecondaryNavigation';
import Header from './Header';
import './LayoutSidebar.css';
import { useLocalStorage } from '../../hooks/useStorage';

const LayoutSidebar = (props) => {
  const [isSidebarCompact, setIsSidebarCompact] = useLocalStorage("sidebar-compact", false);

  function handleToggleSidebarStyle(isCompact) {
    setIsSidebarCompact(isCompact);
  }

  return (
    <div className={isSidebarCompact ? "compact" : ""}>
      <Header />
      <div className="content">
        <SecondaryNavigation isSidebarCompact={isSidebarCompact} onToggleSidebarStyle={handleToggleSidebarStyle} />
        <div id="page">
          <div className="container-fluid">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSidebar;
