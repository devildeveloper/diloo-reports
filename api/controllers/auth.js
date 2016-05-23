'use strict'
const Joi    = require('joi');
const AuthSchema  =  Joi.object().keys({
	email:Joi.string().email().required()
	,password:Joi.string().min(1).max(12).required()
})
const logout = (request, reply) => {
    request.cookieAuth.clear();
    return reply.redirect('/');
};
const home =  (request, reply)=> {
	if (request.auth.isAuthenticated) {
        return reply.view('dashboard',null,{ layout: 'inherit' });//dashboard
    }else{
		reply.view('index'); //login
	}
};
const login =  (request, reply) => {
   if(request.method==='get'){
	    if (request.auth.isAuthenticated) {
       		return reply.view('dashboard',null,{ layout: 'inherit' });
    	}else{
			return reply.view('index');	
		}
	}else if(request.method==='post'){
		Joi.validate(request.payload, AuthSchema, function (err, value) {
			if(err){
				reply('invalid params'+ err)
			}else{
				//validate here
				var Admin = request.models.Admin;
				Admin.find({email:request.payload.email,password:request.payload.password})
						.then(function(admin){
                            console.log(admin)
							if(admin){
								request.server.app.cache.set(admin.id, { account: admin }, 0, (err) => {
									if (err) {
										return reply(err);
									}else{
										request.cookieAuth.set({ sid: admin.id });
										return reply.redirect('/');
									}
								});									
								//return reply(admin)
							}else{
								return reply('not fount')
							}
						})
						.catch(function(e){
							return	reply(e)
						});			
			}
		 }); 
	}else{
		reply('404')
	}
};
module.exports={
	logout : logout //function
	,home  : home   //function
	,login : login  //function
}