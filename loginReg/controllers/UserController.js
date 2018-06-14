const User   = require("mongoose").model("User");
const bcrypt = require("bcrypt");

class UserController{
	all(req,res){
		User.find({},(err,users)=>{
			if(users){
				return res.status(200).json(users);
			}else{
				return res.status(404).json("Our database blew up!");
			}
		})
	}

	findById(req,res){

	}

	update(req,res){

	}

	destroy(req,res){

	}

	register(req,res){
		User.findOne({email:req.body.email},(err,user)=>{
			if(user){
				req.flash("errors","A user with the email "+req.body.email+" already exists!");
				return res.redirect("/register");
			}else{
				let user = new User(req.body);

				bcrypt.hash(user.password,8,function(err,hash){
					if(err){
						req.flash("errors","Your salt level is over 9000, can't help you...");
						return res.redirect("/register");
					}else{
						user.password = hash;

						user.save(errs=>{
							if(errs){
								for(let err in errs.errors) req.flash("errors",errs.errors[err].message);
								return res.redirect("/register");
							}else{
								req.session.uid = user._id;
								req.flash("errors","Welcome, "+user.firstName);
								return res.redirect("/dashboard");
							}
						});
					}
				});

			}
		})
	}

	login(req,res){
		User.findOne({email:req.body.email},(err,user)=>{
			if(user){
				bcrypt.compare(req.body.password,user.password, function(err, result) {
					if(result){
						req.session.uid = user._id;
						return res.redirect("/dashboard");
					}else{
						req.flash("login","Invalid Credentials.");
					    return res.redirect("/register");
					}
				});
			}else{
				req.flash("login","No user with the email "+req.body.email+" exists. Stop being salty.");
				return res.redirect("/register");
			}
		});
	}

	showRegister(req,res){
		return res.render("register");
	}

	dashboard(req,res){
		if(!req.session.uid)return res.redirect("/register");

		User.findOne({_id:req.session.uid},(err,user)=>{
			if(user){
				return res.render("dashboard",{"user":user});
			}else{
				return res.redirect("/register");
			}
		});
	}
}

module.exports = new UserController();