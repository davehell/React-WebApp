let model = {
    Id: null,
    Name: "",
    OrganizationUnitRefId: "",
    Description: ""
}

export const convertFacilitiesFromOData = function(data){
    let self = {};

    if(data.Name){
        self.Name = data.Name;
    }

    if(data.OrganizationUnitRefId){
        self.OrganizationUnitRefId = data.OrganizationUnitRefId;
    }

    if(data.Description){
        self.Description = data.Description;
    }

    if(data.Id){
        self.Id = data.Id;
    }


    return {
        ...model,
        ...self
    }
}

export default model;