function mostrar(){

	var box = document.querySelector("[name='password']") ;
	var attr = box.getAttribute('type');
	if(attr=== "password"){
		box.setAttribute('type','text')
	}else{
		box.setAttribute('type','password')
	}

}