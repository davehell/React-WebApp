import ODataContext from 'devextreme/data/odata/context';
import { getHttpHeaders } from './common';

//seznam všech používaných OData entit
const entities = [
    "Persons",
    "Facilities",
    "OrganizationUnits",
    "Users"
];

//nastavení OData kontextu
export function getODataContext(authHeader) {
    let h = getHttpHeaders(authHeader);
    let ctx = new ODataContext({
        version: 4,
        //při false se vrací datumy jako textové řetězce, při true jako Date objekty
        //Popis DX chyby: V odpovědi přijde čas správně v Z zoně, ale DX na to nebere ohled. Čas nezmění a zónu Z natvrdo přeplácne lokální zónou.
        deserializeDates: false, //TIMEZONE chyba https://supportcenter.devexpress.com/ticket/details/t570706/how-to-avoid-ignoring-the-local-time-when-filtering-dates-in-odata#
        url: _getODataUrl(),
        entities: _getODataEntities(entities),
        beforeSend: function (request) {
            request.headers = h;

            //hack - datasource automaticky nahrazuje ve filtru tečky za lomítka
            //proto si je tady nastavíme zpět, aby dotaz byl správně
            if(request.params && request.params.$filter) {
                request.params.$filter = (request.params.$filter).replace("ELVAC/ELIN/ODataApi/", "ELVAC.ELIN.ODataApi.")
            }
        },
        errorHandler: function (e) {
        }
    });
    return ctx;
}

//adresa OData služby
export const url = _getODataUrl();

//adresa WebApi
export const webApiUrl = _getWebApiUrl();

/**
 * Vrací adresu OData služby zakončenou lomítkem
 * @returns string
 */
function _getODataUrl() {
    var url = window.Configs && window.Configs.ODATA_Production ? window.Configs.ODATA_Production : "";

    //hack: Aby mohla být url v souboru .env.local, který není v git repozitáři, nastavená jiná vývojářská url.
    //A nemusel se tak kvůli tomu stále přepisovat config.js, který v repozitáři je.
    if(process.env.REACT_APP_ODATA_URL) {
        url = process.env.REACT_APP_ODATA_URL;
    }

    return addSlash(url);
}


function _getWebApiUrl() {
    var url = _getODataUrl().replace("/odata/", "");
    return addSlash(url);
}

/**
 * Vrací objekt s nastavením přístupu k OData entitám
 * Např.:
 *    {
 *        OrganizationUnits: { key: "Id", keyType: "Int32" },
 *        Persons: { key: "Id", keyType: "Int32" }
 *    };
 * @returns object
 */
function _getODataEntities(entities) {
    var obj = {};

    entities.forEach(function(name){
        obj[name] = { key: "Id", keyType: "Int32" };
    })
    
    return obj;
}

/**
 * Vrací zadanou url s lomítkem na konci
 *
 * @param {string} url
 * @return string
 */
 function addSlash(url) {
    var endsWithSlash = url.indexOf("/", url.length - 1) !== -1;
    return url + (endsWithSlash ? "" : "/");
};
