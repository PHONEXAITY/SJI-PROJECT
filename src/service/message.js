const SuccessMessage ={
    create: "Insert Success",
    login: "Login Success",
    logout:"Logout Success",
    register: "Register Success",
    update: "Update Success",
    delete: "Delete Successful",
    getOne: "Get One Success",
    getAll: "Get All Success",
    changeSuccess : "password changed successfully",
}

const ErrorMessage = {
    serverFaild : "Internal Server Error",
    invalidEmailandPs : "Invalid email or password",
    EmailandPasswordRequired : "Email and password are required",
    UserAlready:"Username already exists. Please choose a different username",
    existingUser: "User with this email already exists",
    notMatchPassword : "Not Match Password",
    notFound: "Not Found",
    nocontent: "No Content",
    pleaseInput : "Please Input:",
    invalidToken: "Invalid Token",
    unauthorized: "Unauthorize"
}
module.exports = {SuccessMessage, ErrorMessage};