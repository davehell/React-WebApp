import { t } from "../localization/i18n";

export function handleServerResponse(response) {
    let text = "";

    if(response.type === "Exception") {
        text = t("serverError");
    }
    else if(response.type === "ValidationException") {
        text = response.title;
        if(response.validationItems) {
            let items = response.validationItems.map(x => x.Message);
            text = items.join(",\n");
        }
    }
    else if(response.status === 401) {
        text = t("invalidCredentials");
    }
    else text = response.title;

    return text;
}

export function translateEnumValue(value) {
    //první znak malým písmenem
    let code = value.charAt(0).toLowerCase() + value.slice(1);
    return t(code);
}

export function getHttpHeaders(authHeader, contentType = "application/json") {
    var headers = {};

    headers["Content-Type"] = contentType;
    headers["Authorization"] = authHeader;

    return headers;
}

//odstranění diakrity z řetězce
//https://javascriptf1.com/snippet/remove-accents-from-a-string-in-javascript
export function convertStringToNormalForm(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function moveToUTCzone(date) {
    var tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    var utcDate = new Date(date.getTime() + tzoffset);

    return utcDate;
}

//https://supportcenter.devexpress.com/ticket/details/t570706/how-to-avoid-ignoring-the-local-time-when-filtering-dates-in-odata/
export function convertStringToDateTime(stringDate) {
    if(!stringDate) {
        return null;
    }

    //vstupní čas už je v Z zoně. Není třeba nic převádět.
    if(stringDate.indexOf("Z") !== -1) {
        return new Date(stringDate);
    }

    //V DB je správně uloženo: 2021-11-21T09:15:00+01:00 (devět hodin)
    //OData se ale vrací: 2021-11-21T08:15:00+01:00 (osm hodin)
    //Proto se zóna "+01:00" nahradí za "Z", aby to bylo správně
    let dateInZoneZ = stringDate;
    let chunks = stringDate.split("+");
    if(chunks.length > 1) {
        let dateWithoutZone = chunks[0];
        dateInZoneZ = dateWithoutZone + "Z";
    }
    let UtcDate = new Date(dateInZoneZ);

    return UtcDate;
}

export function addBodyClass(className) {
    document.body.classList.add(className);
}

export function removeBodyClass(className) {
    document.body.classList.remove(className);
}
