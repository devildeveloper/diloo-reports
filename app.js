'use strict';
const Hapi = require('hapi');
const Path = require('path');
const Hoek = require('hoek');
const Ctrl = require('./api/controllers');
const Joi  = require('joi');
const server = new Hapi.Server();
server.connection({
	 port: process.env.PORT || 3000 
	 ,labels:['reportes']
});
//pulgins
server.register(
	[
		{register:require('vision')}
		,{
			register:require('hapi-sequelize')
			,options:{
				//host:'40.76.4.149'
				database:'diloo'
				,user:'postgres'
				,pass:''
				,dialect:'postgres'
				,port:5432
				,models:'api/models/**/*.js'
				,logging:false
				,sequelize:{
					define:{
						underscoreAll:true
					}
				}
			}			
		}
		,{register:require('hapi-auth-cookie')}
	],(err)=>{
		if(err){
			console.error(err)
		}
		//engine
		server.views({
			engines:{
				html:require('handlebars')
			}	
			,relativeTo:__dirname
			,path:'views/templates'
			,layoutPath:'views/templates/layout'
			,partialsPath: 'views/templates/partials'
			,layout:'layout'
			,context:{
				assets:'http://localhost:5000'
			}
		});		
		//auth cookie
		const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
		server.app.cache = cache;
		server.auth.strategy('session', 'cookie', true, {
			password: 'password-should-be-32-characters',
			cookie: 'sid-example',
			redirectTo: '/login',
			isSecure: false,
			validateFunc: function (request, session, callback) {
				cache.get(session.sid, (err, cached) => {
					if (err) {
						return callback(err, false);
					}
					if (!cached) {
						return callback(null, false);
					}
					return callback(null, true, cached.account);
				});
			}
		});
		//db sync
 		server.plugins['hapi-sequelize'].db.sequelize.sync().then(function () {
			//init server
			server.start(function () {
				console.log('Server running at:', server.info.uri);
			});
   		});		
		//db adding to server
		server.ext('onPreHandler', function(modelCollections) {
			return function(request, reply) {
				request.models = modelCollections;
				reply.continue();
			}
		}(server.plugins['hapi-sequelize'].db.sequelize.models));		
		//routes
		server.route([
			{ method: 'GET', path: '/', config: { handler: Ctrl.Auth.home } },
			
			{ method: ['GET', 'POST'], path: '/login'
				,config: {
					handler: Ctrl.Auth.login, auth: { mode: 'try' }
					, plugins: { 'hapi-auth-cookie': { redirectTo: false } } 
				} 
			}
			,{ method: 'GET', path: '/logout', config: { handler: Ctrl.Auth.logout } }
			
			,{ method: 'GET' ,path: '/start',  config: { 
					handler:Ctrl.Ragnarok.start
					,auth:{mode:'try'}
					, plugins: { 'hapi-auth-cookie': { redirectTo: false } }
				}
			}
			
			,{ method: 'GET' ,path: '/company/list',config: { handler : Ctrl.Company.list } }
			
			,{ method: 'GET' ,path: '/company/find'
				,config: { 
					handler : Ctrl.Company.find
					,validate:{
						query:{
							id:Joi.string().min(6).required()
						}
					}
				}
			}
			,{ method: 'GET' ,path: '/company/activity'
				,config: { 
					handler : Ctrl.Company.activity
					,validate:{
						query:{
							code:Joi.string().min(3).max(3).required()
							,start:Joi.date().format('YYYY-MM-DD').min('2015-01-01').max('now').required()
							,end  :Joi.date().format('YYYY-MM-DD').min('2015-01-01').max('now').required()
							,companies:Joi.array().sparse(false).items(Joi.string()).min(1).unique()
						}
					}
				}
			}			
		]);	
	});