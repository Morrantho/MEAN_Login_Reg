const express    = require("express");
const session    = require("express-session");
const flash      = require("express-flash");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const bcrypt     = require("bcrypt");
const path       = require("path");
const app        = express();

app.use(session({
	secret:"ajhksgdkajhsgda",
	resave:false,
	saveUninitialized:true,
	cookie:{maxAge:5000}
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.set("views",path.join(__dirname,"./views"));
app.set("view engine","ejs");

require("./config/mongoose.js");
require("./config/routes.js")(app);

app.listen(1337,()=>{
	console.log("Listening on: ",1337);
});