import { TextBox } from "devextreme-react";
import { Fragment, useState, useEffect, useRef } from "react";
import { t } from "../../localization/i18n";

const Section = (props) => {
  const searchBox = useRef(null);
  const [searchText, setSearchText] = useState();
  let isHeadVisible =  (!props.icon && !props.title && !props.actions) ? false : true;

  useEffect(() => {
    if(props.reset) {
      setSearchText();
    }
  }, [props.reset]);

  useEffect(() => {
    setSearchText(props.defaultSearchText);
  }, [props.defaultSearchText]);

  useEffect(() => {
    if (searchBox && searchBox.current) {
      searchBox.current.instance.focus();  
    }
  }, [searchBox]);

  const searchBoxChangeHandler = (e) => {
    let text = e.value;
    setSearchText(text);
    props.onSearch(text);
  };

  return (
    <Fragment>
      <div className="section" id={props.id} data-cy={`Section-${props.id}`}>
        {isHeadVisible &&
          <div className={`head ${props.isCompact ? "compact" : ""}`}>
            {props.icon && 
              <div className="icon">
                <i className={props.icon}/>
              </div>
            }
            {props.title &&
              <h5 className="title" data-cy={`SectionTitle`}>{props.title}</h5>
            }
            {props.actions &&
              <div className="actions">
                {props.actions}
              </div>
            }
            {props.onSearch &&
              <TextBox
                ref={searchBox}
                value={searchText}
                onValueChanged={searchBoxChangeHandler}
                valueChangeEvent="keyup"
                placeholder={t("search")}
                elementAttr={{class: "searchBox"}}
                showClearButton={true}
              />
            }

            {props.customElement}
          </div>
        }

        {props.children}
      </div>
    </Fragment>
  );
}

export default Section;
