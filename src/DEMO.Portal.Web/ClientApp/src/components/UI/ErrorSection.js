import { Fragment } from "react";
import Section from "./Section";

const ErrorSection = (props) => {
  let title = props.title;
  let msg = props.msg;
  let type = props.type === "error" ? "danger" : "warning";

  return (
    <Fragment>
      <Section title={title} >
        <p className={`alert alert-${type}`}>
          {msg}
        </p>
      </Section>
    </Fragment>
  );
}

export default ErrorSection;
