'use strict'
const create = function(request,reply){
	//var Sequelize = request.server.plugins['hapi-sequelized'].db.sequelize;
	
}
const list = function(request,reply){
	//console.log(request.server.plugins);
	var Sequelize = request.server.plugins['hapi-sequelize'].db.sequelize;
	Sequelize.query('select * from category_name_id',{type: Sequelize.QueryTypes.SELECT})
				.then(function(result){
					reply(result);
				})
}
module.exports={
	create:create
	,list:list
}