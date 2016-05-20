$(document).on("ready",function(){
    $("select").dropdown({
        allowAdditions: true
        ,apiSettings: {
            url: window.location.href+'company/list'
        }        
    });

    $("#menu .item").popup({position : 'right center'});

})
function mostrar(){
    var box = document.querySelector("[name='password']") ;
    var attr = box.getAttribute('type');
    if(attr=== "password"){
        box.setAttribute('type','text')
    }else{
        box.setAttribute('type','password')
    }
}  	