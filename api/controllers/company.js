'use strict'
const create = function(request,reply){
	//var Sequelize = request.server.plugins['hapi-sequelized'].db.sequelize;
	
}
const list = function(request,reply){
	//console.log(request.server.plugins);
	var Sequelize = request.server.plugins['hapi-sequelize'].db.sequelize;
	Sequelize.query('select * from category_name_id',{type: Sequelize.QueryTypes.SELECT})
				.then(function(result){
					return reply(result);
				})
}
const find = function(request,reply){
	var Sequelize = request.server.plugins['hapi-sequelize'].db.sequelize;
	Sequelize.query("select * from company_info(?)",{replacements:[request.query.id],type: Sequelize.QueryTypes.SELECT})
				.then(function(result){
					return reply(result);
				})
				.error(function(e){
					return reply(e);
				})	
}
const activity=function(request,reply){
	var Sequelize = request.server.plugins['hapi-sequelize'].db.sequelize;
	var reportCode = request.query.code;
	if(reportCode === '001'){
		
	}else if(reportCode === '002'){
		
	}else if(reportCode === '003'){
	
	}else if(reportCode === '004'){
		Sequelize.query("select * from company_tickets(?,?)",{
						replacements:[request.query.start,request.query.end],
						type: Sequelize.QueryTypes.SELECT})
				.then(function(result){
					return reply(result);
				})
				.catch(function(e){
					return reply(e);
				})			
	}else{
		reply('invalid report code');
	}
}
module.exports={
	create:create
	,list:list
	,find:find
	,activity:activity
}