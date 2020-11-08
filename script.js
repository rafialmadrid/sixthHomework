$(document).ready(function() {

    var city = localStorage.getItem("city", city);
    getWeather(city);

    function getWeather(city) {

       var URLweather = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=3679ca64488dfd3d10918b4aa2b955ea";

      $.ajax({
        url: URLweather,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var d = new Date();
        var n = d.toDateString();
        $("#currentDay").text(n);
        console.log(n);

        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon').attr('src', iconurl);

      $("#cityName").text(response.name + " ("+n+")");
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $("#Temp").text("Temperature: " + tempF.toFixed(0) + "°F");
      $("#Hum").text("Humidity: " + response.main.humidity.toFixed(0) + "%");
      var windS = (response.wind.speed)*(2.23694)
      $("#windSpeed").text("Wind Speed: " + windS.toFixed(1) + " mph");
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      console.log(lat);
      console.log(lon);

      var URLuvindex = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat="+lat+"&lon="+lon+"&&appid=3679ca64488dfd3d10918b4aa2b955ea";

      $.ajax({
        url: URLuvindex,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        if (response[0].value<=2) {
          $("#uvIndex").text("UV Index: "+response[0].value).css({ "backgroundColor" : "green" , "color": "white"});
        } else if(response[0].value<=5){
          $("#uvIndex").text("UV Index: "+response[0].value).css("backgroundColor" , "khaki" );
        } else if(response[0].value<=7){
          $("#uvIndex").text("UV Index: "+response[0].value).css({ "backgroundColor" : "orange" , "color": "white"});
        } else if(response[0].value<=10){
          $("#uvIndex").text("UV Index: "+response[0].value).css({ "backgroundColor" : "red" , "color": "white"});
        } else if(response[0].value>10){
          $("#uvIndex").text("UV Index: "+response[0].value).css({ "backgroundColor" : "purple" , "color": "white"});
        }

        var URL5fc = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&&appid=3679ca64488dfd3d10918b4aa2b955ea";

        $.ajax({
        url: URL5fc,
        method: "GET"
      }).then(function(response) {

        console.log(response.list);

        // FC1
    
        $("#Date1").text(response.list[2].dt_txt.substring(0,10));

        var fcIcon1 = response.list[2].weather[0].icon;
        var fcIcon1url = "http://openweathermap.org/img/w/" + fcIcon1 + ".png";
        $('#fcImg1').attr('src', fcIcon1url);

        var fctempF1 = (response.list[2].main.temp - 273.15) * 1.80 + 32;
        $("#fcTemp1").text("Temperature: " + fctempF1.toFixed(0) + "°F");
        $("#fcHum1").text("Humidity: " + response.list[2].main.humidity.toFixed(0) + "%");

        // FC2


        $("#Date2").text(response.list[10].dt_txt.substring(0,10));

        var fcIcon2 = response.list[10].weather[0].icon;
        var fcIcon2url = "http://openweathermap.org/img/w/" + fcIcon2 + ".png";
        $('#fcImg2').attr('src', fcIcon2url);

        var fctempF2 = (response.list[10].main.temp - 273.15) * 1.80 + 32;
        $("#fcTemp2").text("Temperature: " + fctempF2.toFixed(0) + "°F");
        $("#fcHum2").text("Humidity: " + response.list[10].main.humidity.toFixed(0) + "%");

        // FC3


        $("#Date3").text(response.list[18].dt_txt.substring(0,10));

        var fcIcon3 = response.list[18].weather[0].icon;
        var fcIcon3url = "http://openweathermap.org/img/w/" + fcIcon3 + ".png";
        $('#fcImg3').attr('src', fcIcon3url);

        var fctempF3 = (response.list[18].main.temp - 273.15) * 1.80 + 32;
        $("#fcTemp3").text("Temperature: " + fctempF3.toFixed(0) + "°F");
        $("#fcHum3").text("Humidity: " + response.list[18].main.humidity.toFixed(0) + "%");

        // FC4

        $("#Date4").text(response.list[26].dt_txt.substring(0,10));

        var fcIcon4 = response.list[26].weather[0].icon;
        var fcIcon4url = "http://openweathermap.org/img/w/" + fcIcon4 + ".png";
        $('#fcImg4').attr('src', fcIcon4url);

        var fctempF4 = (response.list[26].main.temp - 273.15) * 1.80 + 32;
        $("#fcTemp4").text("Temperature: " + fctempF4.toFixed(0) + "°F");
        $("#fcHum4").text("Humidity: " + response.list[26].main.humidity.toFixed(0) + "%");

         // FC5

        $("#Date5").text(response.list[34].dt_txt.substring(0,10));

        var fcIcon5 = response.list[34].weather[0].icon;
        var fcIcon5url = "http://openweathermap.org/img/w/" + fcIcon5 + ".png";
        $('#fcImg5').attr('src', fcIcon5url);

        var fctempF5 = (response.list[34].main.temp - 273.15) * 1.80 + 32;
        $("#fcTemp5").text("Temperature: " + fctempF5.toFixed(0) + "°F");
        $("#fcHum5").text("Humidity: " + response.list[34].main.humidity.toFixed(0) + "%");

      });
      });
      });
      
    }

  $("#searchButton").on("click", function() {

        var city = $("#cityInput").val();
        localStorage.setItem("city", city);
        // $("#cities").prepend("<hr>" + city);
        $('#cities').prepend("<hr>"+"<div>"+city+"</div>"); 

        getWeather(city);
  });

   $("#cities").on("click", function(event){
     console.log(event);
     console.log(event.target.textContent);

     var city = event.target.textContent;
     getWeather(city);

   });


  }); //set document finish