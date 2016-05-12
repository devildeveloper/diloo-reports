$(".changeStatus").dropdown({
	onChange:function(value,text,$el){

		if(value.split(">")[1]==='conectado'){
			$.ajax({
				method:'get',
				url:'/employee/changeStatus',
				data:{'status':'Conectado',id:$('#supervisorId').val() }
			}).done(function(data){
				console.log(data)
			})
		}else if (value.split(">")[1]==='desconectado'){
			$.ajax({
				method:'get',
				url:'/employee/changeStatus',
				data:{'status':'Desconectado',id:$('#supervisorId').val()}
			}).done(function(data){
				console.log(data)
			})
		}else if(value.split(">")[1]==='salir'){
			window.location.href='/auth/logout'
		}
	}
})
$("#menu .item").popup({position : 'right center'});

	
function mostrar(){

	var box = document.querySelector("[name='password']") ;
	var attr = box.getAttribute('type');
	if(attr=== "password"){
		box.setAttribute('type','text')
	}else{
		box.setAttribute('type','password')
	}

}
	