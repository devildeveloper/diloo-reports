'use strict'
//const Sequelize = require('sequelize');
module.exports=function(sequelize,DataTypes){
	var Admin = sequelize.define('Admin',{
		_id:{
			type: DataTypes.UUID
			,field:'id'
			,defaultValue: DataTypes.UUIDV1
		}
		,_email:{
			type: DataTypes.STRING
			,field:'email'
			,allowNull:false
			,validate:{
				isEmail:true
			}
		}
		,_password:{
			type: DataTypes.STRING
			,field:'password'
			,allowNull:false
			,validate:{
				isAlpha:true
			}
		}
	});
	return Admin
}