let model = {
    Id: null,
    Name: "",
}


export const convertOrganizationUnitFromOData = function (data){
    let self = {};

    if(data.Name){
        self.Name = data.Name;
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