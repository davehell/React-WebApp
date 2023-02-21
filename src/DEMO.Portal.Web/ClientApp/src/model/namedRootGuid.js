let model = {
    Id: "",
    Guid: "",
    Name: "",
    PlainName: "",
    Description: "",
    HierarchicalName: ""
};

export const convertNamedRootGuidFromOData = function(data) {
    let self = {};

    if(data.Id) {
        self.Id = data.Id;
    }
    if(data.Guid) {
        self.Guid = data.Guid.toString();
    }
    if(data.Name) {
        self.Name = data.Name;
    }
    if(data.PlainName) {
        self.PlainName = data.PlainName;
    }
    if(data.Description) {
        self.Description = data.Description;
    }
    if(data.HierarchicalName) {
        self.HierarchicalName = data.HierarchicalName.replace(/\//g, " / ");
    }
    
    return {
        ...model,
        ...self
    };
}

export default model;
