
let model = {
    Id: "",
    Person: null,
    EmployeeId: "",
    PersonId: "",
    UserName: ""
};

export const convertUserFromOData = function(data) {
    let self = {};

    if(data.Id) {
        self.Id = data.Id;
    }
    if(data.UserName) {
        self.UserName = data.UserName;
    }
    
    return {
        ...model,
        ...self
    };
}

export default model;
