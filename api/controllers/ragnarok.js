'use strict'
const ragnarok = function(request,reply){
	let Admin = request.models.Admin;
	Admin.create({
		_email:'odin@asgard.com'
		,_password:'ragnarok'
	}).then(function(admin){
		return reply(admin)
	}).error(function(err){
		return reply(err)
	})
}
module.exports={
	start:ragnarok
}