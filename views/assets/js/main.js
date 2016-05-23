$(document).on("ready",function(){
    $("#admin_report_date_range").daterangepicker({
    format: 'YYYY-MM-DD',
    startDate: '2015-01-01'
  });
    $("select").dropdown({
        allowAdditions: true
        ,apiSettings: {
            url: 'http://localhost:3000/company/list'
        }  
        ,saveRemoteData:true      
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
function cat(){
            riot.mount('company-tickets-inrange', {
            title: 'I want to behave!',
            items: [
                { title: 'Avoid excessive caffeine', done: true },
                { title: 'Hidden item',  hidden: true },
                { title: 'Be less provocative'  },
                { title: 'Be nice to people' }
            ]
            })    
}