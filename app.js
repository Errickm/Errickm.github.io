localStorage.setItem("ExecuteCheck","false");

$(document).ready(function() {
         GetData();
     setInterval('GetData()',30000);
 });

 function GetData()
 {
     var url = 'https://api.thingspeak.com/channels/1916023/feed/last.json?callback=?';
     $.ajax
     ({
         url: url,
         type: 'GET',
         contentType: "application/json",
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
            execute("Quality of water is poor");
         } 
         }
        }
     });
 }
 function execute(message){
     newmessage = message.replaceAll(' ', '+');
 var request = new XMLHttpRequest()
 request.open('GET', 'https://api.telegram.org/bot5749881226:AAEt8vtL7atRTFfouufEhFO2LI9h2RwFXoY/sendMessage?chat_id=-5617698163&text='+newmessage, true)
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
