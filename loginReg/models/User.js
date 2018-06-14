let mongoose = require("mongoose");
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let UserSchema = new mongoose.Schema({
	firstName:{type:String,required:true,minlength:2,maxlength:64},
	lastName:{type:String,required:true,minlength:2,maxlength:64},
	email:{
		type:String,
		required:true,
		minlength:8,
		maxlength:64,
		validate:{
			validator:function(email){
				return EMAIL_REGEX.test(email);
			}
		}
	},
	password:{type:String,required:true,minlength:8,maxlength:64,}
});
mongoose.model("User",UserSchema);