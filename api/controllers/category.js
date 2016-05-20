'use strict'
const list = function(request,reply){
	//console.log(request.server.plugins);
	var Sequelize = request.server.plugins['hapi-sequelize'].db.sequelize;
	Sequelize.query('select * from category_name_id',{type: Sequelize.QueryTypes.SELECT})
				.then(function(result){
					return reply(result);
				})
}
module.exports = {
    list : list
}