import { LoadPanel } from 'devextreme-react/load-panel';

const LoadingPanel = (props) => {
  return (
    <LoadPanel 
      shadingColor="rgba(0,0,0,0.4)"
      message={props.message ?? ""}
      {...props}
    />
  );
}

export default LoadingPanel;
