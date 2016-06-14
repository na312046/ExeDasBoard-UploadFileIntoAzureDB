
var app = angular.module('myapp', []);

app.constant('Serviceurl', 'http://localhost:1515/api');

app.controller('loginctrl', function ($scope, $http) {
    
    $scope.login=function(){
        debugger;
        var email=$scope.email;
        var password=$scope.password;
          if (email != "" && password != "" && email != undefined && password != undefined) {
                    try {
                        $http.get('http://localhost:1515/api' + "/authenticate/" + email + "/" + password + "/" + "master")
                        .success(function (response) {
                            debugger;
                            var data = JSON.stringify(response);
                            var result = JSON.parse(data);
                            if (result.length > 0) {
                                //document.getElementById("Loading").style.display = "none";
                               var uid = result[0].uid;
                               document.cookie="uid="+uid;                               
                               window.location.href = "uploadexcel.html";
                            }
                        })
                        .error(function (data, status) {
                            debugger;
                             console.log(data);
                           console.log(status);
                            //document.getElementById("Loading").style.display = "none";
                        });
                    }
                    catch (e) {
                        console.log(e);
                        console.log(e.message);
                        debugger;
                        //document.getElementById("Loading").style.display = "none";
                    }

                }
    }//login
       
  
});


app.controller('ExcelUploadCtrl', function ($scope, $http) {  
     
    function getCookie(cname) {
        debugger;
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
  }
  
   $scope.logout=function()
      {
         document.cookie = "uid" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
         window.location.href = "login.html";
      }
      
      $scope.upload=function(data)
      {
     debugger;
       var typeOfChart= document.getElementById("typeofdata");
       var quater= document.getElementById("quater");
       var selectedDate=document.getElementById("datepicker");
       var uid=getCookie("uid");
       if(uid=="undefined" || uid=="")
       {
           alert('please login to upoad');
           return;
       }
      
        var data=
        {
            uid:uid,
            data:data.data,
            type:typeOfChart.options[typeOfChart.selectedIndex].value,
            quater:quater.options[quater.selectedIndex].value,
            timestamp:selectedDate.value
        } 
        
        
        
 var res = $http.post('http://localhost:1515/api/uploadexcel',data, { headers: { 'Content-Type': 'application/json' } });
     res.success(function (data, status, headers, config) 
       { 
           debugger;
           document.cookie = "uid" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';		
	        document.getElementById("snoAlertBox").className="alert alert-success";
            document.getElementById("snoAlertBox").innerHTML='Data uploaded to cloud succeffully.';
            //document.getElementById("snoAlertBox").fadeIn();
            closeSnoAlertBox();                        
        });
     res.error(function (data, status, headers, config) 
       {
           debugger;
	      document.getElementById("snoAlertBox").className="alert alert-danger";
          document.getElementById("snoAlertBox").innerHTML='Data not uploaded to cloud.';
          //document.getElementById("snoAlertBox").fadeIn();
          closeSnoAlertBox(); 
         
      });
           
      }//upload
      
          
    
  
});


