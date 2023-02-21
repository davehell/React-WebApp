let model = {
    //Všechny id položky by měly být null. Pokud se tady nenaplní a přesto se použijí v OData dotazu,
    //tak s null to nezhavaruje. Prázdný řetězec by vadil, protože OData tam očekává číslo, ne string.
    Id: null,
    EmployeeId: null,
    UserId: null,

    Boss: null,
    FirstName: "",
    LastName: "",
    PlainName: "",
    Name: "",
    Email: "",
    AllwaysReadableEmail: "",
    OrganizationUnit: null,
    LinkedTo: null,
    CellPhone: "",
    AllwaysReadableCellPhone: "",
    LandLine: "",
    Location: null,
    Availability: "Unavailable", //výchozí hodnota pokud by PersonInfo.LastAttendanceType nebylo vyplněno
    AttendanceDetail: "",
    JobTitle: "",
    IsCellPhonePublic: false,
    IsEmailPublic: false,
    IsEmailInAD: false,
    IsCorporateCellPhone: false,
    CurrentProjectItem: "",
    OrderIndex: 0,
    HeadOfOrganizationUnits: [],
    IsHeadOfOrganizationUnit: false, //je vedoucí nebo zástupce vedoucího
    Roles: [],
    Responsibilities: [],
    CustomProfileRecord: {
        Id: null,
        Email: "",
        CellPhone: "",
        LandLine: "",
        IsCellPhonePublic: false,
        IsEmailPublic: false
    },
    ActiveDirectoryRecord: {
        Id: null,
        Email: "",
        CellPhone: "",
        LandLine: ""
    },
    IsAdditionalDataLoaded: false,
    CanEditOwnWorklog: false,
    CanEditOwnAttendance: false,
    CanEditProjectCategories: false,
    DefaultWorkType: null
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
    if(data.PlainName) {
        self.PlainName = data.PlainName;
    }
    if(data.Name) {
        self.Name = data.Name;
    }

    return {
        ...model,
        ...self
    };
}

export const convertPersonToOData = function(dto) {
    var result = {};
    var entities = ["OrganizationUnit", "Location"];

    for (const property in dto) {
        if(entities.includes(property)) { //entity se na službu posílají ve tvaru: propertyNameRefId: Id
            result[property + "RefId"] = dto[property] ? dto[property].Id : null;
        }
        else {
            result[property] = dto[property];
        }
    }

    return result;
}

//K existujícímu objektu "person" přidá další "data".
export const setAdditionalData = function(person, data) {
    let self = {};

    //díky tomuto příznaku je možné nezacyklit se a načíst data jen jednou
    self.IsAdditionalDataLoaded = true;

    return {
        ...person,
        ...self
    };
}

export default model;
