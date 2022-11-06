localStorage.setItem("ExecuteCheck","false");

$(document).ready(function() {

    // getUpdates();
        // GetDataSensor1();
         //GetDataSensor2();
         GetData();

     // check for new updates
     setInterval('GetData()',30000);
    // setInterval('GetDataSensor1()',30000);
     //setInterval('GetDataSensor2()',30000);

 });

 /*function getUpdates() {

     // get the data with a webservice call
      
     $.getJSON('http://api.thingspeak.com/channels/1916023/feed/last.json?callback=?',function(data) {
         alert(data.field1);
     });

 }*/
 function GetData()
 {
     var url = 'https://api.thingspeak.com/channels/1916023/feed/last.json?callback=?';
     $.ajax
     ({
         url: url,
         type: 'GET',
         contentType: "application/json",
         //dataType: "json",
         //crossDomain: true,
         success: function (data, textStatus, xhr) {
         var inspect = parseFloat(data.field1);
         var inspectSecond = parseFloat(data.field2);
         if (localStorage.getItem("ExecuteCheck") == "true")
         {
       if(inspect >= 6.5 && inspect < 8.5){
             execute("pH of water is good");
         }
        if (inspectSecond < 5)
         {
             execute("Turbidity of water is good");
         }
         else{
            execute("Qaulity of water is poor");
         } 
         }
        }
     });
 }/*
 function GetDataSensor2()
 {
     var url = 'https://api.thingspeak.com/channels/1916023/feed/last.json?callback=?';
     $.ajax
     ({
         url: url,
         type: 'GET',
         contentType: "application/json",
         //dataType: "json",
         //crossDomain: true,
         success: function (data, textStatus, xhr) {
             var inspect = parseFloat(data.field2);
        // var inspectSecond = parseFloat(data.field2);
         if (localStorage.getItem("ExecuteCheck") == "true")
         {
           if(inspect >= 5){
                execute("turnidity too high, poor water quality");
            }
            else if (inspect < 5)
            {
                execute("turbidity low, good water quality");
            }
            /*if(inspectSecond >= 35){
                execute("Sensor 2 humidity is above threshold of 35");
            }
            else if (inspectSecond < 0)
            {
                execute("Sensor 2 humidity is less than threshold of -20 degrees");
            }
        }
    }
     });
 }*/
 /*function GetDataSensor3()
 {
     var url = 'https://api.thingspeak.com/channels/1738066/feed/last.json?callback=?';
     $.ajax
     ({
         url: url,
         type: 'GET',
         contentType: "application/json",
         //dataType: "json",
         //crossDomain: true,
         success: function (data, textStatus, xhr) {
             var inspect = parseFloat(data.field1);
         var inspectSecond = parseFloat(data.field2);
         if (localStorage.getItem("ExecuteCheck") == "true")
         {
            if(inspect >= 35){
                execute("Sensor 3 Temperature is above threshold of 35 degrees");
            }
            else if (inspect < -20)
            {
                execute("Sensor 3 temperature is bellow threshold of -20 degrees");
            }
            if(inspectSecond >= 35){
                execute("Sensor 3 humidity is above threshold of 35");
            }
            else if (inspectSecond < 0)
            {
                execute("Sensor 3 humidity is less than threshold of -20 degrees");
            }
         
         
         }
        }
         
     });
 }
 function GetDataSensor4()
 {
     var url = 'https://api.thingspeak.com/channels/1738082/feed/last.json?callback=?';
     $.ajax
     ({
         url: url,
         type: 'GET',
         contentType: "application/json",
         //dataType: "json",
         //crossDomain: true,
         success: function (data, textStatus, xhr) {
            if (localStorage.getItem("ExecuteCheck") == "true")
            {
                if(inspect >= 35){
                    execute("Sensor 4 Temperature is above threshold of 35 degrees");
                }
                else if (inspect < -20)
                {
                    execute("Sensor 4 temperature is bellow threshold of -20 degrees");
                }
                if(inspectSecond >= 35){
                    execute("Sensor 4 humidity is above threshold of 35");
                }
                else if (inspectSecond < 0)
                {
                    execute("Sensor 4 humidity is less than threshold of -20 degrees");
                }
        }
    }
     });
 }*/

 function execute(message){
     newmessage = message.replaceAll(' ', '+');
 var request = new XMLHttpRequest()
 request.open('GET', 'https://api.telegram.org/bot5571628108:AAF7uZNjX4UE9pYfXRHFaD1QSkKR3CjWrS0'+newmessage, true)
 request.send()
 alert(message);
}
function enable(){
    localStorage.setItem("ExecuteCheck","true");
    execute("Notifications will be sent to the users cellphone");
}

function disable(){
    localStorage.setItem("ExecuteCheck","false");
    execute("No notifications will be sent to users cellphone")
}
