import { Fragment, useEffect } from 'react';
import { t } from "../localization/i18n";
import Section from '../components/UI/Section';

const About = () => {
  useEffect(() => {
    document.title = `${t("help")}`;
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Section title={t("help")} icon="far fa-question">
              <p>Nápovědu k aplikaci naleznete na adrese <a href="https://docs.elvacsolutions.eu/pages/viewpage.action?pageId=88482501" title={t("helpHint")}>https://docs.elvacsolutions.eu/pages/viewpage.action?pageId=88482501</a></p>
              <p>Pro přihlášení použijte tyto údaje:</p>
              <dl className='row ms-2'>
                <dt className='col-2'>Uživatelské jméno:</dt>
                <dd className='col-10'><code>elvac</code></dd>

                <dt className='col-2'>Heslo:</dt>
                <dd className='col-10'><code>elin930</code></dd>
              </dl>
            </Section>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default About;
