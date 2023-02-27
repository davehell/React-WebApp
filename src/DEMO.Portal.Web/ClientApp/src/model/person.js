import { convertStringToDateTime } from "../lib/common";
import { convertUserFromOData } from "./user";

let model = {
    //Všechny id položky by měly být null. Pokud se tady nenaplní a přesto se použijí v OData dotazu,
    //tak s null to nezhavaruje. Prázdný řetězec by vadil, protože OData tam očekává číslo, ne string.
    Id: null,

    FirstName: "",
    LastName: "",
    Name: "",
    DateInsert: "",
    User: null
};

export const convertPersonFromOData = function(data) {
    let self = {};

    if(data.Id) {
        self.Id = data.Id;
    }
    if(data.FirstName) {
        self.FirstName = data.FirstName;
    }
    if(data.LastName) {
        self.LastName = data.LastName;
    }
    if(data.Name) {
        self.Name = data.Name;
    }
    if(data.User) {
        self.User = convertUserFromOData(data.User);
    }
    if(data.DateInsert) {
        self.DateInsert = convertStringToDateTime(data.DateInsert);;
    }

    return {
        ...model,
        ...self
    };
}

export default model;
