import { Fragment, useEffect } from 'react';
import { t } from "../localization/i18n";
import Section from '../components/UI/Section';

const About = () => {
  useEffect(() => {
    document.title = `${t("about")}`;
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Section title={t("about")}>
            {t("version")}: <small id="version">{window.Configs && window.Configs.VersionApp ? window.Configs.VersionApp : ""}</small>
            </Section>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default About;
