let path = require("path");
let UserController = require("../controllers/UserController.js");

module.exports =(app)=>{
	app.get("/register",UserController.showRegister);
	app.post("/register",UserController.register);
	app.post("/login",UserController.login);
	app.get("/dashboard",UserController.dashboard);

	app.get("/users",UserController.all);
}